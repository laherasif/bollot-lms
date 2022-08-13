import type { NextPage } from "next";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import { RootStateOrAny, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Small } from "../../../../src/components/admin/loader";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
import axios from "axios";
import { SweetAlert } from "../../../../src/function/hooks";
import NewAdmins from "../../../../src/components/admin/NewAdmins";
import EditAdmin from "../../../../src/components/admin/editAdmin";



const Home: NextPage = () => {
  // const intl = useIntl();




  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(false)
  const [subAdmin, setSubAdmin] = useState([])
  const [loader, setLoader] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isEdit, setIsEdit] = useState({})
  const [roles, setRoles] = useState([])

  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1000);
  // }, [loader])

  
    
  const handleChange = (value: any) => {
    if (value.type === "close") {
      setIsShow(false)
      setIsEdit('')

    }
    else if (value.type === "load") {
      setIsShow(false)
      setIsEdit('')
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 1000);

    }
  }







  useEffect(() => {
    try {
      setLoading(true)
      let fetchAdmin = async () => {
        let res = await AxInstance.get('api//admin/sub-admins/get')
        let resRoles = await AxInstance.get('api//admin/sub-admins/roles/get')
        if (res.data.success === true) {
          setSubAdmin(res.data.response.sub_admins)
          setRoles(resRoles.data.response.roles)
          setLoading(false)
        }
      }
      fetchAdmin()
    }
    catch (err) { }

  }, [loader])

  const filteredItems = subAdmin?.filter(item => item?.fullname && item?.fullname.toLowerCase().includes(filterText.toLowerCase()));
  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.image || '/assets/images/user.png'} className="dlink" width="20%" height="90%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Full Name",
      selector: "fullname",
      sortable: true,

    },
    {
      name: "Email",
      selector: "email",
      sortable: true,

    },
    {
      name: "Roles",
      selector: "roles",
      sortable: true,
      cell: (d: any) => (

        <div className='d-flex pl-2'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa fa-ellipsis-h" style={{ fontSize: '20px', color: 'black' }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop_down_ins" >
              {d && d.roles.length ? d?.roles.map((role) => (
                <Dropdown.Item >{role?.role_key}</Dropdown.Item>

              )) : <div className="text-center">Roles not found</div>}
            </Dropdown.Menu>
          </Dropdown>


        </div>
      )

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>

          <div style={{ marginLeft: '20px' }} onClick={() => { setIsEdit(d), setIsShow(true) }}>
            <i className='fa fa-edit'></i>
          </div>



        </div>
      )
    }
  ];


  let checkBox = []
  for (let i = 0; i < isEdit.roles?.length; i++) {
    const element = isEdit.roles[i]?.id;
    checkBox.push(element)

  }



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
                        <Breadcrumb.Item active>Sub Admins </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>

                    <div className="my-2">

                      < NewAdmins loaders={(value: any) => setLoader(value)} roles={roles} />
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

        {
          isShow && <EditAdmin
            permition={isShow}
            data={isEdit}
            checkBox={checkBox}
            roles={roles}
            Toggle={(value: any) => handleChange(value)}
          />
        }
      </section >
    </div >
  );
};

export default AdminAuth(Home);
