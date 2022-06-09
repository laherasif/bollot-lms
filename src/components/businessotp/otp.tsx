/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useCallback, CSSProperties } from 'react';
import SingleInput from './single';
import { useSelector, RootStateOrAny } from 'react-redux'
import Router, { useRouter } from "next/router";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { SweetAlert } from '../../function/hooks';
// import { OtpVarif } from '../../../../src/redux/actions/auth/user'
export interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => any;

  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;

  style?: CSSProperties;
  className?: string;
  providerEmail?: string;
  role?: any;
  inputStyle?: CSSProperties;
  inputClassName?: string;
}





export function OTPInputComponent(props: OTPInputProps) {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    providerEmail,
    role,
    inputClassName,
    inputStyle,
    ...rest
  } = props;

  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));
  const [otp, setOtp] = useState('');
  const [errors, setErros] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      setOtp(otpValue)
      onChangeOTP(otpValue);
    },
    [onChangeOTP],
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;

      if (!isNumberInput || !changedValue) {
        return changedValue;
      }

      return Number(changedValue) >= 0 ? changedValue : '';
    },
    [isNumberInput],
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues],
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length],
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput],
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue],
  );

  // Handle onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;

      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default: {
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }

          break;
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues],
  );

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues],
  );

  const handelSubmit = async () => {
    try {
      setLoading(true)
      let res = await AxInstance.post('api//company/authenticate-otp', { code: otp })
      if (res.data?.success === true) {
        if (User?.role === "student" || res?.data?.response?.student?.role === "student") {
            router.push("/en/student/dashboard"); 
        }
        else {
          router.push("/en/instructor");

        }
        setLoading(false)
      }
      else {
        setErros(res.data.error.code[0])
        setLoading(false)

      }

    } catch (err) {
      SweetAlert({icon :'error' , text: err})

    }

  }

  return (
    <div {...rest}>
      <section className="bg-1">
        <div className="container-main">
          <div className="container logo-sec">
            <div className="logo-1">
              <img src="assets\images\ballot-1-logo.svg" alt="" />
            </div>
            <div className="logo-2">
              <h3>Didn’t get the code?</h3>
              <p>Resend</p>
            </div>
          </div>
        </div>
        <div className=" login-sec ">
          <div className="container lock-img">
            <img src="assets\images\lock.svg" alt="" />
          </div>
          <div className="container two-step">
            <h3 className="text-center mb-21">Two-Step Verification</h3>
            <p className="text-center mb-21">Enter the verification code we sent to</p>
            {/* <p className="text-center mb-67">{EmailHide(providerEmail)}</p> */}
          </div>
          {errors && <div className="alert alert-danger" style={{ color: 'black' }}>{errors}</div>}

          <div className="container">
            <div className="all-circle">
              {Array(length)
                .fill('')
                .map((_, index) => (
                  <SingleInput
                    key={`SingleInput-${index}`}
                    type={"number"}
                    focus={activeInput === index}
                    value={otpValues && otpValues[index]}
                    autoFocus={autoFocus}
                    onFocus={handleOnFocus(index)}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onBlur={onBlur}
                    onPaste={handleOnPaste}
                    style={inputStyle}
                    className={inputClassName}
                    disabled={disabled}
                  />
                ))}

            </div>
          </div>
          <div className="container mb-132 w-100 flex-box">
            <button className="btn-2 " onClick={(e) => handelSubmit(e)}>
              {loading ?
                <Spinner animation='border' />
                :
                "Submit"
              }
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

const OTPInput = memo(OTPInputComponent);
export default OTPInput;