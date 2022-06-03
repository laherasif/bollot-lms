import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import insImg from '../../src/assets/images/instructor.png'
import stuImg from '../../src/assets/images/student.png'
import { SweetAlert } from "../../function/hooks";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AdddelUpdateCatagories } from "../../redux/actions/admin";
const AddCatagory = ({ Toggle, permition, Data }: any) => {


    const [show, setShow] = useState(permition);
    const [values, setValues] = useState(Data || {});
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)


    const dispatch = useDispatch()
  
  const { token } = useSelector((state: RootStateOrAny) => state?.admin)
  
  const AxInstance = axios.create({
      // .. where we make our configurations
      baseURL: 'https://dev.thetechub.us/bolloot/',
      headers: {
          token: token
        }
      
      });


  const {  Catagories } = useSelector((state: RootStateOrAny) => state?.admin)


    
    const handleClose = () => {
        Toggle()
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files: any = event.target.files;
        if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            SweetAlert({ icon: "error", text: 'please select only image' })
        }
        else {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                let name = "icon"
                let value = e.target?.result
                setValues({ ...values, [name]: value })

                let imageUrl = URL.createObjectURL(event.target.files[0])
                setUrl(imageUrl)

            }
        }
    }


    const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    };


    const handleSubmit = async () => {
        try {
            let data = {
                name: values.name,
                icon: values.icon,
                parent_id: values.parent_id


            }
            setLoading(true)
            let res = await AxInstance.post('api//admin/categories/store', data)
            console.log("Res" , res )
            if (res.data.success === true) {
                dispatch(AdddelUpdateCatagories({ data : res.data.response.category  , type:'add'}))
                SweetAlert({ icon: "success", text: res.data.message })
                setLoading(false)
                Toggle()

            }
            else {
                setError(res.data.error)
                setLoading(false)

            }
        }
        catch (err) { }
    }



    const handleUpdate = async () => {
        try {
            let data = {
                id: values.id,
                name: values.name,
                parent_id: values.parent_id
            }
            setLoading(true)
            let res = await AxInstance.post('api//admin/categories/update', data)
            if (res.data.success === true) {
                SweetAlert({ icon: "success", text: res.data.message })
                dispatch(AdddelUpdateCatagories({ data : res.data.response.category , type:'update'}))
                setLoading(false)
                Toggle(false)

            }
            else {
                setError(res.data.error)
                setLoading(false)

            }
        }
        catch (err) { }
    }
    return (

        <div className="hasiw0eskdwd">
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Create Catagory </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '100%', padding: '2rem' }} >
                    <div className="mb-3 w-100"  >

                        <div style={{ display: 'flex', flexDirection: 'column', }} >
                            <div className="w-100 mb-2">
                                <label>Catagory Name </label>
                                <br />
                                <input type="text"
                                    name="name"
                                    className="form-control "
                                    value={values?.name}
                                    onChange={(e) => hendleFields(e)}
                                    placeholder="Write here..." />
                                {error?.name && <div className="invalid mt-1">{error?.name[0]}</div>}

                            </div>
                            <div >
                                <label>Parent Category (Optional) </label>
                                <br />
                                <Form.Select name="parent_id"
                                    value={values?.parent_id} onChange={(e) => hendleFields(e)}>
                                    <option defaultChecked>Select Catagory</option>
                                    {Catagories && Catagories?.map((cata: any) => (
                                        <option key={cata?.id} value={cata?.id}>{cata?.name}</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
                                <span >Catagory Image</span>
                                <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
                                    <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                                        {url || Data ? <img src={url || values.icon} alt="course_img" style={{ width: '30%', height: ' 50%', objectFit: 'cover' }} /> : ""}
                                        {url || Data ? " " : <p>Select Image</p>}
                                    </div>
                                    <input type="file" accept="image/png, image/gif, image/jpeg" name="cover_image"
                                        onChange={(e) => handleInputChange(e)}
                                        id="img"
                                        style={{ display: 'none' }} />
                                </label>
                                {error?.icon && <div className="invalid mt-1">{error?.icon[0]}</div>}

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
                                onClick={Data ? () => handleUpdate() : () => handleSubmit()}
                                className="upload-1 sdisad-dsdactive"
                            >
                                {loading ? <Spinner animation="border" />
                                    :
                                    Data ? "Update" : "Save"
                                }
                            </button>
                        </div>
                    </div>


                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default AddCatagory

