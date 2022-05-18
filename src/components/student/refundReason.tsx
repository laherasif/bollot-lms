import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { SweetAlert } from '../../function/hooks'
import axios from "axios";
const RefundReason = ({ Toggle, permition }: any) => {
  const [show, setShow] = useState(permition);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState('')
  const handleClose = () => {
    Toggle(false);
  };


  const {token , User } = useSelector(
    (state: RootStateOrAny) => state?.userReducer
  );

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });






  const handleSubmit = async () => {
    try {
      let values = {
        checkout_id: permition,
        refund_reason: state
      }
      setLoading(true)
      let res = await AxInstance.post('api//checkout/refund', values)
      if (res.data.success === true) {
        setLoading(false)
        Toggle(null);
        SweetAlert({ icon: "success", text: res.data.message  })
      }
      else {
        setLoading(false)
        SweetAlert({ icon: "error", text: res.data.errors})
      }
    } catch (error) {
      setLoading(false);
      SweetAlert({ icon: "error", text: error });
    }
  };
  return (
    <div className="hasiw0eskdwd">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Refund </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "100%" }}>
          <div className="email-compose">
            <div
              className="p-field"
              style={{ display: "flex", flexDirection: "column" }}
            >

              <label>Refund Reason </label>
              <div className="">
                <textarea
                  rows={4}
                  name="short_desc"
                  value={state}
                  onChange={(e) => setState(e.target.value )}
                  className="asndkmc03e-dm3e"
                  placeholder="Write Here ...">

                </textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex mt-2 justify-content-center">
            <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
              <button
                className="upload-1 sdisad-dsdactive "
                onClick={() => handleClose()}
              >
                Close
              </button>
            </div>
            <div className="idfadsf-sads kajfds-sdfe">
              <button
                onClick={() => handleSubmit()}
                className="upload-1 sdisad-dsdactive"
              >
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default RefundReason;
