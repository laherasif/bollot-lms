
import axios from 'axios'
import {  useState } from 'react'
import DataTable from 'react-data-table-component'
import { FiSearch } from 'react-icons/fi'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { AdddelUpdateCatagories } from '../../redux/actions/admin'
import AddCatagory from './addCatagory'
export default () => {
  const [catagory, setCatagory] = useState([])
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState({})
  const [show, setShow] = useState(false)
  const [loader, setLoder] = useState(false)
  const [filterText, setFilterText] = useState('');


  

  const dispatch = useDispatch()
  
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)
  
  const AxInstance = axios.create({
      // .. where we make our configurations
      baseURL: 'https://dev.thetechub.us/bolloot/',
      headers: {
          token: token
        }
      
      });


  const {  Catagories } = useSelector((state: RootStateOrAny) => state?.admin)


  const filteredItems = Catagories?.filter(item => item?.name && item?.name.toLowerCase().includes(filterText.toLowerCase()));


  

  const delCata = (data: Object) => {

    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this user ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Yes',


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.post(`api//admin/categories/delete`, { id : data.id })
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })

            dispatch(AdddelUpdateCatagories({ data : data , type:"del" }))

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
          <div onClick={() => { setEdit(d), setShow(true) }}>
            <i className='fa fa-edit'></i>
          </div>
          <div style={{ marginLeft: '20px' }} onClick={()=> delCata(d)}>
            <i className='fa fa-trash' ></i>
          </div>

        </div>
      )
    }
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
      <div style={{ width: '100%' }}>
        <DataTable
          columns={columns}
          data={filteredItems}
          sortIcon={<i className='fa fa-arrow-down'></i>}
          pagination
          highlightOnHover

        />
      </div>
      {show && <AddCatagory
        // catagory={catagory}
        permition={show}
        Data={edit}
        Toggle={(value: any) => setShow(value)} />}
    </>
  )
}