import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Spinner, Form } from 'react-bootstrap'
import { IoTrophySharp } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../../function/hooks";
import { AdddelUpdateMembership, updateStuIns } from "../../redux/actions/admin";
// import { updateUser } from '../../redux/actions/auth/user'
import DatePicker from "react-datepicker";
import moment from "moment";
import { format, parse } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";

const MemberShip = ({ Toggle, permition, User }: any) => {

    const { token } = useSelector((state: RootStateOrAny) => state?.admin)
    const dispatch = useDispatch()

    const [show, setShow] = useState(permition);
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState({});
    const [state, setState] = useState({
        title: User?.title || '',
        price_per_month: User?.price_per_month || '',
        courses_allowed: User?.courses_allowed || '',
        users_per_course_allowed: User?.users_per_course_allowed || '',
        free_trial_days: User?.free_trial_days || '',

    });


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });

    const handleClose = () => {
        Toggle({ type: "close" })
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
                title: state.title,
                price_per_month: state.price_per_month,
                courses_allowed: state.courses_allowed,
                users_per_course_allowed: state.users_per_course_allowed,
                free_trial_days: state.free_trial_days,

            }

            let value2 = {
                title: state.title,
                price_per_month: state.price_per_month,
                courses_allowed: state.courses_allowed,
                users_per_course_allowed: state.users_per_course_allowed,
                free_trial_days: state.free_trial_days,
            }

            let res = await AxInstance.post('api//admin/memberships/store', Object.keys(User).length ? value : value2)
            if (res.data.success === true) {
                setLoading(false)
                // dispatch(AdddelUpdateMembership({ data: res.data.response.membership,  type: Object.keys(User).length ? "update" :"add" }))
                setErrors('')
                setState({
                    title: '',
                    price_per_month: '',
                    courses_allowed: '',
                    users_per_course_allowed: '',
                    free_trial_days: '',

                })
                Toggle({ type: "load" })

                SweetAlert({ icon: 'success', text: res.data.message })

                // Toggle(false)
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
                        {User ? "Update MemberShip" : "Create MemberShip"}
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

                                            <label>Title </label>
                                            <div className="">
                                                <input type="text" placeholder="Write here...." name="title" value={state.title} onChange={(e) => handleChange(e)} />
                                                {error && error?.title ? <div className="invalid mt-1">{error?.title[0]}</div> : null}

                                            </div>
                                        </div>


                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>Price Per Month </label>
                                            <div className="">
                                                <input type="number" placeholder="Write here...." name="price_per_month" value={state.price_per_month} onChange={(e) => handleChange(e)} />
                                                {error && error?.price_per_month ? <div className="invalid mt-1">{error?.price_per_month[0]}</div> : null}

                                            </div>
                                        </div>

                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>Course Allowed  </label>
                                            <div style={{ zIndex: '9999' }}>
                                                <div className="">
                                                    <input type="number" placeholder="Write here...." name="courses_allowed" value={state.courses_allowed} onChange={(e) => handleChange(e)} />
                                                    {error && error?.courses_allowed ? <div className="invalid mt-1">{error?.courses_allowed[0]}</div> : null}

                                                </div>

                                            </div>
                                        </div>
                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>User Per Course Allowed </label>
                                            <div style={{ zIndex: '9999' }}>
                                                <div className="">
                                                    <input type="number" placeholder="Write here...." name="users_per_course_allowed" value={state.users_per_course_allowed} onChange={(e) => handleChange(e)} />
                                                    {error && error?.users_per_course_allowed ? <div className="invalid mt-1">{error?.users_per_course_allowed[0]}</div> : null}

                                                </div>

                                            </div>
                                        </div>
                                        <div
                                            className="p-field"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >

                                            <label>Free Trial Days  </label>
                                            <div style={{ zIndex: '9999' }}>
                                                <div className="">
                                                    <input type="number" placeholder="Write here...." name="free_trial_days" value={state.free_trial_days} onChange={(e) => handleChange(e)} />
                                                    {error && error?.free_trial_days ? <div className="invalid mt-1">{error?.free_trial_days[0]}</div> : null}

                                                </div>

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
                        <button onClick={() => handleClose()}
                            className="upload-1 sdisad-dsdactive"
                            id="activetab"
                        >

                            Close
                        </button>
                    </div>
                    <div className="idfadsf-sads kajfds-sdfe">
                        <button onClick={() => SaveProfile()}
                            className="upload-1 sdisad-dsdactive"
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
export default MemberShip

