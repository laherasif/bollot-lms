import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link'
import Icons from '../icons';
export default () => {
  return <div className="footer-p">
    <div className="footer">
      <div className="footer-inner">
        <div>
          <img src="/logofooter.png" />
          <p>
            Bolloot is an online education platform that delivers video
            courses, programs and resources.
          </p>
        </div>
        <div className="d-flex flex-column">
          <h4>QuickLinks</h4>
          <Link href="/">
            Home
          </Link>
          <Link href="/en/howitwork">
            Tech on boloot
          </Link>
          <Link href="/en/courses">
            Courses
          </Link>

          <Link href="/en/about2">
            About Us

          </Link>
          {/* <Link href="/en/contact">
            Contact Us
          </Link>
          <Link href="/en/profile">
            Profile
          </Link> */}
        </div>
        <div className="d-flex flex-column">
          <h4>QuickLinks</h4>

          <Link href="/en/affiliate">
            Affiliate 
          </Link>
          <Link href="/en/blogs">
            Blog
          </Link>
          <Link href="/en/news">
            News and Event
          </Link>

          <Link href="/en/faq">
            FAQ
          </Link>
          {/* <Link href="/en/privacy">
            Privacy Policy

          </Link>
          <Link href="/en/terms">
            Terms & Conditions

          </Link>
          <Link href="/en/terms2">
            Terms & Conditions 2

          </Link>
          <Link href="/en/help">
            Help and Support

          </Link> */}
        </div>
        <div>
          <Dropdown className="cst-drp">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Icons name="c25" />
              <span>English</span>
              <div className="cstsihdfs">
                <Icons name="c26" />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Arabic</Dropdown.Item>
              {/* <Dropdown.Item href="#/action-2">
                Another action
              </Dropdown.Item> */}
              {/* <Dropdown.Item href="#/action-3">
                Something else
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="cst-drp">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Icons name="c25" />
              <span>USD</span>
              <div className="cstsihdfs">
                <span className="mx-2">$</span>
                <Icons name="c26" />
              </div>
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      </div>
    </div>
    {/* <div className="footer-bottom">
    <div className="f-b-i">
    <div>
      <a>All Right Reserved | Bolloot 2022</a>
    </div>
    <div>
      <a>Terms & Conditions</a>
      <a>Privacy Policy </a>
    </div>
    </div>
    </div> */}
  </div>
}