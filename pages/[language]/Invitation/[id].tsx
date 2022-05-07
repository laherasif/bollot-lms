import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
// import ReactStars from "react-rating-stars-component";
// import { useIntl } from "react-intl";
// import BlogCard from "../../../src/components/card/BlogCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import CourseAccordian from "../../../src/components/accordian";
import FeaturedReview from "../../../src/components/FeaturedReview";
import BoughtCourseCard from "../../../src/components/BoughtCourseCard";
// import CourseCard1 from "../../../src/components/card/CourseCard1";
// import CourseCardBig from "../../../src/components/card/CourseCardBig";
// import FBTCard from "../../../src/components/card/FBTCard";
import FBCBox from "../../../src/components/FBCBox";
import InstructorCard from "../../../src/components/InstructorCard";
import RatingBar from "../../../src/components/RatingBar";
import Review from "../../../src/components/Review";
// import CourseCard from "../../../src/components/card/CourseCard";
// import Multicarousel from "../../../src/components/Multicarousel";
import MulticarouselCourse from "../../../src/components/MulticarouselCourse";
import instance from "../../../src/confiq/axios/instance";
import Rating from "../../../src/components/ratingStar";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { SaveCart } from "../../../src/redux/actions/course/course";
import { useState, useEffect } from "react";
import Link from 'next/link'
import InfoCart from "../../../src/components/cartInfoPopup";
import PreviewModel from "../../../src/components/preview";


const Home: NextPage = ({ Course }: any) => {
  // const intl = useIntl();

  console.log("course", Course)
  const [message, setMessage] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [Info, setInfo] = useState(false)
  const [show, setShow] = useState(false)
  const [preview, setPreview] = useState(false)



  const dispatch = useDispatch()

  const { AddCart } = useSelector((state: RootStateOrAny) => state.cartReducer)

  useEffect(() => {
    // let findCart = AddCart?.includes({id : 3} )
    for (let index = 0; index < AddCart?.length; index++) {
      const element = AddCart[index].id;
      if (element === Course?.id) {
        setMessage(true)

      }
    }
  }, [])


  const ratings = () => {
    // for (const [key, value] of Object.entries(Cours?.ratings_breakdown)) {
    //   // "a 5", "b 7", "c 9"
    //   <RatingBar stars={key} rates={value} />

    // }
    Object.entries(Cours?.ratings_breakdown).map((key, value) => {
      return (
        <RatingBar stars={key} rates={value} />
      )
    });
  }





  let numberofLect = 0
  Course?.sections?.forEach(datum => numberofLect += datum.lectures.length)



  const RegisterCart = async () => {
    if (message === true) {
      setPopUp(false)
    }
    else {
      setPopUp(true)
      let pair = { Quantity: 1 };
      let newObj = { ...Course, ...pair }
      dispatch(SaveCart(newObj))
      setTimeout(() => {
        setPopUp(false)
        setMessage(true)
        setInfo(true)

      }, 1000);
    }
  }

  return (
    <>
     <h3>Invitaiton page </h3>
        
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {

  const res = await instance.get(
    `api//company/invite-details/${params.id}`,
  );
  return {
    props: {
      Course: res.data.response.course_details,
    },
  };
};


export default Home;
