import type { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect } from 'react'
import { useIntl } from "react-intl";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import instance from "../../../src/confiq/axios/instance";
import { loginUser, SocialRegMedia } from '../../../src/redux/actions/auth/user'
import { useRouter } from "next/router";
import Otp from '../../../src/components/otpverfication'
import Role from '../../../src/components/otp'
import { Firebaseapp } from "../../../src/confiq/firebase/firebase";
import Platform from 'react-platform-js'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
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


  const firebaseAuth = getAuth(Firebaseapp);
  const provider = new GoogleAuthProvider();
  const Fbprovider = new FacebookAuthProvider();
  const router = useRouter();


  let checkRouter = router.query.checkout


  useEffect(() => {
    if (User && User.is_email_verified === "1" && User.role === "student") {

      router.replace('/en/student/dashboard')

    }
    else if (checkRouter === "true") {
      router.push('/en/login')
    }

    else if (User && User.is_email_verified === "1" && User.role === "instructor") {

      router.replace('/en/instructor')
    }
    else if (User && User.is_email_verified === "0") {
      setMessage(true)
    }
    // else {
    //   setMessage(false)
    // }
  }, [User, checkRouter])


  // HendleInputs 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue({
      ...authValue,
      [event.target.name]: event.target.value
    });
  };




  const signInGog = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData }: any = user;
    dispatch(SocialRegMedia(providerData, permistion === 0 ? "student" : "instructor"))

  };


  const signInFb = async () => {

    const { user } = await signInWithPopup(firebaseAuth, Fbprovider);
    const { refreshToken, providerData }: any = user;
    dispatch(SocialRegMedia(providerData, permistion === 0 ? "student" : "instructor"))
  };


  useEffect(() => {
    if (plateform === "google.com") {
      signInGog()
    }
    else if (plateform === "facebook.com") {
      signInFb()
    }

  }, [permistion])


  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true)
    try {

      let value = {
        email: authValue.email,
        password: authValue.password,
        device_name: Platform.Browser,
        device_model: Platform.BrowserVersion,
        operating_system: Platform.OS
      }

      let res = await instance.post("api//login", value)
      if (res.data.success === true && res.data.response.student.is_email_verified === "1" && res.data.response.student.role === "student") {
        setLoader(false)
        dispatch(loginUser(res.data))
        if (router.query.checkout === "true") {
          router.push("/en/checkout");

        }
        else {
          router.push("/en/student/dashboard");
        }

      }
      else if (res.data.success === true && res.data.response.student.is_email_verified === "1" && res.data.response.student.role === "instructor") {
        setLoader(false)
        dispatch(loginUser(res.data))
        router.push("/en/instructor");

      }
      else if (res.data.errors || res.data.error) {
        setLoader(false)
        setErrors(res.data.errors || res.data.error)
      }

      else {
        setOtp(res.data.response.student.role)
        setMessage(true)
        setLoader(false)

      }

    } catch (err) {
      setLoader(false)
    }
  };



  let { email, password } = authValue

  return (
    <>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
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
                <input
                 className={`full-2 ${errors.email && 'full-2 input_filed_error'}`} name="email" value={email} onChange={handleChange} type="email" placeholder="Email" />
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
            <Link href="/en/forgotpassword">
              <h6 style={{ cursor: 'pointer' }}>Forgot Password?</h6>
            </Link>
            <h6>Don't have an account?    <Link href={"/en/signup"}>Sign Up</Link></h6>
            <h4>OR</h4>

            <button
              onClick={() => { setPlateform('facebook.com'), setToggal(true) }}
              className="face-book-1 w-100">
              <Icons name="c21" />
              <h4>Sign in with Facebook</h4>
            </button>
            <button
              onClick={() => { setPlateform('google.com'), setToggal(true) }}
              className="google-1 w-100">
              <Icons name="c22" />
              <h4>Sign in with Google</h4>
            </button>
          </div>
        </div>
        {message && <Otp openToggle={(e: any) => setMessage(e)} providerEmail={"laherasif@gmail.com"} role={message} />}
        {toggal && <Role permition={(e: any) => setPermition(e)} Toggle={(e: any) => setToggal(e)} />}
      </section>
      <Footer />
    </>
  );
};

export default Home;
