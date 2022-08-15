import axios from 'axios'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { addZybookCourseInput } from '../../redux/actions/instructor/zybooks'

const ContactInfo = ({ onStepChange, onPrevStep, step, backText }: any) => {


    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const { zybooks } = useSelector((state: RootStateOrAny) => state)
    const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)


    const AxInstance = axios.create({
        // .. where we make our configurations
        baseURL: 'https://dev.thetechub.us/bolloot/',
        headers: {
            token: token
        }
    });

    const handleChange = (e) => {
        let { name, value } = e.target
        dispatch(addZybookCourseInput({ name, value }))
    }

    const CheckData = async () => {

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onStepChange()

        }, 2000);

    }


    return (
        <>
            <div className="cust_wrapper">
                <div className="cut_heading">
                    <h4>Contact Infromation</h4>
                </div>
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.</p> */}
                <div className='content_container'>

                    <div >
                        <input type="text" name="office_phone" value={zybooks?.office_phone} onChange={(e) => handleChange(e)} className='form-control' placeholder='Office Number' />
                        <input type="text" name="mobile_phone" value={zybooks?.mobile_phone} onChange={(e) => handleChange(e)} className='form-control mt-2' placeholder='Mobile Number' />

                    </div>

                    <div className='classinfo_text'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ratione, cumque ad sapiente voluptates distinctio aut harum itaque, praesentium assumenda enim. Debitis .</p>
                    </div>

                    <div>
                        <label>Assisting zyBooks team member</label>
                        <select className='form-control'>
                            <option>Selexct Searh</option>
                        </select>

                        <label>Additional Comments</label>
                        <textarea
                            name="additional_comments"
                            value={zybooks?.additional_comments}
                            onChange={(e) => handleChange(e)}
                            className='form-control mt-3' cols={5} rows={4}></textarea>
                    </div>
                </div>

                <div className="adopt_bottom">
                    <div className="circle_wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="active_circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="adopt_bottom_button" style={error?.courses ? { bottom: '10px' } : { bottom: '-10px' }}>
                        <div className='bottom_buttons'>
                            <button className="back" onClick={() => onPrevStep(step - 1)}> Back <span>{backText}</span></button>
                            <button className='next' onClick={() => CheckData()}>
                                {loading ? <Spinner animation="border" style={{ marginTop: '4px' }} /> :
                                    "Next"
                                }
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </>

        // <>
        //     <div className="cust_wrapper">
        //         <div className="cut_heading">
        //             <h4>Contact Infromation</h4>
        //             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, architecto, laboriosam natus facere officiis, tempore perferendis quas tenetur sunt fugiat quasi consequatur maxime iure ipsa! Sapiente libero quam expedita quibusdam.</p>
        //         </div>




        //     </div>
        // </>
    )
}

export default ContactInfo