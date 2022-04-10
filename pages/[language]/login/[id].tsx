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
import Otp from '../student/otp'
import Role from '../../../src/components/otp'
import { Firebaseapp } from "../../../src/confiq/firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
const Home: NextPage = () => {
  // const intl = useIntl();


  interface SignIn {
    email: string,
    password: number | string,
  }

  const dispatch = useDispatch()

  const { fieldErrors, User, varified } = useSelector((state: RootStateOrAny) => state.userReducer)



  const [authValue, setAuthValue] = useState<SignIn>({
    email: "",
    password: "",
  })

  const [message, setMessage] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState('')
  const [toggal, setToggal] = useState(false)
  const [permistion, setPermition] = useState()
  const [plateform, setPlateform] = useState('')



  useEffect(() => {
    if (User && User.is_email_verified === "1" && User.role === "student") {
      router.replace('/en/student/dashboard')
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
  }, [User])


  // HendleInputs 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue({
      ...authValue,
      [event.target.name]: event.target.value
    });
  };



  const firebaseAuth = getAuth(Firebaseapp);
  const provider = new GoogleAuthProvider();
  const Fbprovider = new FacebookAuthProvider();
  const router = useRouter();



  const signInGog = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    console.log(refreshToken, providerData);
    dispatch(SocialRegMedia(providerData, permistion === 0 ? "student" : "instructor"))
    
  };


  const signInFb = async () => {

    const { user } = await signInWithPopup(firebaseAuth, Fbprovider);
    const { refreshToken, providerData } = user;
    console.log(refreshToken, providerData);
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
    debugger
    setLoader(true)
    try {
      let res = await instance.post("api//login", authValue)
      if (res.data.success === true && res.data.response.student.is_email_verified === "1" && res.data.response.student.role === "student") {
        setLoader(false)
        dispatch(loginUser(res.data))
        router.push("/en/student");

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
      console.log("err", err)
    }
  };



  let { email, password } = authValue
  console.log("mess", message)

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
                <input className="full-2" name="email" value={email} onChange={handleChange} type="email" placeholder="Email" />
                {errors?.email && <div className="invalid mb-1">{errors?.email[0]}</div>}

              </div>
              <div className="hasdfkj">
                <input className="full-3" name="password" value={password} onChange={handleChange} type="password" placeholder="Password" />
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

            <h6>Forgot Password?</h6>
            <h6>Don't have an account?    <Link href={"/en/signup"}>Sign Up</Link></h6>
            <h4>OR</h4>
            <div className="apples-1">
              <Icons name="c20" />
              <h4>Sign in with Apple</h4>
            </div>
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
        {message && <Otp openToggle={(e) => setMessage(e)} providerEmail={"laherasif@gmail.com"} role={message} />}
        {toggal && <Role permition={(e) => setPermition(e)} Toggle={(e) => setToggal(e)} />}
      </section>
      <Footer />
    </>
  );
};

export default Home;