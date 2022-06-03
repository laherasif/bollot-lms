import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Small } from "../../../../src/components/admin/loader";
import Catagory from '../../../../src/components/admin/Catagory'
import AddCatagory from "../../../../src/components/admin/addCatagory";
import { getCatagories } from "../../../../src/redux/actions/admin";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { SweetAlert } from "../../../../src/function/hooks";
import { Breadcrumb } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const [add, setAdd] = useState(false)
  // const [loader, setLoader] = useState(false)

  // const dispatch = useDispatch()
  
  // const { token } = useSelector((state: RootStateOrAny) => state?.admin)
  
  // const AxInstance = axios.create({
    //   // .. where we make our configurations
    //   baseURL: 'https://dev.thetechub.us/bolloot/',
    //   headers: {
      //     token: token
      //   }
      
      // });

  const HandleClose = () => {
    // setLoader(true)
    setAdd(false)
  }

  // useEffect(() => {
  //   setLoading(true)
  //   try {
  //     let fetchCata = async () => {
  //       let resCata = await AxInstance.get('api//admin/categories')
  //       if (resCata.data.success === true) {
  //         dispatch(getCatagories(resCata.data.response.categories))
  //         setLoading(false)

  //       }
  //     }

  //     fetchCata()
  //   } catch (error) {

  //   }


  // }, [loader === true])


  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {loading ? Small()
          :
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">

                  <div className="back-btn">
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item active>Category</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className=" jidfjsd-asjreid">
                    {/* <Search /> */}
                    <div className="d-flex idfadsf-sads" onClick={() => setAdd(true)}>
                      <button className="upload-1 sdisad-dsdactive">
                        + Add New Category </button>
                    </div>
                  </div>
                </div>
                <div className="complete-web-1 mt-2">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 course">
                        <Link href="/en/admin/courses">
                          <button className="upload-1 ">
                            All Courses
                          </button>
                        </Link>
                        <Link href="/en/admin/coupon">
                          <button className="upload-1" >Coupons</button>
                        </Link>
                        <Link href="/en/admin/liveCourses">
                          <button className="upload-1" >Live Courses</button>
                        </Link>
                        <button className="upload-1 sdisad-dsdactive" >Course Categories</button>


                      </div>

                    </div>
                  </div>
                </div>

                <div className="complete-web-1">

                  <Catagory />


                </div>
              </div>
            </div>
          </div>
        }

        {add && <AddCatagory
          // catagory={catagory}
          permition={add}
          Toggle={() => HandleClose()} />}

      </section >
    </div >
  );
};

export default AdminAuth( Home );
