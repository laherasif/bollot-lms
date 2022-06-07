import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import CourseCard from "../../../../src/components/student/CourseCard";
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import RefundReason from '../../../../src/components/student/refundReason'
import Link from "next/link";
import { Small } from "../../../../src/components/student/loader";
const options = ["one", "two", "three"];
import Swal from 'sweetalert2'
import DataTable from "react-data-table-component";
import { SweetAlert } from "../../../../src/function/hooks";

const Home: NextPage = () => {
  // const intl = useIntl();

  const [device, setDevice] = useState([])
  const [refund, setRefund] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)
  const [filterText, setFilterText] = useState('');


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  const router = useRouter()

  const courseId = router.query.id


  useEffect(() => {
    let fetchPayment = async () => {
      try {
        let res = await AxInstance.get(`api//my-devices`)
        setDevice(res.data.response.devices)
      }
      catch (error) {
        SweetAlert({ icon: "error", text: error })

      }

    }
    fetchPayment()
  }, [courseId])

  const filteredIns = device?.filter(item => item.operating_system && item.operating_system.toLowerCase().includes(filterText.toLowerCase()));

  const DelEmp = (id: number,) => {

    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this user ?",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.post(`api//my-devices/remove`, { id: id })
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })

            // dispatch(delStuIns({ id, role }))

          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



  const columns: any = [

    {
      name: "Device Name",
      selector: "device_name",
      sortable: true,

    },
    {
      name: "Operating System",
      selector: "operating_system",
      sortable: true,

    },
    {
      name: "Model ",
      selector: "device_model",
      sortable: true,

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>

          {/* <div style={{ marginLeft: '20px' }} onClick={() => { setEdit(d), setShow(true) }}>
            <i className='fa fa-edit'></i>
          </div> */}
          <div style={{ marginLeft: '20px' }} onClick={() => DelEmp(d.id)}>
            <i className='fa fa-trash'></i>
          </div>


        </div>
      )
    }
  ];




  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">
                  <Link href="/en/student/settings">
                    <h3 className="back-arrow">
                      <i className="fa fa-arrow-left"></i>
                      Back
                    </h3>
                  </Link>
                  <h3>My Devices</h3>
                  <div className="complete-web-1">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst">
                        <div className="maxima">
                          <button className="upload-1  sdisad-dsdactive">Devices</button>
                        </div>
                      </div>
                    </div>

                    <div className="seting-method-payment">
                      <div >
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                          <div className="dsnodi-sdjsad">
                            <div className="searchbar-icon">
                              <FiSearch color="#8A8A8A" size={17} />

                            </div>
                            <input type="text" placeholder="Search" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
                          </div>

                        </div>

                        <DataTable
                          columns={columns}
                          data={filteredIns}
                          sortIcon={<i className='fa fa-arrow-down'></i>}
                          pagination
                          selectableRows
                          highlightOnHover
                          responsive={true}

                        />

                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>



      </section>
    </>
  );
};

export default withAuth(Home);
