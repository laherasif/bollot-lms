import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";
import { Small } from "../../../../src/components/student/loader";
import Swal from 'sweetalert2'
import DataTable from "react-data-table-component";
import { SweetAlert } from "../../../../src/function/hooks";
import { LogoutIns } from "../../../../src/redux/actions/auth/user";

const Home: NextPage = () => {
  // const intl = useIntl();

  const [notification, setNotification] = useState([])

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(false)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  const router = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    let fetchPayment = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//notifications`)
        setLoading(false)
        setNotification(res.data.response.notifs)
      }
      catch (error) {
        SweetAlert({ icon: "error", text: error })

      }

    }
    fetchPayment()
  }, [])


  // RunTime Filter notification  
  const filteredIns = notification?.filter((item:any) => item?.title && item?.title.toLowerCase().includes(filterText.toLowerCase()));

  // User Account Delete Function 
  const DelAccount = () => {
    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this account ?",
      icon: "warning",
      confirmButtonText: 'Yes',
      showDenyButton: true,

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.get('api//delete-my-account')
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            dispatch(LogoutIns())
            router.push('/en/login')
          });
      } else if (result.isDenied) {
        Swal.fire('Account  are not deleted', '', 'info')
      }
    })

  }



  const columns: any = [

    {
      name: "Title",
      selector: "title",
      sortable: true,

    },
    {
      name: "Details",
      selector: "details",
      sortable: true,

    },
    
    
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
                  <div className="complete-web-1">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst">
                        <div className="maxima">
                          <Link href="/en/student/settings">
                            <button className="upload-1 " >Account Security</button>
                          </Link>
                          <Link href="/en/student/payments">
                            <button className="upload-1 " >Payment</button>
                          </Link>
                            <button className="upload-1 sdisad-dsdactive" id="activetab">Notification</button>
                          <Link href="/en/student/device">
                            <button className="upload-1">Manage Devices</button>
                          </Link>
                          <button className="upload-1" onClick={() => DelAccount()}>Close Account</button>
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
