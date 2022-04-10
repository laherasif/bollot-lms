import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";

import { useIntl } from "react-intl";
import BlogCard from "../../../src/components/card/BlogCard";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";

const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <div>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>        <section className="browse browse-bg1">
          <div className="container-3 all-browse">
            <div className="our mx-5">
              <h3>
                Welcome to Our <br /> Forever Updated <br /> Blog Post!
              </h3>
              <p>Be informed! Never miss a single post</p>
            </div>
          </div>
        </section>
      
        
        <section className="container-3 all-of my-5">
          <div className="all-of">
            {Array.from(Array(12), (_, i) => (
              <BlogCard />
            ))}
          </div>
        </section>
        <section className="container-3 number">
          <div className="num">
            <h3 className="num-11">01</h3>
            <h3 className="num-2">02</h3>
            <h3 className="num-2">03</h3>
            <h3 className="num-4">Next</h3>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
