import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Spinner } from 'react-bootstrap'
import { IoTrophySharp } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../../function/hooks";
import { updateUser } from '../../redux/actions/auth/user'
const EditUser = ({ Toggle, permition }: any) => {

    const { token, Admin } = useSelector((state: RootStateOrAny) => state?.admin)


    const [show, setShow] = useState(permition);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        image: Admin?.image,
        fullname: Admin?.fullname,
        email: Admin?.email,
        about: Admin?.about || '',
        password: '', old_password: '',
        tagline: Admin?.tagline || ''
    });
    const [url, setUrl] = useState('');
    const [errors, setErrros] = useState('');

    const dispatch = useDispatch()


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });

    const handleClose = () => {
        Toggle(false)
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files: any = event.target.files;
        if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            SweetAlert({ icon: "error", text: 'please select only image' })
        }
        else {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                // setState({ cover_image: e.target?.result })
                setState({
                    ...state,
                    image: e.target?.result
                });
                setUrl(URL.createObjectURL(event.target.files[0]))
                // this.setState({
                //   selectedFile: e.target.result,
                // })
            }
        }


    }



    const SaveProfile = async () => {

        // let regex = /data:.*base64,/
        // let checks = state?.image.replace(regex, "")
        // let regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        // let check = regexBase64.test(checks);
        try {
            setLoading(true)

            let value = {
                fullname: state.fullname,
                image: state.image,
                email: state.email,
                about: state.about,
                password: state.password,
                tagline: state.tagline,
                // old_password : state.old_password

            }

            let res = await AxInstance.post('api//edit-profile', value)
            if (res.data.success === true ) {
                setLoading(false)
                SweetAlert({ icon: 'success', text: res.data.message })
                dispatch(updateUser(res.data))
                Toggle(false)
            }
            else {
                setErrros(res.data.error)
                setLoading(false)

            }
        }
        catch (err) {
            setLoading(false)
            SweetAlert({ icon: 'error', text: err })

        }

    }

    // let selectImage = User?.image || state.image

    console.log("loading", loading)
    return (

        <div className="hasiw0eskdwd">
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="page-content " id="page-content">
                        <div >
                            <div className="row  d-flex justify-content-center">
                                <div className="col-xl-12 col-md-12">
                                    <div className="card user-card-full">
                                        <div className="row m-l-0 m-r-0">
                                            <div className="col-sm-4 bg-c-lite-greens user-profile" >
                                                <div className="card-block text-center text-white ">
                                                    <div className="m-b-25 show_image">
                                                        <img
                                                            src={state.image}
                                                            className="img-radius"
                                                            alt="User-Profile-Image"
                                                        />

                                                        <label htmlFor="image" className="upload_img">
                                                            <i className="fa fa-edit" ></i>
                                                        </label>
                                                        <input type="file" id="image" onChange={(e) => handleChangeFile(e)} name="image" style={{ display: 'none' }} />
                                                    </div>


                                                    <div className="inpt_field">
                                                        <input type="text" name="fullname"
                                                            value={state.fullname}
                                                            id={`${errors.fullname && 'input_filed_error'}`}
                                                            onChange={(e) => handleChange(e)} placeholder="Write here..." />
                                                        {errors?.fullname && <div className="invalid mt-1">{errors?.fullname[0]}</div>}

                                                    </div>
                                                    <div className="inpt_field mt-2">
                                                        <input type="text" name="tagline"
                                                            value={state.tagline} onChange={(e) => handleChange(e)} placeholder="Write here..."
                                                            id={`${errors.tagline && 'input_filed_error'}`}

                                                        />
                                                        {errors?.tagline && <div className="invalid mt-1">{errors?.tagline[0]}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="card-block">
                                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                                                        Information
                                                    </h6>
                                                    <div className="row">
                                                        <div className="col-sm-6 inpt_field">
                                                            <p className="m-b-10 f-w-600">Email</p>
                                                            <input type="text" name="email"
                                                                value={state.email}
                                                                onChange={(e) => handleChange(e)}
                                                                placeholder="Write here..."
                                                                id={`${errors.email && 'input_filed_error'}`} />
                                                            {errors?.email && <div className="invalid mt-1">{errors?.email[0]}</div>}

                                                        </div>
                                                        <div className="col-sm-6 inpt_field">
                                                            <p className="m-b-10 f-w-600">Password</p>
                                                            <input type="password" name="password" value={state.password} onChange={(e) => handleChange(e)} placeholder="Write here..." id={` ${errors.password && 'input_filed_error'}`} />
                                                            {errors?.password && <div className="invalid mt-1">{errors?.password[0]}</div>}

                                                        </div>
                                                    </div>

                                                    {/* <div className="row mt-2">
                                                        <div className="col-sm-12 col-md-12 col-lg-12 inpt_field">
                                                            <p className="m-b-10 f-w-600">old Password</p>
                                                            <input type="password" name="old_password" id={`${errors.old_password && 'input_filed_error'}`} value={state.old_password} onChange={(e) => handleChange(e)} placeholder="Write here..." />
                                                            {errors?.old_password && <div className="invalid mt-1">{errors?.old_password[0]}</div>}

                                                        </div>

                                                    </div> */}

                                                    <div className="row mt-2">
                                                        <div className="col-sm-12 col-md-12 col-lg-12 inpt_field">
                                                            <p className="m-b-10 f-w-600">About</p>
                                                            <textarea placeholder="Write here..." name="about" className={` ${errors.about && 'input_filed_error'}`} value={state.about} onChange={(e) => handleChange(e)} />
                                                            {errors?.about && <div className="invalid mt-1">{errors?.about[0]}</div>}

                                                        </div>

                                                    </div>



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
                        <button onClick={() => SaveProfile()} className="upload-1 sdisad-dsdactive">
                            {loading ?
                                <Spinner animation="border" />

                                :
                                "Update"
                            }
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default EditUser

