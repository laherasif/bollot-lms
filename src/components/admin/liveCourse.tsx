
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import Swal from 'sweetalert2'
export default () => {
  const [edit, setEdit] = useState({})
  const [courses, setCourse] = useState([])
  const [show, setShow] = useState(false)
  const [del, setDel] = useState(false)
  const [filterText, setFilterText] = useState('');


  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const dispatch = useDispatch()

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  const DeliveCourse = (id: number,) => {
    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this Live Course ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Yes',



    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.post(`api//admin/courses/delete`, { id: id })
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            setDel(true)

          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }




  useEffect(() => {
    let fetchCourse = async () => {
      try {
        let value = {

          course_type: "live"
        }
        // setLoading(true)
        let res = await AxInstance.post('api//admin/courses', value)
        if (res.data.success === true) {
          // setLoading(false)
          setCourse(res.data.response.courses)
        }
      }

      catch (err) {

      }
    }
    fetchCourse()
  }, [ del === true ])




  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.cover_image} className="dlink" width="90%" height="90%" style={{ objectFit: 'contain' }} />
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
      name: "Total Students ",
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
          <Link href={`/en/admin/addCourse/${d?.slug}?live`}>
            <div onClick={() => { setEdit(d), setShow(true) }}>
              <i className='fa fa-edit'></i>
            </div>
          </Link>
          <div style={{ marginLeft: '20px' }} onClick={() => DeliveCourse(d?.id)}>
            <i className='fa fa-trash'></i>
          </div>

        </div>
      )
    },
    {
      name: "Manage",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa fa-ellipsis-h" style={{ fontSize: '20px', color: 'black' }}></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="drop_down_ins">
              <Dropdown.Item as={Link} href={`/en/admin/manageLiveClasses/${d?.id}`}>Schedule</Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageCriculum/${d?.id}`}> Curriculum</Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageQuiz/${d?.id}`}> Quiz</Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/admin/manageEnrolledStudent/${d?.id}`}> Enrolled Student</Dropdown.Item>
              {/* <Dropdown.Item as={Link} href={`/en/admin/manageProgressStudent/${d?.id}`}>Student Progress</Dropdown.Item> */}

            </Dropdown.Menu>
          </Dropdown>


        </div>
      )
    }
  ];


  const filteredItems = courses?.filter(item => item?.title && item?.title.toLowerCase().includes(filterText.toLowerCase()));


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
          // selectableRows
          // defaultSortAsc={true}
          highlightOnHover
        // dense

        />
      </div>
    </>
  )
}