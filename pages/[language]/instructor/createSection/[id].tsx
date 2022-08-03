import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import { Accordion, Breadcrumb, Tab, Tabs } from "react-bootstrap";
import moment from "moment";
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri'
import withAuth from "../../../../src/components/Hoc/authRoute";
import Editor from "../../../../src/components/instructor/sectionEditor";
import CodeEditorWindow from "../../../../src/components/instructor/codeEditor";
import { myBucket, S3_BUCKET } from "../../../../src/confiq/aws/aws";
import { SweetAlert } from "../../../../src/function/hooks";
import useKeyPress from "../../../../src/components/Hoc/useKeyPress";
import { useRouter } from "next/router";
import OutputWindow from "../../../../src/components/instructor/codeResult";
import { addQuestionsAnswers, addSectionsValues, createCodeEditor, createCodes, createImage, createMultipleChoice, createShortQuestion, createTable, createText, createVideo, deleQuestionAnwser, IncDescOptions } from "../../../../src/redux/actions/instructor/zybooks";
import ReactPlayer from "react-player";
const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [code, setCode] = useState(null);
  const [codeFile, setCodeFile] = useState('');
  const [selectLanguage, setselectLanguage] = useState(null);
  const [loader, setLoader] = useState(false)
  const [lecture, setLectures] = useState({})
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState([]);
  const [table , setTable] = useState(false)
  // const [courseLanguage , setCourseLanguage] = useState('')
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");


  const [data, setData] = useState({
    full_content: '',

  });
  useEffect(() => {
    // setLoading(true)
    setEditorLoaded(true);


  }, [])



  // let p = [{user:[]} , {table:[] }, {code:[]} , {multi:[{}]} , {short:[{}]} ]





  const onSelectChange = (e) => {
    let lang = language.find((item) => item.id == e.target.value)
    setselectLanguage(lang.id);
  };

  const router = useRouter()

  const dispatch = useDispatch()

  const { token } = useSelector((state: RootStateOrAny) => state.userReducer)
  const sections = useSelector((state: RootStateOrAny) => state.createSection)
  let sectionData = sections.section

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  console.log("sectionData", table)


  let courseTitle = router.query.id

  useEffect(() => {


    // setTimeout(() => {
    //   setLoading(false)

    // }, 2000);

    let fetchLanuage = async () => {
      const options: Object = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages',
        headers: {
          'X-RapidAPI-Key': "dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a",
          'X-RapidAPI-Host': "judge0-ce.p.rapidapi.com"
        }
      };
      try {
        let res = await axios.request(options);
        setLanguage(res.data)
      }
      catch (err) {
        SweetAlert({ icon: "error", text: err })
      }
    }

    fetchLanuage()

    if (enterPress && ctrlPress) {
      handleCompile();
    }

  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: selectLanguage,
      source_code: btoa(code),
    };
    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': "dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a",
        'X-RapidAPI-Host': "judge0-ce.p.rapidapi.com"
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        console.log("token" , token)
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response;
        if (status === 429) {
          SweetAlert({ icon: 'error', text: status })
          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        setProcessing(false);
        if (code === null) {
          SweetAlert({ icon: 'error', text: error.language_id[1] })

        }
        else {
          SweetAlert({ icon: 'error', text: error.language_id[0] })
        }

      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Key': "dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a",
        'X-RapidAPI-Host': "judge0-ce.p.rapidapi.com"
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      // showErrorToast();
    }
  };


  const handleCodeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = event.target.files;
    // if (!files[0].name.match(/.(ppt|docx|doc|csv)$/i)) {
    //   SweetAlert({ icon: "error", text: 'please select files' })

    // }
    // else {
    let file = files[0]
    setCodeFile(file?.name)
    const params = {
      ACL: 'private',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file?.name
    };
    myBucket.putObject(params, function (perr, pres) {
      if (perr) {
      } else {
        console.log("Successfully uploaded data to " + pres);
      }
    })
    // }
  }


  const addEvent = (type: string) => {
    switch (type) {
      case "text":
        dispatch(createText())
        break;
      case "table":
        // dispatch(createTable())
        setTable(true)
        break;
      case "code":
        dispatch(createCodeEditor())
        break;
      case "multiple":
        dispatch(createMultipleChoice())
        break;
      case "short":
        dispatch(createShortQuestion())
        break;
      case "images":
        dispatch(createImage())
        break;
      case "videos":
        dispatch(createVideo())
        break;
      case "codes":
        dispatch(createCodes())



    }
  }


  const addmoreQues = (type: string, pIndex: number, cIndex: number) => {
    debugger
    if (type === "short_answer") {
      let values = {
        pIndex: pIndex,
        cIndex: cIndex
      }
      dispatch(addQuestionsAnswers(type, values))

    }
    else {
      dispatch(addQuestionsAnswers(type))
    }
  }


  const delQuestionAns = (type: string, index: number, i: number, ansIndex: number) => {
    if (type === "short_answer") {
      let value = {
        pIndex: index,
        cIndex: i,
        ansIndex: ansIndex
      }
      dispatch(deleQuestionAnwser(type, value))
    }
    else {
      let value = {
        pIndex: index,
        cIndex: i,
      }

      dispatch(deleQuestionAnwser(type, value))

    }
  }

  // increase and descrese options

  const InAndDesOpt = (type: string, pIndex: number, cIndex: number) => {
    dispatch(IncDescOptions(type, pIndex, cIndex))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
    debugger
    let values = {
      value: e.target.value,
      i: index,
      targetName: e.target.name
    }

    if (name === "code") {
      setselectLanguage(e.target.value)
    }
    dispatch(addSectionsValues({ name, values }))

  }

  const handleInputChoice = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number, i: number, ccIndex: number, checkValue: number) => {
    debugger
    let values = {
      value: e.target.value || checkValue,
      index: index,
      i: i,
      ccIndex: ccIndex,
      targetName: e.target.name
    }

    dispatch(addSectionsValues({ name, values }))

  }



  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
    debugger

    let files: any = e.target.files;
    if (files) {
      let file = files ? files[0] : null;
      let url = URL.createObjectURL(file);
      let values = {
        value: url || e.target.value,
        i: index,
        targetName: e.target.name
      }
      dispatch(addSectionsValues({ name, values }))

    }
    else {
      let values = {
        value: e.target.value,
        i: index,
        targetName: e.target.name
      }
      dispatch(addSectionsValues({ name, values }))
    }

  }



  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        {loading ? Small() :
          <div className="inst container-fluid">
            <div className="mt-4">
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Courses Detail</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="wrapper_container_section">
              <div className="row first_row">
                <div className="col-md-2">
                  <div className="content_wrapper">
                    <div className="content_up"></div>
                    <div className="content_down">
                      <div className="content_down_wrapper">
                        <div className="add_text">
                          <h3>Add content <i className="fa fa-caret-down"></i></h3>
                          <span onClick={() => addEvent("text")}>Text Block</span>
                          <span onClick={() => addEvent("table")}>Table</span>
                          <span onClick={() => addEvent("code")}>Code Editor</span>
                          <h5 className="text-gray">Question sets</h5>
                          <span onClick={() => addEvent("multiple")}>Multiple choice</span>
                          <span onClick={() => addEvent("short")}>Short answer</span>
                          <h5 className="text-gray">Figures</h5>
                          <span onClick={() => addEvent("images")}>Image</span>
                          <span onClick={() => addEvent("videos")}>Video</span>
                          <span onClick={() => addEvent("codes")}> Code block</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10 section ">
                  <div className="section_wrapper " style={{ marginRight: '20px' }}>
                    <div className="ckd_wrapper">
                      <Editor
                        name="description"
                        value={data?.full_content}
                        style={{display:'none'}}
                        onChange={(data) => {
                          setData({ ...data, full_content: data })
                        }}
                        editorLoaded={editorLoaded}
                      />

                    </div>

                    <div className="section_container">
                      {sectionData && sectionData.map((d: any, index: number) => (
                        <>
                          <>

                            <div className="content_section">
                              <h3 >1.17</h3>
                              <input type="text" value={d.title} onChange={(e) => handleInput(e, "title", index)} name="title" className="form-control" placeholder="Section Title" />
                            </div>
                            {
                              d.text?.map((tx: any, index: number) => (
                                <div className="text_block">
                                  <input type="text" value={tx} onChange={(e) => handleInput(e, "text", index)} name="text" placeholder="Text here" />
                                  <span onClick={() => delQuestionAns("text", index, 0, 0)}>
                                    <i className="fa fa-trash" ></i>
                                  </span>
                                </div>
                              ))
                            }

                            {d.table?.map((tb) => (
                              <div className="table_section">
                                <div className="table_heading">
                                  <div className="heading_left">
                                    <h3>table</h3>
                                    <input type="text" className="form-control" />
                                  </div>
                                  <div className="heading_right">
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </div>
                                <div className="add_table">
                                  <span>Click to set row and column</span>
                                </div>
                              </div>
                            ))}

                          </>


                          {
                            d.code?.map((c: any, i: number) => (

                              <div className="code_block">
                                <div className="table_heading">
                                  <div className="heading_left">
                                    <h3 style={{fontSize:'13px'}}>CodeEditor : 17.1.10</h3>
                                    <input type="text" value={c?.title} name="title" onChange={(e) => handleInput(e, "code", i)} className="form-control" />
                                  </div>
                                  <div className="heading_right">
                                    <div className="code_right">
                                      <select className="mx-3" value={c?.language} name="language" onChange={(e) => handleInput(e, "code", i)}>
                                        {language?.map((lang) => (
                                          <option value={lang?.id} key={lang?.id}>{lang?.name}</option>

                                        ))}

                                      </select>
                                      <span onClick={() => delQuestionAns("code", i, 0, 0)}>
                                        <i className="fa fa-trash"></i>
                                      </span>
                                      {/* <i className="fa fa-trash"></i> */}

                                    </div>
                                  </div>
                                </div>
                                <div className="code_instuction">
                                  <input type="text" name="instruction" value={c?.instruction} onChange={(e) => handleInput(e, i, 0)} placeholder="code instruction" />
                                </div>


                                <div className="code_editor">
                                  <CodeEditorWindow
                                    code={code}
                                    onChange={onChange}
                                    language={c?.language}
                                    theme={theme.value}
                                  />
                                </div>

                                <div className="code_save_btn" >
                                  <button onClick={handleCompile}>Run</button>
                                </div>

                                <div className="code_output">
                                  <h4>Code Result </h4>
                                  <OutputWindow outputDetails={outputDetails} />
                                </div>


                              </div>
                            ))
                          }

                          {
                            d.multiple?.map((c: any, index: number) => (
                              < div className="multiple_choice" >
                                <div className="multiple_heading">
                                  <div className="multiple_left">
                                    <h3>Participation Activity</h3>
                                    <input type="text" placeholder="Title" name="title" value={c.title} onChange={(e) => handleInputChoice(e, "multiple", index, 0, 0, 0)} />
                                  </div>
                                  <div className="multiple_right" onClick={() => delQuestionAns("multipl_choice", index, 0, 0)}>
                                    <i className="fa fa-trash" ></i>
                                  </div>
                                </div>
                                <div className="multple_sugest">
                                  <input type="text" name="instruction" value={c.instruction} onChange={(e) => handleInputChoice(e, "multiple", index, 0, 0, 0)} placeholder="Optioanl shared instructions for all questions" />
                                </div>
                                {c?.questions.map((qs: any, i: number) => (
                                  console.log("qs", qs),
                                  <div className="multiple_option">
                                    <div className="row">
                                      <div className="col-md-7" >
                                        <>
                                          <div className="question" key={i}>
                                            {index + 1}) <input type="text" value={qs?.question} name="question" onChange={(e) => handleInputChoice(e, "multiple", index, i, 0, 0)} placeholder="questions" />
                                          </div>
                                          {qs?.options?.map((op, ind) => (
                                            console.log("qs", ind),
                                            <div className="options_data" key={ind}>
                                              <input type="radio" name="checkOption" checked={qs?.checkOption === ind} onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, 0)} />
                                              <input type="text" placeholder="type option" name="option" value={op} onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, 0)} />
                                            </div>
                                          ))}
                                        </>



                                      </div>
                                      <div className="col-md-5">
                                        <div className="right_question_block">
                                          <div className={qs?.choice === "0" ? " on_option  " : qs?.choice === "1" ? " of_option  " : "question_wrapper"}>
                                            <div className={"question_corect"}>
                                              <div className="correct_wrong">
                                                <input type="radio" name="choice" checked={qs?.choice === '0'} onChange={(e) => handleInputChoice(e, "multiple", index, i, 0, 0)} />
                                                <span>Write</span>
                                              </div>
                                              <div className="correct_wrong">
                                                <input type="radio" name="choice" checked={qs?.choice === '1'} onChange={(e) => handleInputChoice(e, "multiple", index, i, 0, 1)} />
                                                <span>wrong</span>

                                              </div>
                                            </div>
                                            <div className="explaination">
                                              <input type="text" placeholder="Explanation" name="choiceDesc" value={qs?.choiceDesc} onChange={(e) => handleInputChoice(e, "multiple", index, i, 0, 0)} />
                                            </div>
                                          </div>
                                          <div className="choice">
                                            choice

                                            <div className="arrows">
                                              <RiArrowDropUpLine style={qs?.options?.length === 5 ? { cursor: 'not-allowed', opacity: '0.2' } : { cursor: 'pointer' }} size={30} onClick={() => InAndDesOpt("inc", index, i)} />
                                              {qs?.options?.length}
                                              <RiArrowDropDownLine size={30} style={qs?.options?.length === 2 ? { cursor: 'not-allowed', opacity: '0.2' } : { cursor: 'pointer' }} onClick={() => InAndDesOpt("desc", index, i)} />
                                              <span onClick={() => delQuestionAns("multipl_question", index, i, 0)}>
                                                <i className="fa fa-trash" ></i>
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                    </div>
                                  </div>
                                ))}
                                <span className="add_ques" onClick={() => addmoreQues("question", 0, 0)}>Add question</span>

                              </div>
                            ))
                          }
                          {
                            d.short?.map((c: any, index: number) => (
                              <div className="multiple_choice">
                                <div className="multiple_heading">
                                  <div className="multiple_left">
                                    <h3>Participation Activity</h3>
                                    {/* <h4>Figure: 1.17.1</h4> */}
                                    <input
                                      type="text"
                                      name="title"
                                      placeholder="title"
                                      value={c?.title}
                                      onChange={(e) => handleInputChoice(e, "short", index, 0, 0, 0)} />
                                  </div>
                                  <div className="multiple_right" onClick={() => delQuestionAns("short", index, 0, 0)}>
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </div>
                                <div className="multple_sugest">
                                  <input type="text"
                                    name="instruction"
                                    placeholder="Optional shared instruction for all questions"
                                    value={c?.instruction}
                                    onChange={(e) => handleInputChoice(e, "short", index, 0, 0, 0)}
                                  />
                                </div>
                                {c?.questions.map((q: any, i: number) => (
                                  <div className="multiple_option">
                                    <div className="row">
                                      <div className="col-md-7" >
                                        <>
                                          <div className="question">
                                            {index + 1})
                                            <input type="text"
                                              name="question"
                                              placeholder="Type question prompt"
                                              value={q?.question}
                                              onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                            />

                                          </div>
                                          {q?.answers.map((ans: any, ind: number) => (
                                            <div className="options_data">
                                              <input type="text"
                                                value={ans}
                                                name="answer"
                                                style={{ border: '1pt solid lightgray', width: '80%', marginRight: '10px' }} placeholder="type option"

                                                onChange={(e) => handleInputChoice(e, "short", index, i, ind, 0)}
                                              />

                                              <span onClick={() => delQuestionAns("short_answer", i, index, ind)}>
                                                <i className="fa fa-close "></i>
                                              </span>
                                            </div>

                                          ))}

                                        </>


                                        <span className="add_ques mx-3" onClick={() => addmoreQues("short_answer", i, index)}>Add Answer </span>


                                      </div>
                                      <div className="col-md-5">
                                        {q?.length !== 1 &&
                                          <span onClick={() => delQuestionAns("short_question", i, index, 0)}>
                                            <i className="fa fa-trash" ></i>
                                          </span>
                                        }
                                        <div className="right_question_block mx-2">
                                          <div className="question_wrapper incorrect" >
                                            <div className="question_corect">
                                              Incorrect
                                            </div>
                                            <div className="explaination">
                                              <input
                                                type="text"
                                                name="incorrect"
                                                value={q?.incorrect}
                                                onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                                placeholder="Explanation" />
                                            </div>
                                          </div>

                                        </div>
                                        <div className="right_question_block mx-2 my-2">
                                          <div className="question_wrapper correct">
                                            <div className="question_corect">
                                              Correct
                                            </div>
                                            <div className="explaination">
                                              <input type="text"
                                                name="correct"
                                                value={q?.correct}
                                                onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                                placeholder="Explanation" />
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </div>
                                  </div>
                                ))}
                                <span className="add_ques" onClick={() => addmoreQues("short_question", 0, 0)}>Add question</span>

                              </div>
                            ))}

                          {
                            d.images?.map((im: any, i: number) => (
                              <div className="table_section">
                                <div className="table_heading">
                                  <div className="heading_left">
                                    <h3>Figure 1.17.3</h3>

                                    <input type="text" name="title" value={im?.title} onChange={(e) => handleFiles(e, "images", i)} className="form-control" placeholder="Title" />
                                  </div>
                                  <div className="heading_right" onClick={() => delQuestionAns("images", i, 0, 0)}>
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </div>
                                {im?.file ? <div>
                                  <img src={im?.file} className="image_show" alt="slected_image" />
                                </div>
                                  :
                                  <div className="add_image">
                                    <span>Drag and drop images onto this area to upload them or
                                      <label htmlFor="file_img">
                                        <span id="image_upload">Click to add an Image</span>
                                      </label>
                                    </span>
                                    <input type="file" style={{ display: 'none' }} id="file_img" name="file" accept="/images" onChange={(e) => handleFiles(e, "images", i)} />
                                  </div>
                                }

                              </div>
                            ))}


                          {
                            d.videos?.map((v: any, i: number) => (
                              <div className="table_section">
                                <div className="table_heading">
                                  <div className="heading_left">
                                    <h3>Figure 1.17.3</h3>

                                    <input type="text" name="title" value={v?.title} onChange={(e) => handleFiles(e, "videos", i)} className="form-control" placeholder="Title" />
                                  </div>
                                  <div className="heading_right" onClick={() => delQuestionAns("videos", i, 0, 0)}>
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </div>
                                {v?.url ?
                                  <div className="video_player">
                                    <ReactPlayer url={v?.url} width="50%" height={300} />
                                  </div>
                                  :
                                  <div className="add_video">
                                    <input type="text" name="url" value={v?.url} onChange={(e) => handleFiles(e, "videos", i)} className="form-control" placeholder="Video upload" />
                                    <button >Add</button>
                                  </div>
                                }
                              </div>
                            ))}

                          {
                            d.codes?.map((c: any, i: number) => (
                              <div className="code_block">
                                <div className="table_heading">
                                  <div className="heading_left">
                                    <h3>Figure 1.17.3</h3>
                                    <input type="text" className="form-control" placeholder="Title" />
                                  </div>
                                  <div className="heading_right">
                                    <div className="code_right">
                                      <select className="mx-3 ">
                                        <option>c++</option>
                                      </select>
                                      <span onClick={() => delQuestionAns("codes", i, 0, 0)}>
                                        <i className="fa fa-trash"></i>

                                      </span>

                                    </div>
                                  </div>
                                </div>

                                <div className="code_editor">
                                  <CodeEditorWindow
                                    code={code}
                                    onChange={onChange}
                                    language={language?.value}
                                    theme={theme.value}
                                  />
                                </div>




                              </div>
                            ))}
                        </>
                      ))}

                    </div>
                  </div>
                </div>

              </div>
              <div className="section_bottom">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-9">
                    <div className="footer_contents">
                      <div className="left_footers" >
                        {sectionData?.some((s:any ) => s.text.length || s.code.length || s.multiple.length || s.short.length || s.images.length || s.videos.length || s.codes.length) > 0  ?
                          <>
                            <button className="save_publish">Save and publish</button>
                            <span className="save_draft">Save and publish</span>
                            <span className="cancel">Cancel</span>

                          </>
                          :
                          <span className="cancel">Cancel</span>
                        }
                      </div>
                      <div className="right_footers">
                        <span className="preview">Student view</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1"></div>

                </div>
              </div>
            </div>
          </div>
        }
      </section >
    </div >
  );
};

export default withAuth(Home);


