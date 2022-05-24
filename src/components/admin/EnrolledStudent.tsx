import React from 'react'

const EnrolledStudent = ({ course }: any) => {
  return (
    <>
      <div className="w-100">
        <div className="padding" >
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th> Image </th>
                          <th> Full name </th>
                          <th> Progress </th>
                          <th> Email </th>
                          <th> Role </th>
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
                  </div>
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