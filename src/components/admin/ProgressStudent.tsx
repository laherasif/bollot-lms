import React from 'react'

const ProgressStudent = ({ progress }: any) => {
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
                          <th>#</th>
                          <th> Image </th>
                          <th> Full name </th>
                          <th> Progress </th>
                          <th> Completed Lectures </th>
                          <th> Completed Sections </th>
                        </tr>
                      </thead>
                      <tbody>
                        {progress && progress.length > 0 ? progress.map((st:any, i:number) => (
                          <tr key={i}>
                            <td>
                              {i+1}
                            </td>
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
                                  style={{ width: "10%" }}
                                  aria-valuenow={10}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </td>
                            <td>{st?.lectures_completed.completed} / {st?.lectures_completed.out_of}</td>
                            <td>{st?.sections_completed.completed} / {st?.sections_completed.out_of}</td>
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

export default ProgressStudent