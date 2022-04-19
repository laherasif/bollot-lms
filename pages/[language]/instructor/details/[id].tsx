import type { NextPage } from "next";
import Dropdown from "../../../../src/components/instructor/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/instructor/TopNavbar";
// import CourseCard from "../../../src/components/CourseCard";
import NavigationBar2 from "../../../../src/components/instructor/NavigationBar2";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { Small } from "../../../../src/components/instructor/loader";
const options = ["one", "two", "three"];
export const VideTitle = ({
  isChecked,
  title,
}: {
  isChecked: Boolean;
  title: string;
}) => {
  return <li>
    {isChecked == true ? (
      <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={9} cy={9} r={9} fill="#D0565C" />
        <path d="M4 9L6.5 12L13.5 5" stroke="white" />
      </svg>
    ) : (
      <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={9} cy={9} r="8.5" stroke="#D0565C" />
      </svg>
    )}
    <span>Video:</span>
    {title}
  </li>
}
export const Header2Item = ({
  isChecked,
  title,
}: {
  isChecked: Boolean;
  title: string;
}) => {
  return (
    <div className="ksajdfds-sads">
      {isChecked == true ? (
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={9} cy={9} r={9} fill="#D0565C" />
          <path d="M4 9L6.5 12L13.5 5" stroke="white" />
        </svg>
      ) : (
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={9} cy={9} r="8.5" stroke="#D0565C" />
        </svg>
      )}
      <h3>{title}</h3>
    </div>
  );
};
const Home: NextPage = () => {
  // const intl = useIntl();
  const router = useRouter()
  let courseId = router.query.id

  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState([])

  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//instructor/courses/${courseId}`)
        if (res.data.success === true) {
          setLoading(false)
          setCourse(res.data.response.course)
        }
        else {
          setLoading(false)

        }
      } catch (error) {

      }

    }
    fetchCourse()
  }, [])

  console.log("course", course)

  return (
    <>
      <NavigationBar2 />

      <section className="dash-board">
        <div className="dash-board-1">
          <div className="aksldnsd-sdnaskdse">
            <div className="aksldnsd-sdnaskdse-1">
              <img src={User.image || '/assets/images/umpire-1.svg'} />
              <p>{User.fullname || "Instructor"}</p>
            </div>

            <div className="hsaid9iawdeka">
              <div >
                <h2 className="ksdfhd-active">Overview</h2>
                <div>
                  <Header2Item title="Week 01" isChecked={true} />
                  <Header2Item title="Week 02" isChecked={true} />
                  <Header2Item title="Week 03" isChecked={false} />
                  <Header2Item title="Week 04" isChecked={false} />
                </div>
              </div>
              <div>
                <h2>Notes</h2>
              </div>
              <div>
                <h2>Announcements</h2>
              </div>
              <div>
                <h2>Resources</h2>
              </div>
              <div>
                <h2>Live Classes</h2>
              </div>
              <div>
                <h2>Review</h2>
              </div>
            </div>
          </div>
          <div className="w-100">
            <div className="sad-ds-asajd">
              <div className="dash-2 m-0">
                <div className="my-course">
                  <TopNavbar />
                </div>
              </div>
            </div>
            {loading ? Small()
              :
              <div className="my-course jdsad-snd">
                <Link href="/en/instructor/courses">
                  <h3 style={{ cursor: 'pointer' }}>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.57 5.93L3.5 12L9.57 18.07"
                        stroke="#131313"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.4999 12H3.66992"
                        stroke="#131313"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span style={{ marginLeft: 10 }}>Back</span>
                  </h3>
                </Link>
                <p>
                  {course?.title}
                </p>
                <div className="seting-method-payment">
                  <div className="first-payment-1">


                    <div className="start-list-item">
                      <img src={course?.cover_image} alt="cover_img" width="100%" height="300px" style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div className="first-payment-1">
                    <div className="com-flex-1 ">
                      <h3>Course Description</h3>
                    </div>

                    <div className="start-list-item">
                      <ul className="sjasd-dsajd">
                        <h5>
                          {course?.long_desc}
                        </h5>
                        <p>Catagory : {course?.category?.name}</p>
                        <p>Instrctor By: {course?.instructor?.fullname}</p>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
