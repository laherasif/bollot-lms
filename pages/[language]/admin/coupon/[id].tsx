import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Search from "../../../../src/components/instructor/search";
import DataTable from "react-data-table-component";
import AddBlog from "../../../../src/components/admin/addBlog";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import AddCoupon from "../../../../src/components/admin/addCoupon";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [blog, setBlog] = useState([])
  const [showblog, setShowBlog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [coupon, setCoupon] = useState({})
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

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
        let res = await AxInstance.get('api//admin/coupons')
        console.log("Res", res)
        if (res.data.success === true) {
          setLoading(false)
          setBlog(res.data.response.coupons)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [showblog])

  const columns: any = [
    {
      name: "Creator Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.user.image} className="dlink" width="30%" height="50%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Creator",
      selector: "creator",
      sortable: true,
      cell: (d: any) => (
        <span style={{ margin: '0px 3px' }} >{d?.user?.fullname}</span>
      )
    },
    {
      name: "Coupon No",
      selector: "coupon_code",
      sortable: true,


    },

    {
      name: "Validate",
      selector: "valid_till",
      sortable: true,

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
                    <Link href="/en/instructor/" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3> Course Discount </h3>
                  </div>
                  <div className=" jidfjsd-asjreid">
                    {/* <Search /> */}
                    <div className="d-flex idfadsf-sads">
                      <button className="upload-1 sdisad-dsdactive" onClick={() => setShowBlog(true)} >
                        + Add New Blog </button>
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
                      selectableRows
                      highlightOnHover
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }




        {showblog && <AddCoupon permition={showblog} User={coupon} Toggle={(value: any) => setShowBlog(value)} />}
      </section >
    </div >
  );
};

export default Home;


