import type { NextPage } from "next";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { SweetAlert } from "../../function/hooks";
const options = ["one", "two", "three"];
export default ({ onStepChange, courseId , onPrevStep , step }: any) => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(true)
  const [saveQuiz, setSaveQuiz] = useState(false)
  const [message, setMessage] = useState(false)
  const [allQuiz, setAllQuiz] = useState([
    {
      question: '',
      options: [
        { option: "", correct: false, },

      ]
    },
  ])

  const router = useRouter()



  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  
  const Questions = () => {
    setAllQuiz([
      {
        question: '',
        options: [
          { option: "", correct: false, },

        ]
      },
      ...allQuiz,


    ])
  }

  const Addmore = (index: number) => {
    const list: any = [...allQuiz];
    for (let i = 0; i < list.length; i++) {
      if (i === index) {
        const element = list[i];
        element?.options.push({ name: "", correct: false, })
      }

    }
    setAllQuiz(list)
  }


  const removeInputFields = (index: number, i: number) => {


    const list: any = [...allQuiz];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        let find = element.options
        find.splice(i, 1)
      }

    }
    setAllQuiz(list)
  }

  const removeInputField = (index: number,) => {

    const rows = [...allQuiz];
    rows.splice(index, 1);
    setAllQuiz(rows);


    setAllQuiz(rows)
  }



  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        element.options[i][name] = value;
      }

    }
    setAllQuiz(list)

  }

  const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        for (let b = 0; b < element.options.length; b++) {
          let elements = element.options[b];
          if (elements.correct === "1") {
            elements.correct = "0"
          }
          element.options[i][name] = "1";
        }

      }

    }
    setAllQuiz(list)

  }

  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    list[index][name] = value;
    setAllQuiz(list);




  }


  const UpdateQuiz = async () => {
    let value = {
      course_id: courseId,
      questions: allQuiz
    }

    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//instructor/courses/quiz/edit/question', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        onStepChange()
        setMessage(true)
      }

    } catch (error) {

    }


  }




  return (
    <div className="inst" style={{ position: 'relative' }}>
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
                      {/* {allQuiz && allQuiz.length ?
                        <div style={{ marginLeft: '20px' }} className="idfadsf-sads">
                          <button className="upload-1 sdisad-dsdactive" onClick={() => UpdateQuiz()}>Update Quiz</button>
                        </div>
                        : null
                      } */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="complete-web-1 mb-3" style={{ marginBottom: '60px' }} >

                {allQuiz && allQuiz.length ? allQuiz?.map((q, index) => (
                  <div className="p-3 quiz" key={index} style={{ width: '100%' }}>
                    <div className="p-field  ">
                      <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                        <label>Question : {index + 1}</label>
                        {(allQuiz.length !== 1) ? <div onClick={(e) => removeInputField(index)}> <i className="fa fa-trash mt-2"></i></div> : ""}
                      </div>
                      <input
                        type="text"
                        name="question"
                        className="w-100"
                        value={q.question}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Write here..." />

                    </div>
                    {q.options.map((op, i) => (
                      <>
                        <div className="p-field" style={{ display: 'flex', marginTop: '10px' }} key={i}>
                          <div style={{ width: '20%' }}>
                            <input style={{ marginTop: '10px' }}
                              onChange={(e) => handleChangeRadio(index, i, e)}
                              checked={op.correct === "1"} name="correct" type="checkbox" />
                          </div>
                          <div style={{ width: '100%' }}>
                            <input
                              type="text"
                              name="option"
                              className="w-100"
                              value={op.option}
                              onChange={(e) => handleChangeOptions(index, i, e)}
                              placeholder="Write here...." />
                          </div>
                          <div style={{ paddingTop: '5px', paddingLeft: '10px' }} onClick={() => removeInputFields(index, i)}>
                            <i className="fa fa-trash"></i>
                          </div>
                        </div>
                        {/* <p>+Add more </p> */}


                      </>
                    ))}
                    {q.options.length < 6 ?
                      <h3 style={{ cursor: 'pointer', textAlign: 'right', fontSize: '14px', marginTop: '10px' }}
                        onClick={() => Addmore(index)}
                      >+ Add more </h3>
                      : ""
                    }
                  </div>
                ))
                  : <div>Quiz not avaliable </div>
                }


              </div>
              <div className="d-flex mt-2 justify-content-center">
                <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                  <button className="upload-1 sdisad-dsdactive " onClick={() => onPrevStep(step -1 )}>
                    Preview
                  </button>
                </div>
                <div className="idfadsf-sads kajfds-sdfe">
                  <button className="upload-1 sdisad-dsdactive" onClick={() => UpdateQuiz()}>
                    {saveQuiz ?
                      <Spinner animation="border" />
                      :
                      "Save & Next"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};



