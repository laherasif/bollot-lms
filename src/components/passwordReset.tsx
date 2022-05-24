import type { NextPage } from "next";
import React, { useState } from 'react'
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import instance from "../confiq/axios/instance";
import { SweetAlert } from "../function/hooks";
import { useRouter } from "next/router";
import { forgotPageNo, loginUser } from "../redux/actions/auth/user";

// export interface OTPInputProps {
//   onStepChange?: () => any;

// }

const Home: NextPage = () => {
  // const intl = useIntl();



  interface Errors {
    password?: string,
  }

  const dispatch = useDispatch()
  const router = useRouter()

  const [password, setPass] = useState('')
  const [loader, setLoader] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({})
  const { forgotEmail } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const handleClick = async () => {
    debugger
    setLoader(true)
    try {

      let value = {
        email: forgotEmail,
        password: password

      }

      let res = await instance.post("api//forgot-password/step-3", value)

      if (res.data.success === true && res.data.response.user.is_email_verified === "1" && res.data.response.user.role === "student") {
        // dispatch(forgotPageNo(0))
        setLoader(false)
        dispatch(loginUser(res.data))
        SweetAlert({ icon: 'success', text: res.data.message })
        router.push("/en/student/dashboard");
      }
      else if (res.data.success === true && res.data.response.user.is_email_verified === "1" && res.data.response.user.role === "instructor") {
        setLoader(false)
        // dispatch(forgotPageNo(0))
        SweetAlert({ icon: 'success', text: res.data.message })
        dispatch(loginUser(res.data))
        router.push("/en/instructor");

      }


      else {
        setLoader(false)
        setErrors(res.data.error)

      }


    } catch (err) {
      setLoader(false)
      SweetAlert({ icon: 'error', text: err })

    }
  };




  return (
    <>
      <section >

        <div className="sign-up-2" style={{ textAlign: 'center', margin: 'auto' }}>


          <div className="hasdfkj">

            <input
              className={`full-2 ${errors.password && 'full-2 input_filed_error'}`}
              style={errors.password ? { border: '1pt solid red ' } : { border: '1pt solid gray' }}
              name="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="New password" />
            {errors?.password && <div className="invalid mb-1">{errors?.password[0]}</div>}

          </div>

          <div className="hasdfkj">
            <button className="btn-9" onClick={() => handleClick()}>

              {loader ?
                <Spinner animation="border" />
                :
                "update "
              }
            </button>
          </div>

        </div>

      </section>
    </>
  );
};

export default Home;
