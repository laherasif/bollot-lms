import type { NextPage } from "next";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import DataTable from "react-data-table-component";
import { FiSearch } from "react-icons/fi";
import { SweetAlert } from "../../../../src/function/hooks";
import moment from "moment";
import { Breadcrumb, Spinner } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [checkout, setCheckout] = useState([])
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [del, setDel] = useState(false)
  const [filterText, setFilterText] = useState('');

  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  const Approved_Checkout = async (id: number) => {
    try {
      setLoader(true)
      let res = await AxInstance.post(`api//admin/checkouts/pending/approve`, { checkout_id: id })
      if (res.data.success === true) {
        SweetAlert({ icon: "success", text: res.data.message })
        setLoader(false)
        setDel(true)
      }

    } catch (error) {
      setLoader(false)
      SweetAlert({ icon: "error", text: error })


    }

  }





  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//admin/checkouts/pending')
        if (res.data.success === true) {
          setLoading(false)
          setDel(false)
          setCheckout(res.data.response.checkouts)
        }
      }
      catch (err) {
        SweetAlert({ icon: 'error', text: err })
      }
    }
    fetchCourse()
  }, [del])

  const columns: any = [
    {
      name: "User",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.student.image} className="dlink" width="30%" height="50%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Course",
      selector: "creator",
      sortable: true,
      cell: (d: any) => (
        <span style={{ margin: '0px 3px' }} >{d?.courses[0]?.course?.title}</span>
      )
    },
    {
      name: "Coupon Code",
      selector: "coupon_code",
      sortable: true,


    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
      cell: (d: any) => (
        <span > ${d?.amount}</span>
      )

    },
    {
      name: "payment Method",
      sortable: true,
      cell: (d: any) => (
        <span > {d?.is_cash === "1" ? "Cash" : "Debit / Credit"}</span>
      )

    },
    {
      name: "Status",
      selector: "is_approved",
      sortable: true,
      cell: (d: any) => (
        <span className="checkout_pendding">{d?.is_approved === "0" ? "Pendding" : "Approved"}</span>
      )

    },
    {
      name: "Validate",
      selector: "valid_till",
      sortable: true,
      cell: (d: any) => (
        <span style={{ margin: '0px 3px' }} >{moment(d?.valid_till).format('ll')}</span>
      )
    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <div onClick={() => Approved_Checkout(d?.id)}>
            <button
              className={"checkout_approved"}
              disabled={d?.is_approved === "1" ? true : false}
            >
              {loader ? <Spinner animation="border" size="sm" />
                :
                "Approve"
              }
            </button>
          </div>

        </div >
      )
    }
  ];
  const filteredItems = checkout?.filter(item => item.student?.fullname && item.student?.fullname.toLowerCase().includes(filterText.toLowerCase()));


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
                      <Breadcrumb.Item active>Pendding Checkouts</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <Link href="/en/admin/website" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link> */}
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




      </section >
    </div >
  );
};

export default AdminAuth(Home);


