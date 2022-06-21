import type { NextPage } from "next";
// import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import Link from "next/link";
import withAuth from "../../../../src/components/Hoc/authRoute";
import Swal from "sweetalert2";
import { AddSocialRegMedia, LogoutIns, SocialRegMedia } from '../../../../src/redux/actions/auth/user'
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { Firebaseapp } from "../../../../src/confiq/firebase/firebase";
import { useEffect, useState } from "react";
import { Small } from "../../../../src/components/student/loader";

const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(true)

  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)

    }, 2000);

  })

  const DelAccount = () => {
    Swal.fire({
      title: 'Are your sure?',
      icon: "warning",
      showDenyButton: true,
      text: "You want to delete this account?",
      confirmButtonText: "Yes"


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.get('api//delete-my-account')
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            dispatch(LogoutIns())
            router.push('/en/login')
          });
      } else if (result.isDenied) {
        Swal.fire('Account are not deleted', '', 'info')
      }
    })

  }


  const firebaseAuth = getAuth(Firebaseapp);
  const provider = new GoogleAuthProvider();
  const Fbprovider = new FacebookAuthProvider();


  const signInGog = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData }: any = user;
    dispatch(AddSocialRegMedia(providerData, User))

  };


  const signInFb = async () => {

    const { user } = await signInWithPopup(firebaseAuth, Fbprovider);
    const { refreshToken, providerData }: any = user;
    dispatch(AddSocialRegMedia(providerData, User?.role))

  };





  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />

          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small() :
                <div className="hdsf0s-sadmsa">
                  <h3>Settings</h3>
                  <div className="complete-web-1">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst ">
                        <div className="maxima">
                          <button className="upload-1 sdisad-dsdactive" id="activetab">Account Security</button>
                          <Link href="/en/student/payments">
                            <button className="upload-1">Payment</button>
                          </Link>
                          <Link href="/en/student/notification">
                            <button className="upload-1">Notification</button>
                          </Link>
                          <Link href="/en/student/device">
                            <button className="upload-1">Manage Devices</button>
                          </Link>
                          <button className="upload-1" onClick={() => DelAccount()}>Close Account</button>
                        </div>
                      </div>
                    </div>

                    <div className="hjsaisa-sdnjassd" style={{ position: 'relative' }}>
                      <h5>Linked Accounts</h5>
                      <div className="logo-2 sadjasoad-sad">

                        <button onClick={() => signInFb()}>
                          <Icons name="c21" />
                          <p>Link with Facebook</p>
                          <div style={{ marginRight: '10px' }}>
                            {User?.fb_user_id !== null && User?.fb_user_id ?
                              <i className="fa fa-check-circle"></i>
                              : null}

                          </div>
                        </button>
                        <button onClick={() => signInGog()}>
                          <Icons name="c22" />
                          <p>Link with Google</p>
                          {User?.google_user_id !== null && User?.google_user_id ?
                            <i className="fa fa-check-circle"></i>
                            : null}
                        </button>
                      </div>



                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Home);
