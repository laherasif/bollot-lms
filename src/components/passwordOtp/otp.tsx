/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useCallback, CSSProperties, useEffect } from 'react';
import SingleInput from './single';
import { useSelector, RootStateOrAny } from 'react-redux'
import Router, { useRouter } from "next/router";
// import { EmailHide } from '../../../../src/function/hooks'
// import instance from '../../../../src/confiq/axios/instance';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import instance from '../../confiq/axios/instance';
import { SweetAlert } from '../../function/hooks';
// import { forgotEmail } from '../../redux/actions/auth/user';
// import { OtpVarif } from '../../../../src/redux/actions/auth/user'
export interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => any;
  onStepChange: () => any;
  onPrevStep: () => any;
  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;

  style?: CSSProperties;
  className?: string;
  providerEmail?: string;
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
    onStepChange,
    onPrevStep,
    providerEmail,
    inputClassName,
    inputStyle,
    ...rest
  } = props;

  const [activeInput, setActiveInput] = useState(0);
  let [countDown, setcountDown] = useState(60);
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));
  const [otp, setOtp] = useState('');
  const [errors, setErros] = useState('');
  const [loading, setLoading] = useState(false);
  const [intervalID, setInterID] = useState(); // created a useState for intervalID


  const { forgotEmail } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   let myInterval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }
  //     if (seconds === 0) {
  //       clearInterval(myInterval)
  //     }

  //   }, 1000)
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // });

  const resendEmail = async () => {
    try {
      setSeconds(60)
      await instance.post("api//forgot-password/step-1", { email: "guru@gmail.com" })

    } catch (error) {
      SweetAlert({ icon: 'error', text: error })
    }
  }



  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);



  // console.log("second", seconds)



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
        const otpValue = otpValues.join('');
        setOtp(otpValue)

        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues],
  );
  const handelSubmit = async () => {
    try {
      let value = {
        email: forgotEmail,
        code: otp
      }
      setLoading(true)
      let res = await instance.post('api//forgot-password/step-2', value)
      if (res.data?.success === true) {
        setLoading(false)
        SweetAlert({ icon: "success", text: res.data.message })
        onStepChange()
      }
      else {
        setErros(res.data.error.code[0])
        setLoading(false)

      }

    } catch (error) {
      SweetAlert({ icon: "error", text: error })

    }

  }

  return (
    <div {...rest}>
      <section className="">

        <div className=" login-sec ">
          <div className="container lock-img">
            <img src="assets\images\lock.svg" alt="" />
          </div>
          <div className="container two-step">
            <p className="text-center mb-21">Enter the verification code we sent to</p>
            <p className="text-center mb-67">{forgotEmail}</p>
          </div>

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
                    style={errors ? { border: "1pt solid red " } : inputStyle}
                    className={inputClassName}
                    disabled={disabled}
                  />
                ))}

            </div>
            {errors && <div className="invalid mb-1">{errors}</div>}
          </div>
          <div className='d-flex justify-content-between'>
            <div className="logo-2 d-flex" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px' }}>Didn’t get the code?  </h3>
              <p style={seconds > 0 ? { display: 'none' } : { display: 'inline', fontSize: '16px', cursor: 'pointer' }} onClick={() => resendEmail()}>Resend</p>
            </div>
            {
              seconds > 0 ?
                <p>{seconds}</p>
                : null
            }
          </div>
          <div className="hasdfkj" style={{ textAlign: 'center', margin: 'auto' }}>
            <button
              className="btn-9"
              onClick={() => handelSubmit()}
              style={seconds > 0 ? { opacity: '0.5' } : { opacity: '1' }}
              disabled={seconds > 0 ? true : false}>
              {loading ?
                <Spinner animation="border" />
                :
                "Send"
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