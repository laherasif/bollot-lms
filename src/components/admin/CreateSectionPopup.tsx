import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { SweetAlert } from '../../function/hooks'
import axios from "axios";
const CreateSection = ({ permition, Toggle, courseId }: any) => {

  const [show, setShow] = useState(permition);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState('')
  const handleClose = () => {
    Toggle("close");
  };


  const { token } = useSelector(
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
        course_id: courseId,
        title: desc,
      }
      setLoading(true)
      let res = await AxInstance.post('api//instructor/courses/curriculum/section/create', values)
      if (res.data.success === true) {
        setLoading(false)
        Toggle("load");

        SweetAlert({ icon: "success", text: res.data.message })
      }
      else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false);
      SweetAlert({ icon: "error", text: error });
    }
  };
  // const handleShow = () => setShow(true);
  return (
    <div className="hasiw0eskdwd">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Section </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "100%", padding: '0px 20px' }}>
          <div className="email-compose">
            <div
              className="p-field"
              style={{ display: "flex", flexDirection: "column" }}
            >

              <div className="w-100">
                <label>Title</label>
                <input
                  name="short_desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="asndkmc03e-dm3e"
                  placeholder="Write Here ..."

                />
              </div>
              <div className=" jidfjsd-asjreid">
                {/* <Search /> */}
                <div className="d-flex idfadsf-sads">
                  <button className="upload-1 sdisad-dsdactive w-100 mt-2" id="activetab"
                    style={{ textAlign: 'center' }} onClick={() => handleSubmit()}>
                    {loading ?
                      <Spinner animation="border" />
                      :
                      "Add section"
                    }

                  </button>
                </div>
              </div>
              {/* <div className="d-flex mt-3 add-rating" >
                <button className="upload-2 sdisad-dsdactive w-100 "
                  id="activetab"

                  style={{ textAlign: 'center' }} onClick={() => handleSubmit()}>
                  {loading ?
                    <Spinner animation="border" />
                    :
                    "Add section"
                  }
                </button>
              </div> */}
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  );
};
export default CreateSection;
