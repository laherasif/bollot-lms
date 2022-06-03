import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Invitation from "../../../../src/components/instructor/invitationForm";
import Search from "../../../../src/components/instructor/search";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2'
import { Breadcrumb } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";

// import AddBanner from '../../../../src/components/admin/addBanner'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [del, setDel] = useState(false)
  const [loader, setLoader] = useState(false)
  const [banner, setBanner] = useState({})
  const { User, token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  

  const Delbanner = (id: number,) => {
    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this Banner ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Yes',


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.get(`api//admin/banners/delete/${id}`)
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            setDel(true )

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
        let res = await AxInstance.get('api//admin/banners')
        if (res.data.success === true) {
          setLoading(false)
          setBanners(res.data.response.banners)
        }
      }
      catch (err) {

      }
    }
      fetchCourse()
  }, [del === true ])


  
  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.banner_image} className="dlink" width="20%" height="90%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Title",
      selector: "banner_title",
      sortable: true,

    },
    {
      name: "Link ",
      selector: "banner_link",
      sortable: true,

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
          <div style={{ marginLeft: '20px' }} onClick={() => Delbanner(d?.id) }>
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
                      <Breadcrumb.Item active>Banner</Breadcrumb.Item>
                    </Breadcrumb>


                  </div>

                  <div className=" jidfjsd-asjreid">
                    {/* <Search /> */}
                    <Link href="/en/admin/manageBanners">
                      <div className="d-flex idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive">
                          + Add New Banner </button>
                      </div>
                    </Link>
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
                          <button className="upload-1" > News and Event</button>
                        </Link>
                        {/* <Link href="/en/admin/manageHeader">
                          <button className="upload-1" > Header Menu</button>
                        </Link> */}
                        <button className="upload-1 sdisad-dsdactive" > Banners</button>
                        <Link href="/en/admin/contactForm">
                          <button className="upload-1" >Contact Us Forms</button>
                        </Link>

                      </div>

                    </div>
                  </div>
                </div>


                <div className="complete-web-1">
                  <div style={{ width: '100%' }}>
                    <DataTable
                      columns={columns}
                      data={banners}
                      sortIcon={<i className='fa fa-arrow-down'></i>}
                      pagination
                      // selectableRows
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
