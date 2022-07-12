import React, { useState, useEffect } from 'react'
// import { QuestionTypes } from '../../Types/types'
// import './card.css'


type QuestionTypes = {
    question: string
    options: string[]
    callback: (e: React.FormEvent<EventTarget>, answer: string , questionId : number ) => void
    callprev: (e: React.FormEvent<EventTarget>) => void
    totalQuestion: number
    curruntQuestion: number
    questionId :number
}


const Card: React.FC<QuestionTypes> = ({  options, question, questionId ,  callback, callprev }) => {

    let [selectedAns, setSelectedAns] = useState("")


    const HendleChange = (e: any) => {
        setSelectedAns(e.target.value);


    }

    

    return (
        <div id='quiz-card' >
            <div id='quiz-option' >
                <section className="Quiz-section">

                    <div className="container  my-1">
                        <div className="question ml-sm-5 pl-sm-5 pt-2">

                            {question && <div className="py-2 h3"><b>Q.  {question}</b></div>}
                            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, questionId , selectedAns)
                            }>
                                <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                    {options && options?.map((opt: string, index: number) => {
                                        return (
                                            <label className="options" key={index}>{opt?.option}
                                                <input type="radio"
                                                    value={opt?.id}
                                                    required
                                                    checked={selectedAns == opt?.id}
                                                    onChange={HendleChange}
                                                    name="item" />
                                                <span className="checkmark" />
                                            </label>

                                        )
                                    })
                                    }
                                </div>
                                <div className="umpire-1 umpire-1-cst ">
                                    <div className="d-flex mb-3">

                                        {/* <button className="upload-1 sdisad-dsdactive"
                                        // onClick={() => AddmoreSection()}
                                        >
                                            prev </button> */}
                                        <button className="upload-1 sdisad-dsdactive mt-2"
                                        id="activetab"
                                        // onClick={() => SaveCriculum()}
                                        >
                                            <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                                            Next
                                        </button>

                                    </div>

                                </div>
                               
                            </form>
                        </div>
                    </div>


                </section>
            </div>
        </div>

    )
}
export default Card