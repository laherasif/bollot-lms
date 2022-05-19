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
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
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

  const { User, } = useSelector((state: RootStateOrAny) => state.userReducer)



  const [authValue, setAuthValue] = useState<SignIn>({
    email: "",
    password: "",
  })

  const [message, setMessage] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  })
  const [otp, setOtp] = useState('')
  const [toggal, setToggal] = useState(false)
  const [permistion, setPermition] = useState()
  const [plateform, setPlateform] = useState('')



  const router = useRouter();


  let checkRouter = router.query.checkout




  // HendleInputs 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue({
      ...authValue,
      [event.target.name]: event.target.value
    });
  };






  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debugger
    setLoader(true)
    try {
      let res = await instance.post("api//admin/login", authValue)
      console.log("RE", res )
      if (res.data.success === true) {
        setLoader(false)
        dispatch(loginAdmin(res))
        router.push("/en/admin/dashboard");
        // if (router.query.checkout === "true") {
        //   router.push("/en/checkout");

        // }
        // else {
        // }

      }

      else if (res.data.errors || res.data.error) {
        setLoader(false)
        setErrors(res.data.errors || res.data.error)
      }

    } catch (err) {
      setLoader(false)
    }
  };



  let { email, password } = authValue

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
              <h3>Log In</h3>
              <p>Log In to Your Bolloot Account!</p>
              <br />
              <div className="hasdfkj">
                <input className={`full-2 ${errors.email && 'full-2 input_filed_error'}`} name="email" value={email} onChange={handleChange} type="email" placeholder="Email" />
                {errors?.email && <div className="invalid mb-1">{errors?.email[0]}</div>}

              </div>
              <div className="hasdfkj">
                <input className={`full-3 ${errors.password && 'full-3 input_filed_error'}`} name="password" value={password} onChange={handleChange} type="password" placeholder="Password" />
                {errors?.password && <div className="invalid mb-1">{errors?.password[0]}</div>}

                <br />
              </div>

              <div className="hasdfkj">
                <button className="btn-9">

                  {loader ?
                    <div className="spinner-border text-light" role="status">
                    </div>
                    :
                    "Log in"
                  }
                </button>
              </div>
            </form>
            <Link href="/en/admin/forgot">
              <h6 style={{cursor:'pointer'}}>Forgot Password?</h6>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
