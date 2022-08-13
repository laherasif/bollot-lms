import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useState } from "react";
import axios from 'axios'
import { Spinner } from "react-bootstrap";
import { SweetAlert } from "../../function/hooks";
import { addPreMoreQuiz, addPreMoreOption, delPreQuiz, delPreQuizOption, addPreOptionInput, addPreQuestionInput, addPreOptionRadio } from '../../redux/actions/instructor/prequiz'
export default ({ onStepChange, onPrevStep, step }: any) => {
  // const intl = useIntl();

  const [saveQuiz, setSaveQuiz] = useState(false)
  const [errors, setErrors] = useState([])
  const [newError, setNewError] = useState('')
  const dispatch = useDispatch()



  const token = useSelector((state: RootStateOrAny) => state?.admin?.token)
  const { PreQuiz } = useSelector((state: RootStateOrAny) => state?.preQuiz)
  const { courseId } = useSelector((state: RootStateOrAny) => state?.addCourse)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  const Questions = () => {
    dispatch(addPreMoreQuiz())
  }

  const Addmore = (index: number) => {
    dispatch(addPreMoreOption(index))
  }


  const removeInputFields = (index: number, i: number) => {

    dispatch(delPreQuizOption({ index, i }))


  }


  const removeInputField = (index: number) => {
    let find = errors.filter((item, i) => { return i !== index })
    setErrors(find)
    dispatch(delPreQuiz(index))

  }

  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addPreOptionInput({ name, value, index, i }))

  }

  const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addPreOptionRadio({ name, index, i }))

  }

  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addPreQuestionInput({ name, value, index }))
  }


  const UpdateQuiz = async () => {
    let value = {
      course_id: courseId ,
      questions: PreQuiz
    }

    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//admin/courses/quiz/store/1', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        SweetAlert({ icon: "success", text: res.data.message })

        onStepChange()
      }
      else {
        setSaveQuiz(false)
        // console.log("res", res.data)
        let check = res.data.error
        if (typeof check === "string") {
          setNewError(check)
        }
        setErrors(res.data.error.questions)
      }

    } catch (error) {
      setSaveQuiz(false)
      SweetAlert({ icon: "error", text: error })

    }


  }


  return (

    <div className="p-fields">
      <div className="complete-web-1 ">
        <div className="umpire w-100">
          <div className="idfadsf-sads">
            <button onClick={() => Questions()} className="upload-1 sdisad-dsdactive" id="activetab">
              + Add More
            </button>
          </div>



        </div>
      </div>

      <div className="complete-web-1 mb-3 w-100 " style={{ marginBottom: '60px' }}>

        {PreQuiz && PreQuiz.length ? PreQuiz?.map((q: any, index: number) => (
          <div className="p-3 quiz" id="quiz-card" key={index}
          // style={errors && errors[0]?.options ? { width: '100%', border: '1pt solid red' } : { width: '100%' }}
          >
            <div className="d-flex " style={{ justifyContent: 'space-between' }}>
              <label>Question : {index + 1}</label>
              {(PreQuiz.length !== 1) ? <div onClick={(e) => removeInputField(index)}> <i className="fa fa-trash mt-2"></i></div> : ""}
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
              {newError ? <div className="invalid mt-1">{newError}</div> : null}
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
              id="activetab"
              onClick={() => onPrevStep(step - 1)}
            >
              Previous
            </button>
            <button
              className="upload-1 sdisad-dsdactive"
              id="activetab"
              onClick={() => UpdateQuiz()}
            >
              <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
              {saveQuiz ? <Spinner animation="border" /> : "Save & Next"}
            </button>
          </div>

        </div>
      </div>

    </div>
    //       </div >
    //     </div >
    //   </section >

    // </div >
  );
};



