import type { NextPage } from "next";

import { useIntl } from "react-intl";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";

const Home: NextPage = () => {
  // const intl = useIntl();

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
                className="full-name"
                type="text"
                placeholder="Full Name"
              />
              <br />
              <input className="full-name" type="text" placeholder="Email" />
              <br />
              <textarea
                className="full-name brd-20"
                rows={10}
                placeholder="Message"
              ></textarea>
              <br />
              <button className="bts">Send Message</button>
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
