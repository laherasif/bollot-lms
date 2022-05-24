import axios from "axios";
import React, { useMemo, useState } from "react";
import DataTable from 'react-data-table-component'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import EditUser from "./editUser";
import { delStuIns } from '../../redux/actions/admin'


const FilterComponent = ( { filterText, onClear, onFilter }) => (
  <>
    <input id="search" style={{border:'1pt solid '} }type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <button type="button" onClick={onClear}>X</button>
  </>
)



export default ({ role, Student, Instructor }: any) => {
  const [show, setShow] = useState(false)
  const [view, setView] = useState(false)
  const [edit, setEdit] = useState({})
  const [filterText, setFilterText] = useState('');
  // const filteredItems = Student.filter(item => item.fullname && item.fullname.toLowerCase().includes(filterText.toLowerCase()));
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
        <img src={d?.image} className="dlink" width="20%" height="90%" style={{ objectFit: 'contain' }} />
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
      name: "Role",
      selector: "role",
      sortable: true,

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <div onClick={() => { setEdit(d), setView(true) }}>
            <i className='fa fa-eye'></i>
          </div>
          <div style={{ marginLeft: '20px' }} onClick={() => { setEdit(d), setShow(true) }}>
            <i className='fa fa-edit'></i>
          </div>
          <div style={{ marginLeft: '20px' }} onClick={() => DelEmp(d.id, d.role)}>
            <i className='fa fa-trash'></i>
          </div>


        </div>
      )
    }
  ];

  
  // const subHeaderComponentMemo = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       // setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText('');
  //     }
  //   };

  //   return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  // }, [filterText]);


return (
  <>
    {
      role === "student" ?
        <div style={{ width: '100%' }}>

          <DataTable
            // subHeaderComponent={subHeaderComponentMemo}
            columns={columns}
            data={Student}
            sortIcon={<i className='fa fa-arrow-down'></i>}
            pagination
            selectableRows
            highlightOnHover

          />
        </div>
        :
        <div style={{ width: '100%' }}>
          <DataTable
            columns={columns}
            data={Instructor}
            sortIcon={<i className='fa fa-arrow-down'></i>}
            pagination
            selectableRows
            highlightOnHover

          />
        </div>
    }

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
