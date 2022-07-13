import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import { RootStateOrAny, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Small } from "../../../../src/components/admin/loader";
import { Breadcrumb, Spinner } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
import moment from "moment";
import axios from "axios";
import { SweetAlert } from "../../../../src/function/hooks";
import { BsFileEarmarkPdf } from 'react-icons/bs'
const columns: any = [
  // {
  //   name: "Transaction",
  //   selector: "stripe_charge_id",
  //   sortable: true,


  // },

  {
    name: "User",
    sortable: true,
    cell: (d: any) => (
      <div> {d?.user?.fullname}</div>
    )

  },

  {
    name: "Request Date",
    // selector: "created_At",
    sortable: true,
    cell: (d: any) => (
      <div>  {moment(d?.created_At).format('ll')}</div>
    )


  },
  {
    name: "Total Amount",
    selector: "amount",
    sortable: true,
    cell: (d: any) => (
      <div>  $ {Math.abs(d?.amount)}</div>
    )
  },
  {
    name: "Paid Amount",
    selector: "valid_till",
    sortable: true,
    cell: (d: any) => (
      <div>  $ {Math.abs(d?.amount)}</div>
    )

  },
  {
    name: "Pdf",
    sortable: true,
    cell: (d: any) => (
      <div style={{fontSize:'20px'}}> <BsFileEarmarkPdf /></div>
    )

  }
];

const Home: NextPage = () => {
  // const intl = useIntl();
  const [filterText, setFilterText] = useState('');
  const [filterDate, setFilterDate] = useState({ from_date: '', to_date: '' });
  const [transLoad, setTranLoad] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [transaction, setTransaction] = useState([])
  const [filterTransaction, setFilterTransaction] = useState([])
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const handleChang = (e) => {
    setFilterDate({
      ...filterDate,
      [e.target.name]: e.target.value
    })
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//admin/transactions/cash`)
        if (res.data.success === true) {
          setTransaction(res.data.response.transactions)
          setLoading(false)
        }

      } catch (error) {
        setLoading(false)
        SweetAlert({ icon: "error", text: error })
      }

    }
    fetchData()
  }, [])



  const FilterText = async () => {

    let value = {
      from_date: filterDate.from_date,
      to_date: filterDate.to_date,
      search: filterText
    }
    try {
      setTranLoad(true)
      let res = await AxInstance.post('api//admin/transactions', value)
      if (res.data.success === true) {
        setFilterTransaction(res.data.response.transactions)
        setError({})
        setTranLoad(false)
      }
      else {
        setError(res.data.errors)
        setTranLoad(false)

      }

    }
    catch (err) {

    }

  }

  const resetData = () => {
    setFilterDate({ from_date: '', to_date: '' })
    setFilterText('')
    setTransaction([])

  }


  const filteredItems = transaction?.filter(item => item?.user?.fullname && item?.user?.fullname.toLowerCase().includes(filterText.toLowerCase()));
  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {
          loading ? Small()
            :
            <div className="dash-board-1">
              <div className="dash-2 ">
                <div className="my-course kadjsfs3e0we-112x">
                  <div className="hdsf0s-sadmsa">
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Cash Transaction </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </div>


                  <div className="complete-web-1 mt-2">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst ">
                        <div className="d-flex mb-3 course">
                          <Link href="/en/admin/transaction">
                            <button className="upload-1 " >
                              Transactions
                            </button>
                          </Link>
                          <button className="upload-1 sdisad-dsdactive" id="activetab" >Cash Transaction</button>



                        </div>

                      </div>
                    </div>
                  </div>



                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                    <div>
                      <label>Search</label>
                      <div className="dsnodi-sdjsad">
                        <div className="searchbar-icon">
                          <FiSearch color="#8A8A8A" size={17} />

                        </div>

                        <input type="text" placeholder="Search" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
                      </div>
                    </div>
                    <div className="d-flex">
                      <div>
                        <label>Start Date</label>
                        <input type="date" name="from_date" className="form-control" onChange={(e) => handleChang(e)} value={filterDate.from_date} />
                        {error.from_date && <div className="invalid mt-1">{error?.from_date[0]}</div>}

                      </div>
                      <div className="mx-2">
                        <label>End Date</label>
                        <input type="date" name="to_date" className="form-control" onChange={(e) => handleChang(e)} value={filterDate.to_date} />
                        {error.to_date && <div className="invalid mt-1">{error?.to_date[0]}</div>}

                      </div>
                      <div className="filter_wrapper">
                        <button className="filter" onClick={() => FilterText()}>
                          <i className="fa fa-filter"></i>
                          {transLoad ?
                            <Spinner animation="border" size="sm" />
                            :
                            ""
                          }
                        </button>
                      </div>

                      <div className="filter_wrapper mx-2">
                        <button className="filter" onClick={() => resetData()}>
                          <i className="fa fa-refresh"></i>
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="w-100">
                    <DataTable
                      columns={columns}
                      data={filterTransaction?.length > 0 ? filterTransaction : transaction}
                      sortIcon={<i className='fa fa-arrow-down'></i>}
                      pagination
                      // selectableRows
                      highlightOnHover
                    />
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
