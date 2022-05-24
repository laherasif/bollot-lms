import type { NextPage } from "next";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Spinner } from "react-bootstrap";
import { SweetAlert } from "../../function/hooks";
import {
  addMoreQuiz,
  addMoreOption,
  delQuiz,
  delQuizOption,
  addOptionInput,
  addQuestionInput, addOptionRadio
} from '../../redux/actions/instructor/quiz'
const options = ["one", "two", "three"];
export default ({ onStepChange, onPrevStep, step }: any) => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(true)
  const [saveQuiz, setSaveQuiz] = useState(false)
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()



  const token = useSelector((state: RootStateOrAny) => state?.admin?.token)
  const { Quiz } = useSelector((state: RootStateOrAny) => state?.quiz)
  const { courseId } = useSelector((state: RootStateOrAny) => state?.addCourse)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: "$2y$10$ekdz.jeHgiqPD4t2SfA8xepsqgYfAzi2zQ/2l/85R4vYRVgZB04YG"
    }
  });


  const Questions = () => {
    dispatch(addMoreQuiz())
  }

  const Addmore = (index: number) => {
    dispatch(addMoreOption(index))
  }


  const removeInputFields = (index: number, i: number) => {

    dispatch(delQuizOption({ index, i }))


  }

  const removeInputField = (index: number) => {
    dispatch(delQuiz(index))

  }

  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addOptionInput({ name, value, index, i }))

  }

  const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addOptionRadio({ name, index, i }))

  }

  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addQuestionInput({ name, value, index }))
  }


  const UpdateQuiz = async () => {
    let value = {
      course_id: courseId,
      questions: Quiz
    }

    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//admin/courses/quiz/store', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        SweetAlert({ icon: "success", text: res.data.message })

        onStepChange()
      }
      else {
        setSaveQuiz(false)
        setErrors(res.data.error.questions)
      }

    } catch (error) {
      setSaveQuiz(false)
      SweetAlert({ icon: "error", text: error })

    }


  }





  return (
    <div className="inst p-fields" style={{ position: 'relative' }}>
      <section className="dash-board jadsifd-asdasid">
        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course" style={{ position: 'relative' }}>
              <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="maxima ">
                      <div className="idfadsf-sads">
                        <button onClick={() => Questions()} className="upload-1 sdisad-dsdactive">
                          + Add More
                        </button>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
              <div className="complete-web-1 mb-3 w-100 " style={{ marginBottom: '60px' }}>

                {Quiz && Quiz.length ? Quiz?.map((q: any, index: number) => (
                  <div className="p-3 quiz" key={index}
                  // style={errors && errors[0]?.options ? { width: '100%', border: '1pt solid red' } : { width: '100%' }}
                  >
                    <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                      <label>Question : {index + 1}</label>
                      {(Quiz.length !== 1) ? <div onClick={(e) => removeInputField(index)}> <i className="fa fa-trash mt-2"></i></div> : ""}
                    </div>
                    <input
                      type="text"
                      name="question"
                      className="w-100 "
                      style={errors && errors[index]?.question && { border: '1pt solid red' }}
                      value={q.question}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Write here..."
                    />
                    {errors && errors[index]?.question ? <div className="invalid mt-1">{errors[index]?.question}</div> : null}

                    {q.options.length ? q.options.map((op, i) => (
                      <>
                        <div
                          style={{ display: 'flex', marginTop: '10px' }} key={i}>
                          <div style={{ width: '10%' }}>
                            <input style={{ marginTop: '10px' }}
                              onChange={(e) => handleChangeRadio(index, i, e)}
                              checked={op.correct === "1"} name="correct" type="checkbox" />
                          </div>
                          <div className="input_fields">
                            <input
                              type="text"
                              name="option"
                              style={errors && errors[index]?.options[i]?.option && { border: '1pt solid red' }}
                              value={op.option}
                              onChange={(e) => handleChangeOptions(index, i, e)}
                              placeholder="Write here...."
                            />

                            {errors && errors[index]?.options ? <div className="invalid mt-1 w-100">{errors && errors[index]?.options[i]?.option}</div> : null}
                          </div>
                          <div style={{ paddingTop: '5px', paddingLeft: '10px' }} onClick={() => removeInputFields(index, i)}>
                            <i className="fa fa-trash"></i>
                          </div>
                        </div>

                      </>
                    ))
                      :
                      <div className="ml-3">
                        {errors ? <div className="invalid mt-1">{errors[index]?.options[0]}</div> : null}
                      </div>

                    }
                    {q.options.length < 6 ?
                      <h3 style={{ cursor: 'pointer', textAlign: 'right', fontSize: '14px', marginTop: '10px' }}
                        onClick={() => Addmore(index)}
                      >+ Add more </h3>
                      : ""
                    }

                    <div>
                      {errors && errors[0]?.options ? <div className="invalid mt-1">{errors[0]?.options}</div> : null}
                    </div>

                  </div>


                ))
                  : <div>Quiz not avaliable </div>
                }


              </div>
              <div className="umpire w-100 " >
                <div className="umpire-1 umpire-1-cst d-flex justify-content-center mt-3 ">
                  <div className="d-flex mb-3 idfadsf-sads">
                    <button
                      className="upload-1 sdisad-dsdactive "
                      onClick={() => onPrevStep(step - 1)}
                    >
                      Previous
                    </button>
                    <button
                      className="upload-1 sdisad-dsdactive"
                      onClick={() => UpdateQuiz()}
                    >
                      <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                      {saveQuiz ? <Spinner animation="border" /> : "Save & Next"}
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};



