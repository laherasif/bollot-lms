
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { RootStateOrAny, useSelector } from 'react-redux'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
export default () => {
  const [course, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState({})
  const [show, setShow] = useState(false)
  const [filterText, setFilterText] = useState('');

  const { token } = useSelector((state: RootStateOrAny) => state?.admin)
 

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
        let res = await AxInstance.post('api//admin/courses')
        if (res.data.success === true) {
          setLoading(false)
          setCourses(res.data.response.courses)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [])

  const filteredItems = course?.filter(item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()));

  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.cover_image} className="dlink" width="70%" height="90%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,

    },
    {
      name: "Instructor",
      selector: "instructor",
      sortable: true,
      cell: (d: any) => (
        <span>{d?.instructor?.fullname}</span>
      )
    },
    {
      name: "Total Student ",
      selector: "students_enrolled",
      sortable: true,

    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      cell: (d: any) => (
        <span>${d?.price}</span>
      )

    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <Link href={`/en/admin/addCourse/${d?.slug}`}>
            <div onClick={() => { setEdit(d), setShow(true) }}>
              <i className='fa fa-edit'></i>
            </div>
          </Link>
          <div style={{ marginLeft: '20px' }}>
            <i className='fa fa-trash'></i>
          </div>

        </div>
      )
    },
    {
      name: "Manages",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa fa-ellipsis-h" style={{ fontSize: '20px', color: 'black' }}></i>
            </Dropdown.Toggle>

            <Dropdown.Menu >
              <Dropdown.Item as={Link} href={`/en/admin/managePreview/${d?.id}`}> Previews </Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageCriculum/${d?.id}`}> Curriculum</Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageQuiz/${d?.id}`}> Quiz</Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageEnrolledStudent/${d?.id}`}> Enrolled Student</Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageProgressStudent/${d?.id}`}>Student Progress</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>


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
          selectableRows
          defaultSortAsc={true}
          highlightOnHover

        />
      </div>
    </>
  )
}