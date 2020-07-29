import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, firebase } from '../../config/firebase';
import { isEmailValid, isPasswordOk } from './validation';
import { TextField } from '../styles/TextField';
import StyledAppBar from '../material/StyledAppBar';
import StyledTabs from '../material/StyledTabs';
import StyledTab from '../material/StyledTab';
import TabPanel from '../TabPanel';
import { Divider, InputAdornment } from '@material-ui/core';
import { BigButton } from '../styles/Button';
import styled from 'styled-components';
import {
  FIELD_REQUIRED,
  INVALID_EMAIL,
  INVALID_PHONE,
  PASSWORD_NOT_STRONG,
} from './messages';

export const MODE_SIGN_UP = 'signup';
export const MODE_LOG_IN = 'login';

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;
const ReCaptchaContainer = styled.div`
  min-height: 78px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const TAB_EMAIL = 0;
const TAB_PHONE = 1;

const AuthFields = ({ mode, valid, name, prefix, infix, suffix }) => {
  const isSignUp = mode === MODE_SIGN_UP;
  const isLogIn = mode === MODE_LOG_IN;
  const router = useRouter();
  const [state, setState] = useState({
      email: '',
      password: '',
      phone: '',
    }),
    [captchaPass, setCaptchaPass] = useState(false),
    [recaptcha, setRecaptcha] = useState(null),
    [processing, setProcessing] = useState(false),
    [activeTab, setActiveTab] = useState(TAB_EMAIL),
    [errors, setErrors] = useState({
      email: '',
      pass: '',
      phone: '',
    }),
    clearErrors = () => {
      setErrors({
        email: '',
        pass: '',
        phone: '',
      });
    };

  useEffect(() => {
    if (activeTab !== TAB_PHONE) {
      setRecaptcha(null);
      return;
    }

    const re = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: () => {
        setCaptchaPass(true);
      },
      'expired-callback': () => {
        setCaptchaPass(false);
      },
    });

    re.render();
    setRecaptcha(re);
    setState((s) => ({ ...s, captch: false }));
  }, [activeTab]);

  const handleTabChange = (e, newVal) => {
    setActiveTab(newVal);
    clearErrors();
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value[0] === '1') {
      // Format US numbers nicely.
      const parts = value.match(/(.)(.{0,3})(.{0,3})(.{0,4})/);

      // Splice off the full match. Join with space. Trim trailing space.
      value = parts.splice(1).join(' ').trim();
    }

    setState({ ...state, phone: value });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    clearErrors();
  };

  let allowSubmit = valid && !processing;
  if (activeTab === TAB_PHONE) {
    allowSubmit = allowSubmit && captchaPass;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === TAB_EMAIL) {
      if (!state.email) {
        setErrors({ ...errors, email: FIELD_REQUIRED });
        return;
      } else if (!isEmailValid(state.email)) {
        setErrors({ ...errors, email: INVALID_EMAIL });
        return;
      }

      if (!state.password) {
        setErrors({ ...errors, pass: FIELD_REQUIRED });
        return;
      } else if (isSignUp && !isPasswordOk(state.password)) {
        setErrors({
          ...errors,
          pass: PASSWORD_NOT_STRONG,
        });
        return;
      }

      try {
        setProcessing(true);
        if (isSignUp) {
          await auth.createUserWithEmailAndPassword(
            state.email,
            state.password,
          );
        } else if (isLogIn) {
          await auth.signInWithEmailAndPassword(state.email, state.password);
        }
      } catch (e) {
        setErrors({ ...errors, email: e.message });
        setProcessing(false);
        return;
      }
      if (isSignUp && name) {
        try {
          await auth.currentUser.updateProfile({
            displayName: name,
          });
        } catch (e) {
          console.log('Error updating profile name.', e);
        }
      }

      let target = '/';
      if (router.query.target) {
        target = decodeURIComponent(router.query.target);
      }
      await router.push(target);
    } else if (activeTab === TAB_PHONE) {
      if (!state.phone) {
        setErrors({ ...errors, phone: '\n' + FIELD_REQUIRED });
        return;
      }
      try {
        setProcessing(true);
        const confirmationResult = await auth.signInWithPhoneNumber(
          '+' + state.phone.replace(/\s/g, ''),
          recaptcha,
        );
        let url = `/auth/phone-confirm?verificationId=${confirmationResult.verificationId}`;
        if (name) {
          url = `${url}&name=${encodeURIComponent(name)}`;
        }
        if (router.query.target) {
          url = `${url}&target=${router.query.target}`;
        }
        await router.push(url);
      } catch (e) {
        setErrors({
          ...errors,
          phone: '\n' + INVALID_PHONE,
        });
        setProcessing(false);
        return;
      }
    }
  };

  let submitLabel = 'submit';
  switch (mode) {
    case MODE_SIGN_UP:
      submitLabel = 'Sign up';
      break;
    case MODE_LOG_IN:
      submitLabel = 'Login';
      break;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {prefix ? prefix(processing) : null}
      <StyledAppBar>
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab label="Email" />
          <StyledTab label="Phone Number" />
        </StyledTabs>
      </StyledAppBar>
      <TabPanel value={activeTab} index={TAB_EMAIL}>
        <SignupWrapper>
          <TextField
            name="email"
            type="email"
            label="Email"
            margin="normal"
            value={state.email}
            onChange={handleFieldChange}
            disabled={processing}
            required={activeTab === TAB_EMAIL}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
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
          <TextField
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
              ),
            }}
          />
          <ReCaptchaContainer id="recaptcha-container" />
        </SignupWrapper>
      </TabPanel>
      {infix ? infix(processing) : null}
      <BigButton
        type="submit"
        disabled={!allowSubmit}
        variant="contained"
        primary
      >
        {submitLabel}
      </BigButton>
      {suffix ? (
        <>
          <Divider style={{ marginBottom: 15, marginTop: 15 }} />
          {suffix}
        </>
      ) : null}
    </Form>
  );
};

AuthFields.propTypes = {
  mode: PropTypes.string,
  name: PropTypes.string,
  prefix: PropTypes.func,
  infix: PropTypes.func,
  suffix: PropTypes.element,
};

export default AuthFields;
