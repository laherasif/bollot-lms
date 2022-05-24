
import axios from 'axios'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCatagories } from '../../redux/actions/admin'
import AddCatagory from './addCatagory'
export default () => {
  const [catagory, setCatagory] = useState([])
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState({})
  const [show, setShow] = useState(false)
  const { token , Catagories} = useSelector((state: RootStateOrAny) => state?.admin)

  const dispatch = useDispatch()

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });
  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//admin/categories')
        if (res.data.success === true) {
          setLoading(false)
          // setCatagory(res.data.response.categories)
          dispatch(getCatagories(res.data.response.categories))

        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [])

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
          <div style={{ marginLeft: '20px' }}>
            <i className='fa fa-trash'></i>
          </div>

        </div>
      )
    }
  ];


  return (
    <>
      <div style={{ width: '100%' }}>
        <DataTable
          columns={columns}
          data={Catagories}
          sortIcon={<i className='fa fa-arrow-down'></i>}
          pagination
          selectableRows
          defaultSortAsc={true}
          highlightOnHover
          dense

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