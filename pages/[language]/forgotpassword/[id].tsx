import type { NextPage } from "next";
import Navbar from "../../../src/components/header/Navbar";
import { useEffect, useState } from "react";
import Email from "../../../src/components/passwordEmail";
import Otp from "../../../src/components/passwordOtp";
import Password from "../../../src/components/passwordReset";
import { Small } from "../../../src/components/instructor/loader";
// import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
    // const intl = useIntl();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [stepn, setStepn] = useState([
        { one: true },
       
      ]);
    


    // const { pageNo } = useSelector((state: RootStateOrAny) => state?.userReducer)
    // const dispatch = useDispatch()


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])


    const stepChangeHandler = () => {

        if (step + 1 === 1) {
            setStepn([...stepn, { tw: true }])
        }
        else if (step + 1 === 2) {
            setStepn([...stepn, { th: true }])
        }
        setStep(step + 1);
    }
    return (
        <div className="inst">
            <Navbar />
            <section className="dash-board jadsifd-asdasid">
                <div className="ksadsa-w4a3k4">

                </div>
                {loading ? Small()
        :
                <div className="dash-board-1">
                    <div className="dash-2 ">
                        <div className="my-course">


                            <div className="complete-web-1 ">

                            </div>
                            <div className="complete-web-1">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5  p-0 mt-3 mb-2" style={{ width: '60%' }}>
                                            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                                                <div id="msform" className="w-100" >
                                                    <ul id="progressbar" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <li className="active" id="account">
                                                            <strong>Email Address</strong>
                                                        </li>
                                                        <li className={stepn[1]?.tw  ? "active" : ''} id="personal">
                                                            <strong>Verify Otp code </strong>
                                                        </li>
                                                        <li className={stepn[2]?.th ? "active" : ''} id="payment">
                                                            <strong>Reset Password</strong>
                                                        </li>

                                                    </ul>

                                                    <br /> {/* fieldsets */}
                                                    <fieldset>
                                                        <div style={{ textAlign: 'left', padding: '0px 30px' }}>
                                                            {/* {stepPages[step]} */}
                                                            {step === 0 && <Email
                                                                onStepChange={stepChangeHandler}
                                                            />}
                                                            {step === 1 && <Otp
                                                                onStepChange={stepChangeHandler}
                                                            />}
                                                            {step === 2 && <Password
                                                            />}
                                                           

                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                 } 
            </section>
        </div>
    );
};

export default Home;
