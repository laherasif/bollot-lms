import type { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect } from 'react'
import { useIntl } from "react-intl";
import Footer from "../../../../src/components/footer";
import Navbar from "../../../../src/components/header/Navbar";
import Icons from "../../../../src/icons";
import instance from "../../../../src/confiq/axios/instance";
// import { loginAdmin } from '../../../../src/redux/actions/auth/user'
import { useRouter } from "next/router";
import { useDispatch} from "react-redux";
import { loginAdmin } from "../../../../src/redux/actions/admin";
const Home: NextPage = () => {
  // const intl = useIntl();


  interface SignIn {
    email: string,
    password: number | string,
  }

  interface Errors {
    email: string,
    password: string,
  }

  const dispatch = useDispatch()




  const [authValue, setAuthValue] = useState<SignIn>({
    email: "",
    password: "",
  })

  const [loader, setLoader] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  })

  

  const router = useRouter();




  

  // HendleInputs 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue({
      ...authValue,
      [event.target.name]: event.target.value
    });
  };






  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true)
    try {
      let res = await instance.post("api//admin/login", authValue)
      if (res.data.success === true ) {
        setLoader(false)
          dispatch(loginAdmin(res))
          router.push("/en/admin/login");
      
      }
      else if (res.data.errors || res.data.error) {
        setLoader(false)
        setErrors(res.data.errors || res.data.error)
      }

    } catch (err) {
      setLoader(false)
    }
  };



  let { email } = authValue

  return (
    <>
      <div className="navBar-cst">
        {/* <div className="container-nav">
          <Navbar />
        </div> */}
      </div>
      <section className="ccontainer-3 touch-2">
        <div className="is-cols is-cols-1">
          <div className="sign-2-img">
            <Icons name="c19" />
          </div>
          <div className="sign-up-2">
            <form onSubmit={handleClick}>
              <p>Forgot Password</p>
              <br />
              <div className="hasdfkj">
                <input className={`full-2 ${errors.email && 'full-2 input_filed_error'}`} name="email" value={email} onChange={handleChange} type="email" placeholder="Email" />
                {errors?.email && <div className="invalid mb-1">{errors?.email[0]}</div>}

              </div>
              <div className="hasdfkj">
                <button className="btn-9">

                  {loader ?
                    <div className="spinner-border text-light" role="status">
                    </div>
                    :
                    "Send"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default  AdminAuth( Home );
