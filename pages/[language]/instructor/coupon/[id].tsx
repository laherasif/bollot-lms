import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Search from "../../../../src/components/instructor/search";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import AddCoupon from "../../../../src/components/instructor/addCoupon";
import { Breadcrumb } from "react-bootstrap";
import moment from "moment";
import { SweetAlert } from "../../../../src/function/hooks";
import withAuth from "../../../../src/components/Hoc/authRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [blog, setBlog] = useState([])
  const [showblog, setShowBlog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [coupon, setCoupon] = useState({})
  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  const handleChange = (value: any) => {
    if (value.type === "close") {
      setShowBlog(false)
      setCoupon('')

    }
    else if (value.type === "load") {
      setShowBlog(false)
      setCoupon('')
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 1000);

    }
  }



  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//instructor/coupons')
        if (res.data.success === true) {
          setLoading(false)
          setBlog(res.data.response.coupons)
        }
      }
      catch (err) {
        SweetAlert({icon:'error' , text : err })

      }
    }
    fetchCourse()
  }, [loader === true])

  const columns: any = [
    {
      name: "Created by",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.user.image} className="dlink" width="30%" height="50%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "",
      selector: "creator",
      sortable: true,
      cell: (d: any) => (
        <span style={{ margin: '0px 3px' }} >{d?.user?.fullname}</span>
      )
    },
    {
      name: "Coupon Code",
      selector: "coupon_code",
      sortable: true,


    },

    {
      name: "Validate",
      selector: "valid_till",
      sortable: true,
      cell: (d: any) => (
        <span>{moment(d?.valid_till).format('ll')}</span>
      )
    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>

          <div onClick={() => { setShowBlog(true), setCoupon(d) }}>
            <i className='fa fa-edit'></i>
          </div>

          <div style={{ marginLeft: '20px' }}>
            <i className='fa fa-trash'></i>
          </div>

        </div >
      )
    }
  ];
  const filteredItems = blog?.filter(item => item.user?.fullname && item.user?.fullname.toLowerCase().includes(filterText.toLowerCase()));


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
                      <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link } href="/en/instructor/courses">
                        Courses
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Coupon</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <Link href="/en/instructor/courses" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3> Course Discount </h3> */}
                  </div>
                  <div className=" jidfjsd-asjreid">
                    {/* <Search /> */}
                    <div className="d-flex idfadsf-sads">
                      <button className="upload-1 sdisad-dsdactive" onClick={() => setShowBlog(true)} >
                        + Add New Coupon </button>
                    </div>
                  </div>
                </div>


                <div className="complete-web-1">

                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                    <div className="dsnodi-sdjsad">
                      <div className="searchbar-icon">
                        <FiSearch color="#8A8A8A" size={17} />

                      </div>
                      <input type="text" placeholder="Search" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
                    </div>

                  </div>

                  <div style={{ width: '100%' }}>
                    <DataTable
                      columns={columns}
                      data={filteredItems}
                      sortIcon={<i className='fa fa-arrow-down'></i>}
                      pagination
                      highlightOnHover
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }




        {showblog && <AddCoupon permition={showblog} User={coupon} Toggle={(value: any) => handleChange(value)} />}
      </section >
    </div >
  );
};

export default withAuth( Home );


