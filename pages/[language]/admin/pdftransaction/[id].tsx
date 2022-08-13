import type { NextPage } from "next";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
import Pdf from "react-to-pdf";
import { BsFileEarmarkPdf } from 'react-icons/bs'
import { useRef } from "react";
import moment from 'moment'
import { add3Dots } from "../../../../src/function/hooks";
import { Breadcrumb } from "react-bootstrap";
import Link from "next/link";

const Home: NextPage = ({ data , back }:any) => {
  const ref = useRef()

  const options = {
    orientation: 'portand',
    unit: 'in',
    format: [13, 13]
  };

  return (
    <div className="inst">
      <div className="container p-3" >
        <div onClick={() => back(true)}>
          <h3 style={{cursor:'pointer'}} >
          Go Back
          </h3>
        </div>
        <Pdf targetRef={ref} filename="recept.pdf" options={options} x={0.50} y={0} >
          {({ toPdf }) => <button className="upload-1" onClick={toPdf} style={{ border: 'none', padding: '10px' }} > Download Recept <BsFileEarmarkPdf /> </button>}
        </Pdf>
        <div className="row pt-2" ref={ref}>
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="row p-5">
                  <div className="col-md-6">
                    <img src="https://bollot-website-lms-laherasif.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9a3bee1e.png&w=256&q=75" alt="doc" />
                  </div>
                  <div className="col-md-6 text-right">
                    <p className="font-weight-bold mb-1">Recept # {data?.id}</p>
                    <p className="text-muted">{moment(data?.created_at).format('ll')}</p>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="row pb-5 p-5">
                  <div className="col-md-6">
                    <p className="font-weight-bold mb-4">Client Information</p>
                    <p className="mb-1">{data?.user?.fullname}</p>
                    <p>{data?.user?.email}</p>
                    {/* <p className="mb-1">Berlin, Germany</p>
                    <p className="mb-1">6781 45P</p> */}
                  </div>
                  <div className="col-md-6 text-right">
                    <p className="font-weight-bold mb-4">Payment Details</p>
                    {!data?.stripe_charge_id ?
                      <>
                        <p className="mb-1">
                          <span className="text-muted">Payment Type: Cash</span>
                        </p>
                        <p className="mb-1">
                          <span className="text-muted">Name: {data?.user?.fullname} </span>
                        </p>
                      </>
                      :
                      <>
                        <p className="mb-1">
                          <span className="text-muted">STRIPE ID: </span> {data?.stripe_charge_id}
                        </p>
                        <p className="mb-1">
                          <span className="text-muted">Payment Type: Debit / Credit Card</span>
                        </p>
                        <p className="mb-1">
                          <span className="text-muted">Name: {data?.user?.fullname} </span>
                        </p>
                      </>
                    }
                  </div>
                </div>
                <div className="row p-5">
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            ID
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Item
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Description
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Quantity
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                           Price
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.checkout?.courses.map((item) => (
                          <tr>
                            <td>{item?.course?.id}</td>
                            <td>{add3Dots(item?.course?.title, 20)}</td>
                            <td>{add3Dots(item?.course?.short_desc, 20)}</td>
                            <td>1</td>
                            <td>$ {item?.at_price}</td>
                            <td>$ {item?.at_price}</td>
                          </tr>

                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                  {/* <div className="py-3 px-5 text-right">
                    <div className="mb-2">Grand Total</div>
                    <div className="h2 font-weight-light">$234,234</div>
                  </div>
                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Discount</div>
                    <div className="h2 font-weight-light">10%</div>
                  </div> */}
                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Total amount</div>
                    <div className="h2 font-weight-light">$ {Math.abs(data?.checkout?.amount)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>




    </div >
  );
};

export default AdminAuth(Home);
