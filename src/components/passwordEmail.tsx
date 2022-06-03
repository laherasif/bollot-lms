import type { NextPage } from "next";
import React, { useState } from 'react'
// import instance from "../../../src/confiq/axios/instance";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { forgotEmail } from '../../src/redux/actions/auth/user'
import instance from "../confiq/axios/instance";
import { SweetAlert } from "../function/hooks";
// import { SweetAlert } from "../../function/hooks";

// export interface OTPInputProps {
//   onStepChange?: () => any;
 
// }

const Home: NextPage = ({ onStepChange }:any) => {
  // const intl = useIntl();



interface Errors {
  email?: string,
}

const dispatch = useDispatch()

const [email, setEmail] = useState('')
const [loader, setLoader] = useState<boolean>(false)
const [errors, setErrors] = useState<Errors>({})


const handleClick = async () => {
  debugger
  setLoader(true)
  try {

    let value = {
      email: email,

    }

    let res = await instance.post("api//forgot-password/step-1", value)
    if (res.data.success === true) {
      setLoader(false)
      SweetAlert({ icon: 'success', text: res.data.message })
      dispatch(forgotEmail(value.email))
      onStepChange()

    }
    else {
      setLoader(false)
      setErrors(res.data.error)

    }
  } catch (err) {
    setLoader(false)
  }
};




  return (
    <>
    <section >

      <div className="sign-up-2" style={{ textAlign: 'center', margin: 'auto' }}>

        <div className="hasdfkj">
          <input
            className={`full-2 `}
            style={errors.email ? {border:'1pt solid red '} : {border :'1pt solid'}}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email" />
          {errors?.email && <div className="invalid mb-1">{errors?.email[0]}</div>}

        </div>

        <div className="hasdfkj">
          <button className="btn-9" onClick={() => handleClick()}>

            {loader ?
              <div className="spinner-border text-light" role="status">
              </div>
              :
              "Send"
            }
          </button>
        </div>

      </div>

    </section>
    </>
  );
};

export default Home;
