import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Spinner, Form } from 'react-bootstrap'
import { IoTrophySharp } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../../function/hooks";
import { updateStuIns } from "../../redux/actions/admin";
// import { updateUser } from '../../redux/actions/auth/user'
import DatePicker from "react-datepicker";
import moment from "moment";
import { format, parse } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";

const AddCoupon = ({ Toggle, permition, User }: any) => {

    const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)


    const [show, setShow] = useState(permition);
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState({});
    const [state, setState] = useState({
        coupon_code: User?.coupon_code || '',
        discount: User?.discount || '',
        valid_till: User?.valid_till || '',

    });


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });

    const handleClose = () => {
        Toggle({type: "close"})
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };






    const SaveProfile = async () => {

        try {
            setLoading(true)

            let value = {
                id: User?.id,
                coupon_code: User?.coupon_code,
                discount: User?.discount,
                valid_till: moment(state?.valid_till).format('YYYY-MM-DD'),

            }

            let value2 = {
                coupon_code: state?.coupon_code,
                discount: state?.discount,
                valid_till: moment(state?.valid_till).format('YYYY-MM-DD'),
            }

            let res = await AxInstance.post('api//instructor/coupons/store', Object.keys(User).length ? value : value2)
            if (res.data.success === true) {
                setLoading(false)
                SweetAlert({ icon: 'success', text: res.data.message })
                Toggle({type: "load"})

            }
            else {
                setErrors(res.data.errors)
                setLoading(false)

            }
        }
        catch (err) {
            setLoading(false)
            SweetAlert({ icon: 'error', text: err })

        }

    }

    // let selectImage = User?.image || state.image

    return (

        <div className="hasiw0eskdwd">
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {User ? "Update Coupoun" : "Create Coupoun"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="page-content " style={{ margin: 'auto', maxWidth: '70%', minHeight: '100%' }} id="page-content">
                        <div >
                            <div className="row d-flex justify-content-center ">


                                <div className="email-compose">
                                    <div
                                        className="p-field"
                                        style={{ display: "flex", flexDirection: "column" }}
                                    >

                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>Code </label>
                                            <div className="">
                                                <input
                                                    type="text"
                                                    name="coupon_code"
                                                    placeholder="Write here..."
                                                    value={state.coupon_code}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                {error && error?.coupon_code ? <div className="invalid mt-1">{error?.coupon_code[0]}</div> : null}

                                            </div>
                                        </div>


                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>Discount </label>
                                            <div className="">
                                                <input
                                                    type="text"
                                                    name="discount"
                                                    placeholder="Write here..."
                                                    value={state.discount}
                                                    onChange={(e) => handleChange(e)} />
                                                {error && error?.discount ? <div className="invalid mt-1">{error?.discount[0]}</div> : null}

                                            </div>
                                        </div>

                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>Validata till  </label>
                                            <div style={{ zIndex: '9999' }}>
                                                <DatePicker
                                                    onKeyDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    // selected={state.valid_till}
                                                    selected={Object.keys(User).length ? new Date(state?.valid_till) : state.valid_till}
                                                    placeholderText={"YYYY-MM-DD"}
                                                    onChange={(date) => setState({ ...state, valid_till: date })}
                                                    dateFormat="yyyy-MM-dd"
                                                />
                                                {error && error?.valid_till ? <div className="invalid mt-1">{error?.valid_till[0]}</div> : null}

                                                {/* <input type="date" name="valid_till" value={state.valid_till} onChange={(e) => handleChange(e)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="idfadsf-sads kajfds-sdfe">
                        <button onClick={() => handleClose()} className="upload-1 ">

                            Close
                        </button>
                    </div>
                    <div className="idfadsf-sads kajfds-sdfe">
                        <button onClick={() => SaveProfile()} className="upload-1 sdisad-dsdactive"
                        id="activetab"
                        >
                            {loading ?
                                <Spinner animation="border" />
                                :
                                Object.keys(User).length ? "Update" : "Save"
                            }
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default AddCoupon

