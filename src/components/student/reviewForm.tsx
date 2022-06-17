import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { SweetAlert } from '../../function/hooks'
import axios from "axios";
import ReactStars from "react-rating-stars-component";
const ReviewForm = ({ Toggle, permition, reviewss }: any) => {
  const [show, setShow] = useState(reviewss);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emails, setEmails] = useState([]);
  const [desc, setDesc] = useState('')
  const [state, setState] = useState(0)
  const handleClose = () => {
    Toggle(false);
  };


  const { token, User } = useSelector(
    (state: RootStateOrAny) => state?.userReducer
  );

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });

  const ratingChanged = (newRating: any) => {
    setState(newRating)
  };




  const handleSubmit = async () => {
    try {
      let values = {
        course_id: reviewss,
        review: desc,
        rating: state
      }
      setLoading(true)
      let res = await AxInstance.post('api//review/store', values)
      if (res.data.success === true) {
        setLoading(false)
        Toggle('');
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
          <Modal.Title>Add Course Review</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "100%", padding: '0px 20px' }}>
          <div className="email-compose">
            <div
              className="p-field"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Rating</label>
              <div style={{ paddingLeft: '4rem' }}>

                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={60}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#d0565c"
                />
              </div>
              <div className="w-100">
                <label>Comments</label>
                <textarea
                  rows={4}
                  name="short_desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="asndkmc03e-dm3e"
                  placeholder="Write Here ...">

                </textarea>
              </div>
              <div className="d-flex mt-3 add-rating" >
                <button className="upload-1 sdisad-dsdactive w-100 " style={{ textAlign: 'center' }} onClick={() => handleSubmit()}>
                  {loading ?
                    <Spinner animation="border" />
                    :
                    "Add Review"
                  }
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
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
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};
export default ReviewForm;
