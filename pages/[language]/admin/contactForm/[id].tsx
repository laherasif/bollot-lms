import type { NextPage } from "next";
// import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
// import CourseCard from "../../../../src/components/admin/CourseCard";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
// import Invitation from "../../../../src/components/instructor/invitationForm";
// import Search from "../../../../src/components/instructor/search";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2'
import moment from "moment";
import { FiSearch } from "react-icons/fi";
import { SweetAlert } from "../../../../src/function/hooks";
import { Breadcrumb } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";

// import AddBanner from '../../../../src/components/admin/addBanner'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [contact, setContact] = useState([])
  const [loading, setLoading] = useState(false)
  const [email, setemail] = useState(false)
  const [banner, setBanner] = useState({})
  const [filterText, setFilterText] = useState('');

  const { User, token } = useSelector((state: RootStateOrAny) => state?.admin)

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
        let res = await AxInstance.get('api//admin/get-contact-forms')
        if (res.data.success === true) {
          setLoading(false)
          setContact(res.data.response.messages)
        }
      }
      catch (err) {
        SweetAlert({ icon: 'error', text: err })

      }
    }
    fetchCourse()
  }, [banner])


  const DelEmp = (id: number,) => {

    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this user ?",
      icon: "warning",
      showDenyButton: true,


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.get(`api//admin/banners/delete/${id}`,)
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            setBanner('')

          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  const filteredItems = contact?.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));


  const columns: any = [
    {
      name: "Name",
      selector: "name",
      sortable: true,

    },
    {
      name: "Email",
      selector: "email",
      sortable: true,

    },
    {
      name: "Message",
      selector: "message",
      sortable: true,

    }, {
      name: "Date",
      selector: "created_at",
      sortable: true,
      cell: (d: any) => (
        <span>{moment(d?.created_at).format('ll')}</span>
      )

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <Link href={`/en/admin/manageBanners/${d?.id}`}>
            <div>
              <i className='fa fa-edit'></i>
            </div>
          </Link>
          <div style={{ marginLeft: '20px' }} onClick={() => { DelEmp(d?.id), setBanner("1234") }}>
            <i className='fa fa-trash'></i>
          </div>

        </div>
      )
    }
  ];








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
                      <Breadcrumb.Item active>Contact Us Forms</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className=" jidfjsd-asjreid">
                    {/* <Search /> */}

                  </div>
                </div>

                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 course w-100">
                        <Link href="/en/admin/website">
                          <button className="upload-1 ">
                            Blogs
                          </button>
                        </Link>
                        <Link href="/en/admin/newsEvent">
                          <button className="upload-1" >News and Event</button>
                        </Link>
                        {/* <Link href="/en/admin/manageHeader">
                          <button className="upload-1" > Header Menu</button>
                        </Link> */}
                        <Link href="/en/admin/banner">
                          <button className="upload-1 " > Banners</button>
                        </Link>
                        <button className="upload-1 sdisad-dsdactive" >Contact Us Forms</button>

                      </div>

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
                      defaultSortAsc={true}
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

export default  AdminAuth( Home ) ;
