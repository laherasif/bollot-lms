import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { FiSearch } from 'react-icons/fi';

const EnrolledStudent = ({ course }: any) => {
  const [filterText, setFilterText] = useState('');

  const filteredItems = course?.filter(item => item.fullname && item.fullname.toLowerCase().includes(filterText.toLowerCase()));

  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.image} className="dlink" width="70%" height="90%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Name",
      selector: "fullname",
      sortable: true,

    },
    {
      name: "Email",
      selector: "email",
      sortable: true,

    },
    {
      name: "Progress",
      selector: "is_completed",
      sortable: true,
      cell: (d: any) => (
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "10%" }}
            aria-valuenow={d?.is_completed}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )
    },
    {
      name: "Purchased Course At",
      selector: "createdAt",
      sortable: true,



    },
    {
      name: "Lecture Completed",
      selector: "createdAt",
      sortable: true,
      cell: (d: any) => (
        <span>{d?.lectures_completed.completed} / {d?.lectures_completed.out_of}</span>
      )

    },
    {
      name: "Section Completed",
      selector: "createdAt",
      sortable: true,
      cell: (d: any) => (
        <span>{d?.sections_completed.completed} / {d?.sections_completed.out_of}</span>
      )
    },
  
  ];
  return (
    <>
      <div className="w-100">
        <div className="padding" >
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">

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
                      defaultSortAsc={true}
                      highlightOnHover

                    />
                  </div>

                  {/* <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th> Image </th>
                          <th> Name </th>
                          <th> Email </th>
                          <th> Progress </th>
                          <th> Purchased Course At  </th>
                        </tr>
                      </thead>
                      <tbody>
                        {course && course.length > 0 ? course.map((st, i) => (
                          <tr key={i}>
                            <td className="py-1">
                              <img
                                src={st?.image}
                                alt="image"
                                width={50}
                                height={50}
                              />
                            </td>
                            <td> {st?.fullname}</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "25%" }}
                                  aria-valuenow={25}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </td>
                            <td>{st?.email}</td>
                            <td> {st?.role} </td>
                          </tr>
                        ))
                          : <div className='mt-3'>No record Found </div>
                        }


                      </tbody>
                    </table>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>


  )
}

export default EnrolledStudent