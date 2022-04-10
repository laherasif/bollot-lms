import type { NextPage } from "next";
import { useIntl } from "react-intl";
import React, { useState } from 'react'
import { useRouter } from "next/router";
// import Icons from "../../../src/icons";
// import instance from "../../../src/instance/axios";
const Home: NextPage = () => {
    const intl = useIntl();
    const router = useRouter();


    const [values, setValues] = useState({
        email: "",
        password: ""
    })


    // Handle change

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };





    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await instance.post("/api/login", {
                // "username",
                // "password",
            });
            router.push("/en/dashboard");
        } catch (err) {
            // setError(true);
        }
    };

    return (
        <>
            <section className="bg-1">
                <div className="container-main">
                    <div className="container logo-sec">
                        <div className="logo-1">
                            <img src="assets\images\ballot-1-logo.svg" alt="" />
                        </div>
                        <div className="logo-2">
                            <h3>Don’t have an account?</h3>
                            <p>Sign In</p>
                        </div>
                    </div>
                    <div className="wel">
                        <h3 className="text-center">Welcome Back!</h3>
                    </div>
                    <form onSubmit={handleClick}>
                        <div className="container login-sec">
                            <div className="login-bar">
                                <div className="flex-box">
                                    <div className="djksfbasdjk-sddsa">
                                        <div className="cst">
                                            <label className="lbl-login" >Full Name </label>
                                        </div>
                                        <input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Enter Email Address" />
                                    </div>
                                    <div className="djksfbasdjk-sddsa">
                                        <div className="cst">
                                            <label className="lbl-login" >Email Address</label>
                                        </div>
                                        <input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Enter Email Address" />
                                    </div>
                                    <div className="djksfbasdjk-sddsa">
                                        <div className="cst">
                                            <label className="lbl-login" >Password</label>
                                        </div>
                                        <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Enter Password" />
                                    </div>
                                    <button className="btn-1 mt-0 mb-4" >
                                        SignIn
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </>
    );
};

export default Home;
