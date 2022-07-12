import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Small } from "../../../../src/components/student/loader";
const options = ["one", "two", "three"];
import Swal from 'sweetalert2'
import DataTable from "react-data-table-component";
import { RootStateOrAny, useSelector } from "react-redux";

const Home: NextPage = () => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(false)

  const [filterText, setFilterText] = useState('');


  const { Transaction } = useSelector((state: RootStateOrAny) => state.studentCourse)




  const filteredIns = Transaction?.filter(item => item.perticular && item.perticular.toLowerCase().includes(filterText.toLowerCase()));




  const columns: any = [
    {
      name: "User Id",
      selector: "user_id",
      sortable: true,

    },

    {
      name: "Perticular",
      selector: "particular",
      sortable: true,


    },

    {
      name: "Validate",
      selector: "valid_till",
      sortable: true,

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>

          <div >
            <i className='fa fa-edit'></i>
          </div>

          <div style={{ marginLeft: '20px' }}>
            <i className='fa fa-trash'></i>
          </div>

        </div >
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
                          <button className="upload-1  sdisad-dsdactive"
                            id="activetab"

                          >Devices</button>
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
