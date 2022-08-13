import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from 'react-bootstrap'
import { RootStateOrAny, useSelector } from "react-redux";
import { SweetAlert } from "../../function/hooks";
const EditAdmin = ({ Toggle, permition, roles, data, checkBox }: any) => {

    const { token } = useSelector((state: RootStateOrAny) => state?.admin)


    const [show, setShow] = useState(permition);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        fullname: data?.fullname,
        email: data?.email,
        password: data?.password,
        adminRoles: checkBox
    });
    const [checkBoxs, setCheckBoxs] = useState([])
    const [errors, setErrros] = useState('');
    const [selectAll, setSelectAll] = useState(false)

    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });



    // useEffect(() => {
    //     let checkBox = state.adminRoles
    //     for (let i = 0; i < data?.roles?.length; i++) {
    //         const element = data?.roles[i]?.id;
    //         checkBox.push(element)
    //         setState({
    //             ...state,
    //             adminRoles: checkBox
    //         })
    //     }

    // }, [])




    const handleClose = () => {
        Toggle({ type: "close" })
    }

    const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleCheckBox = (id: number) => {
        let checkBox = state.adminRoles
        let find = checkBox.find((f) => f === id)
        if (find) {
            let find2 = checkBox.filter((f) => f !== id)
            setState({
                ...state,
                adminRoles: find2
            })
        } else {
            checkBox.push(id)
            setState({
                ...state,
                adminRoles: checkBox
            })
        }




    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {

        let check = event.target.checked
        let checkBoxAll = state.adminRoles
        if (check === true) {
            setSelectAll(true)

            for (let i = 0; i < roles.length; i++) {
                const element = roles[i].id;
                debugger
                if (!checkBoxAll.includes(element)) {
                    checkBoxAll.push(element)
                    // let descOrder = checkBoxAll.sort();
                    let reverse = checkBoxAll.reverse();

                    setState({
                        ...state,
                        adminRoles: reverse
                    })
                }

            }
        }
        else {
            setSelectAll(false)
            setState({
                ...state,
                adminRoles: []
            })
        }



    };



    const SaveAdmin = async () => {

        try {
            setLoading(true)

           

            let value = {
                sub_admin_id: data?.id,
                fullname: state?.fullname,
                email: state?.email,
                password: state?.password,
                roles: state?.adminRoles

            }


            let res = await AxInstance.post('api//admin/sub-admins/add', value)
            if (!res.data.error) {
                setLoading(false)
                SweetAlert({ icon: 'success', text: res.data.message })
                Toggle({type:'load'})

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


    return (

        <div className="hasiw0eskdwd">
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Sub Admin
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="page-content" style={{ padding: '20px 30px 50px 30px' }}>
                        <div className="jds0sas0w-eawne">
                            <label className=" px-2">Roles </label>
                            {roles && roles.length ?

                                <div className="checkbox-field">
                                    <div className="checkbox_wrapper">
                                        <input
                                            onChange={handleSelectAll}
                                            checked={state?.adminRoles.length === 7 ? true : state?.adminRoles.length < 7 ? false : null}
                                            type="checkbox"
                                            name="all"
                                        />
                                        <span className="role_name"> all </span>
                                    </div>
                                    {roles && roles.map((role) => (
                                        <div className="checkbox_wrapper" key={role?.id}>
                                            <input
                                                checked={state?.adminRoles?.includes(role?.id) ? true : state?.adminRoles.length < 7 ? false : true}
                                                onChange={() => handleCheckBox(role?.id)}
                                                type="checkbox"
                                                name={role?.role_key}
                                            />
                                            <span className="role_name"> {role?.role_key} </span>
                                        </div>

                                    ))

                                    }
                                </div>
                                : <div style={{ textAlign: 'center' }}>
                                    <Spinner animation="border" />
                                </div>
                            }
                            {errors?.roles && <div className="invalid mt-1">{errors?.roles[0]}</div>}


                            <div className="p-field mt-2">
                                <div>
                                    <label>Fullname</label>
                                    <input type="text"
                                        name="fullname"
                                        value={state.fullname}
                                        onChange={(e) => hendleFields(e)}
                                        placeholder="Write here..." />
                                    {errors?.fullname && <div className="invalid mt-1">{errors?.fullname[0]}</div>}

                                </div>
                                <div>
                                    <label>Email Address</label>
                                    <input type="text"
                                        name="email"
                                        value={state.email}
                                        onChange={(e) => hendleFields(e)}
                                        placeholder="Write here..." />
                                    {errors?.email && <div className="invalid mt-1">{errors?.email[0]}</div>}

                                </div>

                                <div>
                                    <label>Password</label>
                                    <input type="password"
                                        name="password"
                                        value={state.password}
                                        onChange={(e) => hendleFields(e)}
                                        placeholder="Write here..." />
                                    {errors?.password && <div className="invalid mt-1">{errors?.password[0]}</div>}

                                </div>





                            </div>


                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                    <div className="idfadsf-sads kajfds-sdfe" >
                        <button className="upload-1" id="activetab" onClick={() => SaveAdmin()}>
                            {loading ?
                                <Spinner animation="border" />
                                : "Update"
                            }

                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default EditAdmin

