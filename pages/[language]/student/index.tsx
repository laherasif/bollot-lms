import type { NextPage } from "next";
import { useIntl } from "react-intl";
import React, { useState } from 'react'
import { useRouter } from "next/router";
// import instance from "../../src/instance/axios";
const Home: NextPage = () => {
  // const intl = useIntl();
  const router = useRouter();





  

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
              <p>Sign up</p>
            </div>
          </div>
          <div className="wel">
            <h3 className="text-center">Welcome Back!</h3>
          </div>
          <form >
            <div className="container login-sec">
              <div className="login-bar">
                <div className="flex-box">
                  <div className="djksfbasdjk-sddsa">
                    <div className="cst">
                      <label className="lbl-login" >Email Address</label>
                    </div>
                    <input type="text" name="email"  placeholder="Enter Email Address" />
                  </div>
                  <div className="djksfbasdjk-sddsa">
                    <div className="cst">
                      <label className="lbl-login" >Password</label>
                    </div>
                    <input type="password" name="password"  placeholder="Enter Password" />
                  </div>
                  <button className="btn-1" >Log In</button>
                </div>
                <h4 className="text-center">Forgot Password?</h4>
              </div>
            </div>
          </form>
        </div>
      </section>

    </>
  );
};

export default Home;
