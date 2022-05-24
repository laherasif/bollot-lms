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
import AddBanner from '../../../../src/components/admin/addBanner'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const [email, setemail] = useState(false)
  const [banner, setBanner] = useState(false)
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
        let res = await AxInstance.get('api//admin/courses')
        if (res.data.success === true) {
          setLoading(false)
          setCourse(res.data.response.courses)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [])

  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.icon} className="dlink" width="20%" height="90%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <div>
            <i className='fa fa-edit'></i>
          </div>
          <div style={{ marginLeft: '20px' }}>
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
                  <Link href="/en/admin/website" >
                    <h3>
                      <i className="fa fa-arrow-left"></i>
                      Back</h3>
                  </Link>

                  <h3> Manage Website Banners</h3>
                </div>
                <div className=" jidfjsd-asjreid">
                  <Search />
                  <div className="d-flex idfadsf-sads">
                      <button className="upload-1 sdisad-dsdactive" onClick={() => setBanner(true)}>
                        + Add New Banner </button>
                  </div>
                </div>
              </div>

              <div className="complete-web-1 mt-2">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="d-flex mb-3 idfadsf-sads">
                      <button className="upload-1 sdisad-dsdactive">
                        Banners
                      </button>

                    </div>

                  </div>
                </div>
              </div>
              <div className="complete-web-1">
                <div style={{ width: '100%' }}>
                  <DataTable
                    columns={columns}
                    data={course}
                    sortIcon={<i className='fa fa-arrow-down'></i>}
                    pagination
                    selectableRows
                    defaultSortAsc={true}
                    highlightOnHover
                    dense

                  />
                </div>


              </div>
            </div>
          </div>
        </div>
         } 

        {
          banner && 
          <AddBanner permition={banner} Toggle={(value:any) => setBanner(value)}/>
        }

      </section >
    </div >
  );
};

export default Home;
