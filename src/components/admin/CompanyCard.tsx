import axios from "axios";
import React, { useMemo, useState } from "react";
import DataTable from 'react-data-table-component'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import EditUser from "./editUser";
import { delStuIns } from '../../redux/actions/admin'
import { FiSearch } from "react-icons/fi";





export default ({ Company }: any) => {
  const [show, setShow] = useState(false)
  const [view, setView] = useState(false)
  const [edit, setEdit] = useState({})
  const [filterText, setFilterText] = useState('');
  const filteredItems = Company?.filter(item => item?.fullname && item?.fullname.toLowerCase().includes(filterText.toLowerCase()));
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  const DelEmp = (id: number, role: string) => {

    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this user ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Yes',



    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.post(`api//admin/user/delete`, { id: id })
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })

            dispatch(delStuIns({ id, role }))

          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



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
      name: "Company Name",
      selector: "company_name",
      sortable: true,

    },
    {
      name: "Company Size",
      selector: "company_size",
      sortable: true,

    },
    {
      name: "Address",
      selector: "legal_address",
      sortable: true,

    },

    {
      name: "Role",
      selector: "role",
      sortable: true,

    },
    
  ];



  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
        <div className="dsnodi-sdjsad">
          <div className="searchbar-icon">
            <FiSearch color="#8A8A8A" size={17} />

          </div>
          <input type="text" placeholder="Search" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
        </div>

      </div>
      <div >

        <DataTable
          columns={columns}
          data={filteredItems}
          sortIcon={<i className='fa fa-arrow-down'></i>}
          pagination
          // selectableRows
          highlightOnHover
          responsive={true}

        />
      </div>


      {
        show &&
        <EditUser
          User={edit}
          permition={show}
          Toggle={(value: any) => setShow(value)}
        />
      }

      {
        view &&
        <EditUser
          User={edit}
          permition={view}
          views="views"
          Toggle={(value: any) => setView(value)}
        />
      }


    </>
  );
};
