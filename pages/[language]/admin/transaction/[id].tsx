import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import { RootStateOrAny, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Small } from "../../../../src/components/admin/loader";
import { Breadcrumb, Spinner } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
import moment from "moment";
import axios from "axios";
import { BsFileEarmarkPdf } from "react-icons/bs";
import Pdftransaction from "../pdftransaction";
// import Pdftransaction from "../pdftransaction";


const Home: NextPage = () => {
  // const intl = useIntl();
  const [filterText, setFilterText] = useState('');
  const [filterDate, setFilterDate] = useState({ from_date: '', to_date: '' });
  const [transLoad, setTranLoad] = useState(false)
  const [backPage, setBackPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pdf, setPdf] = useState({})
  const [error, setError] = useState({})
  const [transaction, setTransaction] = useState([])
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [backPage])

  const ref = useRef()

  const { Transaction, token } = useSelector((state: RootStateOrAny) => state?.admin)

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

  // const filteredItems = Transaction.transactions?.filter(item => item?.created_at && item?.created_at.toLowerCase().includes(filterText.toLowerCase()));
  // const filteredItemName = Transaction.transactions?.filter(item => item?.user?.fullname && item?.user?.fullname.toLowerCase().includes(filterText.toLowerCase()));


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
        setTransaction(res.data.response.transactions)
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

  

  const columns: any = [
    {
      name: "Transaction",
      selector: "stripe_charge_id",
      sortable: true,


    },

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
        <div>  {moment(d?.created_at).format('ll')}</div>
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
        <div style={{ fontSize: '20px' }} onClick={() => setPdf(d)}>
          <BsFileEarmarkPdf />
        </div>
      )

    }
  ];

  if (Object.keys(pdf).length) {
    return <Pdftransaction data={pdf} back={(value:any) => { setBackPage(value) , setPdf({}) } }/>
  }
  else {
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
                          <Breadcrumb.Item active>Transaction </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    </div>


                    <div className="complete-web-1 mt-2">
                      <div className="umpire w-100">
                        <div className="umpire-1 umpire-1-cst ">
                          <div className="d-flex mb-3 course">
                            <button className="upload-1 sdisad-dsdactive" id="activetab">
                              Transactions
                            </button>
                            <Link href="/en/admin/cashTransaction">
                              <button className="upload-1" >Cash Transaction</button>
                            </Link>



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
                        data={transaction?.length > 0 ? transaction : Transaction.transactions}
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
}
export default AdminAuth(Home);
