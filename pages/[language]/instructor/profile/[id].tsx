import type { NextPage } from "next";
// import { useIntl } from "react-intl";
// import Sidebar from "../../../../src/components/instructor/sidebar2";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { Dropdown } from "react-bootstrap";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../../src/icons";
// import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import Chart from "../../../../src/components/instructor/chart";
// import Chart1 from "../../../../src/components/instructor/chart1";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
// import BookmarkCard from "../../../../src/components/instructor/BookmarkCard";
import { useSelector, RootStateOrAny } from "react-redux";
import { useState } from "react";
import EditProfile from '../../../../src/components/instructor/editProfile'
import withAuth from "../../../../src/components/Hoc/authRoute";
// const options = ["one", "two", "three"];


const Home: NextPage = () => {
  // const intl = useIntl();
 

  const { User } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const [edit, setEdit] = useState(false)


  console.log(User)


  return (
    <div className="inst idnasd0w3-edsad">
      <NavigationBar1 />


      <section className="dash-board kjasf-asdasd2 jadsifd-asdasi ">
        <div className="dash-board-1">
          <div className="dash-2 ">
            <Link href="/en/instructor">
              <div className="my-course jifas-saw3iesd9">
                <h5>
                  <i className="fa fa-arrow-left"></i>
                  Go back
                </h5>
              </div>
            </Link>
            <div className="jdsfaf-sdfni3e-d">
              <div>
                <div className="jfoadsf-sadmad">
                  <img src={User?.image || "/assets/images/umpire-1.svg"} />
                  <div>
                    <h5>{User?.fullname}</h5>
                    <div className="idfadsf-sads adsjkfdsao-sadsk">
                      <button className="upload-1 sdisad-dsdactive" onClick={() => setEdit(true)}>
                        <i className="fa fa-edit"></i>
                        Profile

                      </button>
                      {/* <button className="upload-1 sdisad-dsdactive">
                        <Icons name="i21" />
                        Website
                      </button>
                      <button className="upload-1 sdisad-dsdactive">
                        <Icons name="i22" />
                        Youtube
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p>{User?.tagline}</p>
              </div>
            </div>

            <div className="djisajfs-3jeiasd">
              <div className="dsfjaio3-ejsd">
                <div className="fidaso-keosad">
                  <p>Total students</p>
                  <h3>0</h3>
                </div>
                <div className="fidaso-keosad">
                  <p>Reviews</p>
                  <h3>{User?.avg_instructor_reviews?.count}</h3>
                </div>
              </div>

              <h4 className="sijdas-w3edj">About Me</h4>
              <div className="jdsfioas03kewsd">
                <p>
                  {User?.about}
                </p>

              </div>
              {/* <div className="d-flex flex-wrap my-5">
                <BookmarkCard />
                <BookmarkCard />
                <BookmarkCard />
                <BookmarkCard />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {edit && <EditProfile User={User} permition={edit} Toggle={(value: any) => setEdit(value)} />}
    </div>
  );
};

export default withAuth( Home );
