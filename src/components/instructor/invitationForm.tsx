import React, { useEffect, useState } from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";
import { Modal, Button, Form , Spinner } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { SweetAlert } from '../../function/hooks'
import axios from "axios";
const Invitation = ({ Toggle, permition }: any) => {
  const [show, setShow] = useState(permition);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emails, setEmails] = useState([]);
  const [course , setCourse] =  useState([])
  const [state , setState] =  useState('')
  const handleClose = () => {
    Toggle(false);
  };

  const token = useSelector(
    (state: RootStateOrAny) => state?.userReducer?.token
  );

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });


  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoader(true)
        let res = await AxInstance.get('api//instructor/courses')
        if (res.data.success === true) {
          setLoader(false)
          setCourse(res.data.response.courses)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [])


  const handleSubmit = async () => {
    try {
      let values = {
        course_id : state ,
        emails : emails
      }
      setLoading(true)
      let res = await AxInstance.post('api//company/send-invite',values )
      if(res.data.success === true){
        setLoading(false)
        Toggle(false);
        SweetAlert({ icon : "success" , text : res.data.message})
      }
      else{
        setLoading(false)
        SweetAlert({ icon : "error" , text : res.data.error})
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
              <div className="kns-sanweso02e mb-2">
                <label>Select Course </label>
                <br />
                <Form.Select
                  name="category_id"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option defaultChecked> {loader ? "loading ..." : "Select Course"}</option>
                  {course &&
                    course.map((cata) => (
                      <option key={cata.id} value={cata.id}>
                        {cata.title}
                      </option>
                    ))}
                </Form.Select>
                {/* {errors?.category_id && (
                  <div className="invalid mt-1">{errors?.category_id[0]}</div>
                )} */}
              </div>

              <label>Invite Emails</label>
              <ReactMultiEmail
                placeholder="White Here...."
                style={{ cursor: "pointer" }}
                emails={emails}
                onChange={(_emails: string[]) => {
                  setEmails(_emails);
                }}
                validateEmail={(email) => {
                  return isEmail(email); // return boolean
                }}
                getLabel={(
                  email: string,
                  index: number,
                  removeEmail: (index: number) => void
                ) => {
                  return (
                    <div data-tag key={index}>
                      {email}
                      <span data-tag-handle onClick={() => removeEmail(index)}>
                        ×
                      </span>
                    </div>
                  );
                }}
              />
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
                  <Spinner animation="border"/>
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
export default Invitation;
