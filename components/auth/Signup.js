import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth, firebase } from "../../config/firebase";
// material
import {
  Checkbox,
  Divider,
  FormGroup,
  FormControlLabel,
  InputAdornment
} from "@material-ui/core";

// components
import { H1 } from "../styles/Typography";
import { StyledTextField } from "../material/StyledTextField";
import { BigButton } from "../styles/Button";
import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";
import TabPanel from "../TabPanel";

// styles
const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;
const ReCaptchaContainer = styled.div`
  min-height: 78px;
  display: flex;
  justify-content: center;
`;

const TAB_EMAIL = 0;
const TAB_PHONE = 1;

const Signup = () => {
  const router = useRouter();
  const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      acceptedTerms: false
    }),
    [captchaPass, setCaptchaPass] = useState(false),
    [recaptcha, setRecaptcha] = useState(null),
    [processing, setProcessing] = useState(false),
    [activeTab, setActiveTab] = useState(TAB_EMAIL),
    [errors, setErrors] = useState({
      email: "",
      pass: "",
      phone: ""
    }),
    clearErrors = () => {
      setErrors({
        email: "",
        pass: "",
        phone: ""
      });
    };

  useEffect(() => {
    if (activeTab !== TAB_PHONE) {
      setRecaptcha(null);
      return;
    }

    const re = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: () => {
        setCaptchaPass(true);
      },
      "expired-callback": () => {
        setCaptchaPass(false);
      }
    });

    re.render();
    setRecaptcha(re);
    setState({ ...state, captcha: false });
  }, [activeTab]);

  const handleTabChange = (e, newVal) => {
    setActiveTab(newVal);
    clearErrors();
  };

  const handleTermsChange = e => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const handlePhoneChange = e => {
    let value = e.target.value.replace(/\D/g, "");

    if (value[0] === "1") {
      // Format US numbers nicely.
      const parts = value.match(/(.)(.{0,3})(.{0,3})(.{0,4})/);

      // Splice off the full match. Join with space. Trim trailing space.
      value = parts
        .splice(1)
        .join(" ")
        .trim();
    }

    setState({ ...state, phone: value });
  };

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    clearErrors();
  };

  let allowSubmit = state.acceptedTerms && !processing;
  if (activeTab === TAB_PHONE) {
    allowSubmit = allowSubmit && captchaPass;
  }

  const handleSubmit = async () => {
    if (activeTab === TAB_EMAIL) {
      if (!state.email) {
        setErrors({ ...errors, email: "This field is required" });
        return;
      }
      if (!state.password) {
        setErrors({ ...errors, pass: "This field is required" });
        return;
      }
      // TODO: better email validation
      // TODO: better password validation

      try {
        setProcessing(true);
        await auth.createUserWithEmailAndPassword(state.email, state.password);
      } catch (e) {
        setErrors({ ...errors, email: e.message });
        setProcessing(false);
        return;
      }
      try {
        await auth.currentUser.updateProfile({
          displayName: state.name
        });
      } catch (e) {
        console.log("Error updating profile name.", e);
      }

      let target = "/";
      if (router.query.target) {
        target = decodeURIComponent(router.query.target);
      }
      await router.push(target);
    } else if (activeTab === TAB_PHONE) {
      if (!state.phone) {
        setErrors({ ...errors, phone: "\nThis field is required" });
        return;
      }
      try {
        setProcessing(true);
        const confirmationResult = await auth.signInWithPhoneNumber(
          "+" + state.phone.replace(/\s/g, ""),
          recaptcha
        );
        let target = `/auth/phone-confirm?verificationId=${
          confirmationResult.verificationId
        }&name=${encodeURIComponent(state.name)}`;
        if (router.query.target) {
          target = `${target}&target=${router.query.target}`;
        }
        await router.push(target);
      } catch (e) {
        setErrors({
          ...errors,
          phone: "\nInvalid phone number. Please try again."
        });
        setProcessing(false);
        return;
      }
    }
  };

  return (
    <SignupWrapper>
      <H1>Sign Up</H1>
      <StyledTextField
        label="Name"
        name="name"
        margin="normal"
        value={state.lastName}
        onChange={handleFieldChange}
        disabled={processing}
      />
      <StyledAppBar>
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab label="Email" />
          <StyledTab label="Phone Number" />
        </StyledTabs>
      </StyledAppBar>
      <TabPanel value={activeTab} index={TAB_EMAIL}>
        <SignupWrapper>
          <StyledTextField
            name="email"
            label="Email"
            margin="normal"
            value={state.email}
            onChange={handleFieldChange}
            disabled={processing}
            required={activeTab === TAB_EMAIL}
            error={!!errors.email}
            helperText={errors.email}
          />
          <StyledTextField
            name="password"
            label="Password"
            margin="normal"
            type="password"
            value={state.password}
            onChange={handleFieldChange}
            disabled={processing}
            required={activeTab === TAB_EMAIL}
            error={!!errors.pass}
            helperText={errors.pass}
          />
        </SignupWrapper>
      </TabPanel>
      <TabPanel value={activeTab} index={TAB_PHONE}>
        <SignupWrapper>
          <p>
            You will be sent an SMS for verification purposes. Standard rates
            will apply.
          </p>
          <StyledTextField
            name="phone"
            label="Phone Number"
            margin="normal"
            value={state.phone}
            type="tel"
            onChange={handlePhoneChange}
            disabled={processing}
            required={activeTab === TAB_PHONE}
            error={!!errors.phone}
            helperText={`Enter your full phone number including the country code.${errors.phone}`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+</InputAdornment>
              )
            }}
          />
          <ReCaptchaContainer id="recaptcha-container" />
        </SignupWrapper>
      </TabPanel>
      <FormGroup row style={{ marginBottom: 20 }}>
        <FormControlLabel
          control={
            <Checkbox
              name="acceptedTerms"
              checked={state.acceptedTerms}
              onChange={handleTermsChange}
              value="acceptedTerms"
              disabled={processing}
            />
          }
          label="I have read the Terms and Conditions"
        />
      </FormGroup>
      <BigButton
        disabled={!allowSubmit}
        onClick={handleSubmit}
        variant="contained"
        primary
      >
        Sign Up
      </BigButton>
      <Divider style={{ marginBottom: 15 }} />
      <Link href="/auth/login">
        <a>Have an account?</a>
      </Link>
    </SignupWrapper>
  );
};

export default Signup;
