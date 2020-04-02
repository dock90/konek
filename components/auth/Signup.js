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
  FormControlLabel
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
  const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      captcha: false,
      acceptedTerms: false
    }),
    [processing, setProcessing] = useState(false),
    [activeTab, setActiveTab] = useState(TAB_EMAIL);
  const router = useRouter();

  const [recaptcha, setRecaptcha] = useState(null),
    [phoneConfRes, setPhoneConfRes] = useState(null);

  useEffect(() => {
    if (activeTab !== TAB_PHONE) {
      return;
    }

    const re = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: () => {
        setState({ ...state, captcha: true });
      },
      "expired-callback": () => {
        setState({ ...state, captcha: false });
      }
    });

    re.render();
    setRecaptcha(re);
    setState({ ...state, captcha: false });
  }, [activeTab]);

  const handleTabChange = (e, newVal) => {
    setActiveTab(newVal);
  };

  const handleTermsChange = e => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let allowSubmit = state.acceptedTerms && !processing;
  if (activeTab === TAB_PHONE) {
    allowSubmit = allowSubmit && state.captcha;
  }

  const handleSubmit = async () => {
    // TODO: better email validation
    // TODO: better password validation
    setProcessing(true);
    try {
      if (activeTab === TAB_EMAIL) {
        await auth.createUserWithEmailAndPassword(state.email, state.password);
      } else if (activeTab === TAB_PHONE) {
        const confirmationResult = await auth.signInWithPhoneNumber(state.phone, recaptcha);
        let target = `/auth/phone-confirm?verificationId=${confirmationResult.verificationId}`;
        if (router.query.target) {
          target = `${target}&target=${router.query.target}`;
        }
        await router.push(target);
      }
      await auth.currentUser.updateProfile({
        displayName: state.name
      });
    } catch (e) {
      setProcessing(false);
      console.log("Signup Error: ", e);
      return;
    }
    let target = "/";
    if (router.query.target) {
      target = decodeURIComponent(router.query.target);
    }
    await router.push(target);
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
          <StyledTab label="Email" disabled={!!phoneConfRes} />
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
          />
        </SignupWrapper>
      </TabPanel>
      <TabPanel value={activeTab} index={TAB_PHONE}>
        <SignupWrapper>
          <StyledTextField
            name="phone"
            label="Phone Number"
            margin="normal"
            value={state.phone}
            onChange={handleFieldChange}
            disabled={processing}
            required={activeTab === TAB_PHONE}
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
        id="sign-up"
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
