import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useSelector , RootStateOrAny } from 'react-redux'
const InvitationStudent = ({ students }: any) => {

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
                          <th> Course Id </th>
                          <th> Fullname  </th>
                          <th> Email </th>
                          <th> Status </th>
                          <th> Role </th>
                        </tr>
                      </thead>
                      <tbody>
                        {students && students.length > 0 ? students.map((st, i) => (
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

export default InvitationStudent