import type { NextPage } from "next";
// import Dropdown from "../../../../src/components/student/dropdown";
// import { useIntl } from "react-intl";
// import Sidebar from "../../../../src/components/student/sidebar";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
// import CourseCard from "../../../../src/components/student/CourseCard";
import NavigationBar2 from "../../../../src/components/student/NavigationBar2";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect , useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import CourseSideBar from "../../../../src/components/student/courseSidebar";
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
  const [courseId , setCourseId] = useState('')
  const router = useRouter()
  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)

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
        let res = await AxInstance.get(`api//student/my-courses/${router.query.id}`)
        console.log("res", res)
        if(res.data.success === true ){
          setCourseId(res.data.response.course.id)
        }
        
      } catch (error) {
        
      }
    
    }
    fetchCourse()
  }, [])
  return (
    <>
      <NavigationBar2 />

      <section className="dash-board">
        <div className="dash-board-1">
          <CourseSideBar courseId={courseId}/>
          <div className="w-100">
            <div className="sad-ds-asajd">
              <div className="dash-2 m-0">
                <div className="my-course">
                  <TopNavbar />
                </div>
              </div>
            </div>
            <div className="my-course jdsad-snd">
              <h3>
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
              <p>
                Motion Design with Figma: Animations, Motion Graphics & UX
                Design{" "}
              </p>
              <div className="seting-method-payment">
                <div className="first-payment-1">
                  

                  <div className="start-list-item">
                    <img src="/assets/images/Group 276.png" alt="course_img"/>
                  </div>
                </div>
                <div className="first-payment-1">
                  <div className="com-flex-1 ">
                    <h3>Course Details</h3>
                  </div>

                  <div className="start-list-item">
                    <ul className="sjasd-dsajd">
                     
                      <img className="shadsa-sdnds" src="/assets/images/Group 276.png" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// export const getServerSideProps = async ({ params }: any) => {

//   const res = await instance.get(
//     `api//courses/${params.id}`,
//   );
//   return {
//     props: {
//       Course: res.data.response.course,
//     },
//   };
// };

export default Home;
