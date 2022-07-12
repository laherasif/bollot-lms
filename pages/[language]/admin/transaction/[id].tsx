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
import { Breadcrumb } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
import moment from "moment";

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
      <div>  {moment(d?.created_At).format('ll')}</div>
    )


  },
  {
    name: "Total Amount",
    selector: "amount",
    sortable: true,
    cell: (d: any) => (
      <div>  ${d?.amount}</div>
    )
  },
  {
    name: "Paid Amount",
    selector: "valid_till",
    sortable: true,
    cell: (d: any) => (
      <div>  ${d?.amount}</div>
    )

  }
];

const Home: NextPage = () => {
  // const intl = useIntl();
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const { Transaction } = useSelector((state: RootStateOrAny) => state?.admin)
  const filteredItems = Transaction.transactions?.filter(item => item?.user?.fullname && item?.user?.fullname.toLowerCase().includes(filterText.toLowerCase()));
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



                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                    <div className="dsnodi-sdjsad">
                      <div className="searchbar-icon">
                        <FiSearch color="#8A8A8A" size={17} />

                      </div>
                      <input type="text" placeholder="Search" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
                    </div>

                  </div>
                  <div className="w-100">
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
        }
      </section >
    </div >
  );
};

export default AdminAuth(Home);
