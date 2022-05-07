import type { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect } from 'react'
// import { useIntl } from "react-intl";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import instance from '../../../src/confiq/axios/instance'
import { SocialRegComp } from "../../../src/redux/actions/auth/user";
import { useRouter } from "next/router";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Otp from '../../../src/components/otpverfication'
import { SignUp, CleanState } from '../../../src/redux/actions/auth/user'
import { Firebaseapp } from "../../../src/confiq/firebase/firebase";
import insImg from '../../../src/assets/images/instructor.png'
import stuImg from '../../../src/assets/images/student.png'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import Image from "next/image";
import { Form } from "react-bootstrap";
const Home: NextPage = () => {
  // const intl = useIntl();

  interface SignUp {
    fullname?: string,
    email?: string,
    password?: number | string,
    role?: number,
    companyName: string,
    companySize: number,
    companyAddres: string
  }


  const { varified } = useSelector((state: RootStateOrAny) => state.userReducer)


  const [authValue, setAuthValue] = useState<SignUp>({
    fullname: "",
    email: "",
    password: "",
    companyName: '',
    companySize: '',
    companyAddres: ''
  })
  const [role, setRole] = useState(0)
  const [message, setMessage] = useState<boolean>(false)
  const [providerEmail, setProviderEmail] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)
  const [errors, setErrors] = useState({})


  useEffect(() => {
    if (!varified) {
      dispatch(CleanState())
    }
  }, [])


  const firebaseAuth = getAuth(Firebaseapp);
  const provider = new GoogleAuthProvider();
  const Fbprovider = new FacebookAuthProvider();
  const router = useRouter();

  const dispatch = useDispatch()


  const signInGog = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    dispatch(SocialRegComp(providerData, "company"))

    let object = Object.assign({}, ...providerData);
    setTimeout(() => {
      setMessage(true)
    }, 1000);

  };



  const signInFb = async () => {
    const { user } = await signInWithPopup(firebaseAuth, Fbprovider);
    const { refreshToken, providerData } = user;
    dispatch(SocialRegComp(providerData, "company"))
  };



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

      let value = {
        fullname: fullname,
        email: email,
        companyName: companyName,
        companySize: companySize,
        companyAddres: companyAddres,
        role: "company"
      }


      let res = await instance.post("api//company/signup", value)

      if (res.data.success === true) {
        dispatch(SignUp(res.data))
        setMessage(true)
        setLoader(false)

      }
      else {
        setErrors(res.data.error)
        setLoader(false)

      }
    } catch (err) {
      console.log("err", err)
    }
  };



  let { fullname, email, password, companyName ,
    companySize,
    companyAddres } = authValue

  return (
    <div>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>
      <section className="ccontainer-3 touch-2">
        <div className="is-cols is-cols-2">
          <div className="sign-up-2">
            <form onSubmit={handleClick}>
              <h3>Sign Up</h3>
              <p>Sign Up and Start Learning!</p>
              <div className="hasdfkj mt-3">
                <input className={`full-2 ${errors.fullname && 'full-2 input_filed_error'}`} type="text" value={fullname} name="fullname" onChange={handleChange} placeholder="Full Name" />
                {errors.fullname && <div className="invalid mb-1">{errors?.fullname[0]}</div>}
              </div>
              <div className="hasdfkj">
                <input className={`full-3 ${errors.email && 'full-3 input_filed_error'}`}

                  type="email"
                  value={email}
                  name="email" onChange={handleChange} placeholder="Email" />
                {errors.email && <div className="invalid mb-1">{errors?.email[0]}</div>}

              </div>

              <div className="hasdfkj">
                <input className={`full-3 ${errors.password && 'full-3 input_filed_error'}`}

                  type="password"
                  value={password}
                  name="password" onChange={handleChange} placeholder="company Name" />
                {errors.password && <div className="invalid mb-1">{errors?.password[0]}</div>}

              </div>
              <div className="hasdfkj">
                <input className={`full-3 ${errors.companyName && 'full-3 input_filed_error'}`}

                  type="text"
                  value={companyName}
                  name="companyName" onChange={handleChange} placeholder="company Name" />
                {errors.companyName && <div className="invalid mb-1">{errors?.companyName[0]}</div>}

              </div>
              <div className="hasdfkj">
                <Form.Select name="companySize" className={`full-2 ${errors.companySize && 'full-2 input_filed_error'}`}  value={companySize} onChange={handleChange}>
                  <option defaultChecked>Company Size</option>
                  <option >I am a contractor / freelance</option>
                  <option >1 - 199</option>
                  <option >200 - 999</option>
                  <option >1000 - 5,000</option>
                  <option >50,001 +</option>

                </Form.Select>
                {errors.companySize && <div className="invalid mb-1">{errors?.companySize[0]}</div>}

              </div>

              <div className="hasdfkj">
               <textarea name="companyAddres" placeholder="Legal Address" style={{width:'100%'}}  className={`full-3 ${errors.companyAddres && 'full-3 input_filed_error'}`} value={companyAddres}  onChange={handleChange}>

               </textarea>
                {errors.companyAddres && <div className="invalid mb-1">{errors?.companyAddres[0]}</div>}

              </div>

              <div className="d-flex">
                <input className="full-3" type="checkbox"  />
                <h6 className="tleft">
                  Yes! I want to get the most out of Bolloot by receiving emails
                  with exclusive deals, personal recommendations and learning
                  tips!
                </h6>
              </div>

              <div className="hasdfkj">
                <button className="btn-9" >
                  {loader ?
                    <div className="spinner-border text-light" role="status">
                    </div>
                    :
                    "Sign Up"
                  }
                </button>
              </div>
            </form>

            <h6>
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </h6>
            <h6>
              Alreadynhave an account? <Link href={"/en/businesslogin"}>Login</Link>
            </h6>
            <h4>OR</h4>


            {/* <button className="apples-1 w-100">
              <Icons name="c20" />
              <h4>Sign in with Apple</h4>
            </button> */}
            <button
              onClick={signInFb}

              className="face-book-1 w-100">
              <Icons name="c21" />
              <h4>Sign in with Facebook</h4>
            </button>
            <button
              onClick={signInGog}

              className="google-1 w-100">
              <Icons name="c22" />
              <h4>Sign in with Google</h4>
            </button>
          </div>
          <div className="sign-2-img ">
            <Icons name="c23" />
          </div>
        </div>
      </section>
      <Footer />


      {message && <Otp openToggle={(e) => setMessage(e)} providerEmail={"laherasif@gmail.com"} role={authValue.role} />}
    </div>
  );
};

export default (Home);
