import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Search from "../../../../src/components/instructor/search";
import DataTable from "react-data-table-component";
import AddBlog from "../../../../src/components/admin/addBlog";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import MemberShip from "../../../../src/components/admin/addMembership";
const options = ["one", "two", "three"];
import Swal from 'sweetalert2'
import { Breadcrumb } from "react-bootstrap";
import { AdddelUpdateMembership } from "../../../../src/redux/actions/admin";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";

const Home: NextPage = () => {
  // const intl = useIntl();
  const [member, setMember] = useState([])
  const [showblog, setShowBlog] = useState(false)
  const [loadmore, setLoadMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [del, setDel] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [coupon, setCoupon] = useState({})


  const dispatch = useDispatch()

  const { token , MemberShips } = useSelector((state: RootStateOrAny) => state?.admin)

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
      setLoadMore(true)
      setTimeout(() => {
        setLoadMore(false)

      }, 1000);

    }
  }



  const DelMember = (id: number,) => {

    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this Membership  ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Yes',


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.post(`api//admin/memberships/delete`, { id: id })
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            setDel(true)
            setTimeout(() => {
            setDel(false)
              
            }, 1000);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//admin/memberships')
        if (res.data.success === true) {
          setLoading(false)
          setMember(res.data.response.memberships)
        }
      }
      catch (err) {

      }
    }
    // if (!Object.keys(coupon).length ||  del === true) {
        fetchCourse()
      // }
    }, [del === true || loadmore === true  ])




  const columns: any = [
    // {
    //   name: "Creator Image",
    //   selector: "image",
    //   sortable: true,
    //   cell: (d: any) => (
    //     <img src={d?.user.image} className="dlink" width="30%" height="50%" style={{ objectFit: 'contain' }} />
    //   )
    // },
    {
      name: "Title",
      selector: "title",
      sortable: true,

    },
    {
      name: "Course Allowed",
      selector: "courses_allowed",
      sortable: true,


    },

    {
      name: "Free Trial",
      selector: "free_trial_days",
      sortable: true,

    },
    {
      name: "Price Per Month",
      selector: "price_per_month",
      sortable: true,

    },
    {
      name: "User Per Course",
      selector: "users_per_course_allowed",
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

          <div style={{ marginLeft: '20px' }} onClick={() => DelMember(d?.id)}>
            <i className='fa fa-trash'></i>
          </div>

        </div >
      )
    }
  ];
  const filteredItems = member?.filter(item => item?.title && item?.title.toLowerCase().includes(filterText.toLowerCase()));


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
                      <Breadcrumb.Item active>Membership </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="my-2">
                    {/* <Search /> */}
                    <div className="d-flex idfadsf-sads">
                      <button className="upload-1 sdisad-dsdactive" onClick={() => setShowBlog(true)} >
                        + Add New membership </button>
                    </div>
                  </div>
                </div>


                <div className="complete-web-1 ">

                  <div className="my-4" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
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
                      // selectableRows
                      highlightOnHover
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }




        {showblog && <MemberShip permition={showblog} User={coupon} Toggle={(value:any ) => handleChange(value)} />}
      </section >
    </div >
  );
};

export default  AdminAuth( Home ) ;


