import type { NextPage } from "next";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import instance from "../../../src/confiq/axios/instance";
import { SweetAlert } from "../../../src/function/hooks";
import Icons from "../../../src/icons";

const Home: NextPage = () => {
  // const intl = useIntl();

  interface StateTypes {
    name?: string,
    email?: string,
    message?: string,
  }
  const [state, setState] = useState<StateTypes>({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<StateTypes>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = async () => {
    try {
      setLoading(true)
      let res = await instance.post('api//contact-us', state)
      if (res.data.success === true) {
        SweetAlert({ icon: "success", text: res.data.message })
        setLoading(false)
        setState({
          name: "",
          email: "",
          message: "",
        })

      }
      else {
        setError(res.data.error)
        setLoading(false)
      }
    } catch (error) {

    }
  }


  return (
    <div className="touch-bg">
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>
      <div className="">
        <section className="ccontainer-3 touch-2 ">
          <div className="is-cols is-cols-2">
            <div className="Get-to">
              <h3>Get In Touch</h3>
              <p>We are at your call. We serve you always.</p>
              <h4>Let's Talk!</h4>
              <h5>
                We do noramlly get back within 48hrs. Please <br />
                leave a message.
              </h5>
              <input
                className={error?.name ? " full-name-error" : "form-control full-name" }
                type="text"
                name="name"
                value={state.name}
                onChange={(e: any) => handleChange(e)}
                placeholder="Full Name"
              />
              {error?.name && <div className="invalid mb-1">{error?.name[0]}</div>}

              <br />
              <input
                className={error?.name ? " full-name-error" : "form-control full-name" }
                
                type="email"
                name="email"
                value={state.email}
                onChange={(e: any) => handleChange(e)}
                placeholder="Email" />
              {error?.email && <div className="invalid mb-1">{error?.email[0]}</div>}

              <br />
              <textarea
                className={error?.name ? " full-name-error brd-20" : "form-control full-name brd-20" }
                rows={10}
                name="message"
                value={state.message}
                onChange={(e: any) => handleChange(e)}
                placeholder="Message"
              ></textarea>
              {error?.message && <div className="invalid mb-1">{error?.message[0]}</div>}

              <br />

              <button className="bts" onClick={handleSubmit}>
                {loading ?
                  <Spinner animation="border" />
                  :
                  " Send Message"
                }
              </button>
            </div>

            <div className="sign-2-img">
              <Icons name="c24" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
