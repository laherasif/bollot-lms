import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { SweetAlert } from '../../function/hooks'
import axios from "axios";
const Conversation = ({ Toggle, permition , user_id}: any) => {
  const [show, setShow] = useState(permition);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emails, setEmails] = useState([]);
  const [course, setCourse] = useState([])
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
        to_user_id: user_id,
        message: state
      }
      setLoading(true)
      let res = await AxInstance.post('api//send-message', values)
      if (res.data.success === true) {
        setLoading(false)
        Toggle(false);
        SweetAlert({ icon: "success", text: "Invitation are sended" })
      }
      else {
        setLoading(false)
        SweetAlert({ icon: "error", text: "Something is wronge" })
      }
    } catch (error) {
      setLoading(false);
      SweetAlert({ icon: "error", text: error });
    }
  };
  const handleShow = () => setShow(true);
  return (
    <div className="hasiw0eskdwd">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invitate to Students</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "100%" }}>
          <div className="email-compose">
            <div
              className="p-field"
              style={{ display: "flex", flexDirection: "column" }}
            >
              

              <label>Send message </label>
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
export default Conversation;
