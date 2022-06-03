import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import insImg from '../../src/assets/images/instructor.png'
import stuImg from '../../src/assets/images/student.png'
import { SweetAlert } from "../../function/hooks";
import { RootStateOrAny, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
const AddBlog = ({ Toggle, permition, Data }: any) => {


    const [show, setShow] = useState(permition);
    const [values, setValues] = useState(Data || {});
    const [url, setUrl] = useState('');
    const [catagory, setCatagory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const { token } = useSelector((state: RootStateOrAny) => state?.admin)
    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    })


    useEffect(() => {
        let fetchCourse = async () => {
            try {
                // setLoading(true)
                let res = await AxInstance.get('api//admin/categories')
                if (res.data.success === true) {
                    // setLoading(false)
                    setCatagory(res.data.response.categories)
                }
            }
            catch (err) {

            }
        }
        fetchCourse()
    }, [])

    const handleClose = () => {
        Toggle(false)
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
            if (res.data.success === true) {
                SweetAlert({ icon: "success", text: res.data.message })
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
                                <label>Title </label>
                                <br />
                                <input type="text"
                                    name="title"
                                    className="form-control "
                                    value={values?.title}
                                    onChange={(e) => hendleFields(e)}
                                    placeholder="Write here..." />
                                {error?.title && <div className="invalid mt-1">{error?.title[0]}</div>}

                            </div>
                            <div >
                                <label>Catagory Name </label>
                                <br />
                                <textarea
                                    className={error?.name ? " full-name-error brd-20" : "form-control full-name brd-20"}
                                    rows={5}
                                    name="short_desc"
                                    value={values?.short_desc}
                                    onChange={(e: any) => hendleFields(e)}
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div>
                                <TagsInput selectedTags={selectedTags} tags={['Nodejs', 'MongoDB']} />
                            </div>

                            <div className="mt-3">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data="<p>Hello from CKEditor 5!</p>"
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                    }}
                                    onBlur={(event, editor) => {
                                    }}
                                    onFocus={(event, editor) => {
                                    }}
                                />
                            </div>



                            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
                                <span >Catagory Image</span>
                                <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
                                    <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                                        {url || Data ? <img src={url || values.icon} alt="course_img" style={{ width: '30%', height: ' 50%', objectFit: 'cover' }} /> : ""}
                                        {url || Data ? " " : <p>Drag your photos here</p>}
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
export default AddBlog

