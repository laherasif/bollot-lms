import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import { Breadcrumb, Spinner, } from "react-bootstrap"
// import moment from "moment";
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri'
import withAuth from "../../../../src/components/Hoc/authRoute";
import CkEditor from "../../../../src/components/instructor/sectionEditor";
// import CodeEditorWindow from "../../../../src/components/instructor/codeEditor";
import { myBucket, S3_BUCKET } from "../../../../src/confiq/aws/aws";
import { SweetAlert } from "../../../../src/function/hooks";
import useKeyPress from "../../../../src/components/Hoc/useKeyPress";
import { useRouter } from "next/router";
import OutputWindow from "../../../../src/components/instructor/codeResult";
import {
  addQuestionsAnswers, addSectionsValues,
  sectionClear,
  createCodeEditor, createCodes, createImage, createMultipleChoice, createShortQuestion, createTable, createText, createVideo, deleQuestionAnwser, IncDescOptions
} from "../../../../src/redux/actions/instructor/zybooks";
import ReactPlayer from "react-player";
import Editor from "@monaco-editor/react";
const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [uploadVideo, setUploadVideo] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [code, setCode] = useState(null);
  const [codeFile, setCodeFile] = useState('');
  const [videoFile, setVideoFile] = useState('');
  const [url, setUrl] = useState('')
  const [selectLanguage, setselectLanguage] = useState(null);
  const [loader, setLoader] = useState(false)
  const [lecture, setLectures] = useState({})
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState([]);
  const [table, setTable] = useState(false)
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");


  const [data, setData] = useState({
    full_content: '',

  });
  useEffect(() => {
    // setLoading(true)
    setEditorLoaded(true);

  }, [editorLoaded])




  const router = useRouter()

  const dispatch = useDispatch()

  const { token } = useSelector((state: RootStateOrAny) => state.userReducer)
  const sections = useSelector((state: RootStateOrAny) => state.createSection)
  let sectionData = sections.section

  const AxInstance = axios.create({
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  let courseSectionId = router.query.courseId
  let sectionId = router.query.sectionId

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


  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: sectionData.find((item) => item.name === "code").codesValue.language,
      source_code: btoa(sectionData.find((item) => item.name === "code").codesValue.code),
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
        console.log("token", token)
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


  // const handleCodeFile = async (file: any) => {
  //   debugger
  //   setCodeFile(file?.name)
  //   const params = {
  //     ACL: 'private',
  //     Body: file,
  //     Bucket: S3_BUCKET,
  //     Key: file?.name
  //   };
  //   myBucket.putObject(params, function (perr, pres) {
  //     if (perr) {
  //     } else {
  //       console.log("Successfully uploaded data to " + pres);
  //     }
  //   })
  //   // }
  // }


  const addEvent = (type: string) => {
    setCodeFile(type)
    setUploadVideo(false)
    switch (type) {
      case "text":
        // setEditorLoaded(true);
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


  const addmoreQues = (type: string, pIndex: number, cIndex: number, ccIndex: number) => {
    let values = {
      pIndex: pIndex,
      cIndex: cIndex,
      ccIndex: ccIndex
    }
    dispatch(addQuestionsAnswers(type, values))

  }


  const delQuestionAns = (name: string, pIndex: number, cIndex: number, ccIndex: number, cccIndex: number) => {

    let value = {
      name: name,
      pIndex: pIndex,
      cIndex: cIndex,
      ccIndex: ccIndex,
      cccIndex: cccIndex
    }

    dispatch(deleQuestionAnwser(value))
  }

  // increase and descrese options

  const InAndDesOpt = (type: string, pIndex: number, cIndex: number, ccIndex: number) => {
    dispatch(IncDescOptions(type, pIndex, cIndex, ccIndex))
  }


  const handleInputCkEditor = (name: string, index: number, data: any) => {

    let values = {
      value: data,
      index: index,
      targetName: name
    }

    dispatch(addSectionsValues({ name, values }))

  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
    let values = {
      value: e.target.value,
      index: index,
      targetName: e.target.name
    }

    if (e.target.name === "language") {
      setselectLanguage(e.target.value)
    }
    dispatch(addSectionsValues({ name, values }))

  }

  const handleInputChoice = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number, i: number, ccIndex: number, checkValue: number) => {
    if (e.target.name === "checkOption") {
      let values = {
        value: checkValue,
        index: index,
        i: i,
        ccIndex: ccIndex,
        cccIndex: checkValue,
        targetName: e.target.name
      }
      dispatch(addSectionsValues({ name, values }))

    }
    else {

      let values = {
        value: e.target.name === "choice" ? checkValue : e.target.value,
        index: index,
        i: i,
        ccIndex: ccIndex,
        cccIndex: checkValue,
        targetName: e.target.name
      }
      dispatch(addSectionsValues({ name, values }))
    }


  }



  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {


    let files: any = e.target.files;
    if (files) {
      let file = files ? files[0] : null;
      let url = URL.createObjectURL(file);
      setUrl(url)
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
      let values = {
        value: file?.name,
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


  const editorRef = useRef()
  // const [ editorLoaded, setEditorLoaded ] = useState( false )
  const { CKEditor, ClassicEditor }: any = editorRef.current || {}

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }

  useEffect(() => {


    scrollToBottom()
  }, [codeFile])


  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }

    setEditorLoaded(true)
  }, [])


  const AddVideo = (name: any, index: number) => {

    let values = {
      value: videoFile,
      i: index,
      targetName: "url"
    }
    dispatch(addSectionsValues({ name, values }))
    setVideoFile('')
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    let formData = {
      course_section_id: sectionId,
      lecture: {
        contents: sectionData
      }
    }
    try {
      const res = await AxInstance.post("api//instructor/courses/curriculum/lectures/store", formData);
      if (res.data.success) {
        setLoader(false);
        SweetAlert({ icon: "success", text: res.data.message })
        dispatch(sectionClear())
        router.push(`/en/instructor/createSection?courseId=${courseId}`)
        return;
      }
      else {
        setLoader(false);
        SweetAlert({ icon: "error", text: res.data.message })
        return;
      }
    } catch (err) {
      setLoading(false);
      SweetAlert({ icon: "error", text: err })
    }
  }








  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        {loading ? Small() :
          <div className="inst container-fluid">

            <div className="wrapper_container_section">
              <div className="row first_row " style={{ position: 'relative' }} >
                <div className="col-md-2">
                  <div className="content_wrapper" style={{ position: 'sticky', top: '50px' }}>
                    <div className="content_up"></div>
                    <div className="content_down">
                      <div className="content_down_wrapper">
                        <div className="add_text">
                          <h3>Add content <i className="fa fa-caret-down"></i></h3>
                          <span onClick={() => addEvent("text")}>Text Block</span>
                          {/* <span onClick={() => addEvent("table")}>Table</span> */}
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
                  <div className="mt-4">
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href={`/en/instructor/courseDetail/${courseSectionId}`}>Course Detail</Breadcrumb.Item>
                      <Breadcrumb.Item active>Create Lecture </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>

                  <div className="section_wrapper " style={{ marginRight: '20px', marginBottom: '50px' }} >


                    <div className="section_container" ref={messagesEndRef} >
                      {sectionData && sectionData.map((d: any, index: number) => (
                        <>
                          <>
                            {d?.name === "title" &&
                              <>
                                <h3 style={{ fontSize: '16px' }}>Section Title</h3>
                                <div className="content_section">
                                  <CkEditor
                                    name="description"
                                    value={d?.value}
                                    onChange={(data) => {
                                      handleInputCkEditor("value", index, data)
                                    }}
                                    editorLoaded={editorLoaded}
                                  />
                                  {/* <input type="text" value={d.title} onChange={(e) => handleInput(e, "title", index)} name="title" className="form-control" placeholder="Section Title" /> */}
                                </div>
                              </>
                            }
                            {
                              d?.name === "text" &&
                              // d.text?.map((tx: any, index: number) => (
                              <>
                                <h3 style={{ marginTop: '30px', fontSize: '15px' }}>Text Block</h3>
                                <div className="text_block">
                                  <div className="content_section">


                                    {editorLoaded ? (
                                      <CKEditor
                                        type=""
                                        // name={name}
                                        editor={ClassicEditor}
                                        style={{ height: "10%" }}
                                        data={d?.textValue}

                                        config={{
                                          // extraPlugins: [uploadPlugin],
                                          // plugins: [ Bold,],
                                          // toolbar: ['heading' ,'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'  , 'insertTable'],
                                          toolbar: [
                                            'heading', '|',
                                            'fontfamily', 'fontsize', '|',
                                            'alignment', '|',
                                            'fontColor', 'fontBackgroundColor', '|',
                                            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                                            'link', '|',
                                            'outdent', 'indent', '|',
                                            'bulletedList', 'numberedList', 'todoList', '|',
                                            'code', 'codeBlock', '|',
                                            'insertTable', '|',
                                            // 'uploadImage', 'blockQuote', '|',
                                            'undo', 'redo'
                                          ]
                                        }}
                                        onChange={(event, editor) => {
                                          const data = editor.getData();
                                          if (event) {
                                            handleInputCkEditor("textValue", index, data)
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div>Editor loading</div>
                                    )}
                                  </div>
                                  <span onClick={() => delQuestionAns("text", index, 0, 0, 0)}>
                                    <i className="fa fa-trash" ></i>
                                  </span>
                                </div>
                              </>
                              // ))
                            }


                          </>


                          {
                            // d.code?.map((c: any, i: number) => (
                            d?.name === "code" &&

                            <div className="code_block">
                              <div className="table_heading">
                                <div className="heading_left">
                                  <h3 style={{ fontSize: '15px' }}>CodeEditor </h3>
                                  <input type="text" value={d?.codesValue?.title} name="title"
                                    onChange={(e) => handleInput(e, "code", index,)}
                                    placeholder="Title"
                                    className="form-control" />
                                </div>
                                <div className="heading_right">
                                  <div className="code_right">
                                    <select className="mx-3" value={d?.codesValue?.language} name="language" onChange={(e) => handleInput(e, "code", index)}>
                                      {language?.map((lang) => (
                                        <option value={lang?.id} key={lang?.id}>{lang?.name}</option>

                                      ))}

                                    </select>
                                    <span onClick={() => delQuestionAns("code", index, 0, 0, 0)}>
                                      <i className="fa fa-trash"></i>
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div className="code_instuction">
                                <input type="text" name="instruction" value={d?.codeValue?.instruction} onChange={(e) => handleInput(e, "code", index,)}
                                  placeholder="Instruction for running code" />
                              </div>


                              <div className="code_editor">
                                <div className="w-100 ">
                                  <Editor
                                    height="50vh"
                                    language={d?.codesValues?.language}
                                    value={d?.codeValue?.code}
                                    theme={theme}
                                    onChange={(data) => {
                                      // setData({ ...data, full_content: data })
                                      handleInputCkEditor("code", index, data)

                                    }}
                                  />
                                </div>
                              </div>

                              <div className="code_save_btn" >
                                <button onClick={handleCompile}>Run</button>
                              </div>

                              <div className="code_output">
                                <h4>Code Result </h4>
                                <OutputWindow outputDetails={outputDetails} />
                              </div>


                            </div>
                            // ))
                          }

                          {
                            d?.name === "multiple" &&
                            d.questionValue?.map((c: any, i: number) => (
                              < div className="multiple_choice" >
                                <div className="multiple_heading">
                                  <div className="multiple_left">
                                    <h3>Participation Activity</h3>
                                    <input type="text" placeholder="Title" name="title" value={c.title} onChange={(e) => handleInputChoice(e, "multiple", index, 0, 0, 0)} />
                                    <span className="right_border"></span>
                                  </div>
                                  <div className="multiple_right" onClick={() => delQuestionAns("multiple", index, 0, 0, 0)}>
                                    <i className="fa fa-trash" ></i>
                                  </div>
                                </div>
                                <div className="multple_sugest">
                                  <input type="text" name="instruction" value={c.instruction} onChange={(e) => handleInputChoice(e, "multiple", index, 0, 0, 0)} placeholder="Optioanl shared instructions for all questions" />
                                </div>
                                {c?.questions.map((qs: any, ind: number) => (
                                  <div className="multiple_option">
                                    <div className="row">
                                      <div className="col-md-7" >
                                        <>
                                          <div className="question" key={ind}>
                                            {i + 1}) <input type="text" value={qs?.question} name="question" onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, 0)} placeholder="questions" />
                                          </div>
                                          {qs?.options?.map((op: any, opIndex: number) => (
                                            <div className="options_data" key={opIndex}>
                                              <input type="checkbox" value={qs?.checkOption} name="checkOption" checked={qs?.checkOption === opIndex} onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, opIndex)} />
                                              <input type="text" placeholder="type option" name="option" value={op} onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, opIndex)} />
                                            </div>
                                          ))}
                                        </>



                                      </div>
                                      <div className="col-md-5">
                                        <div className="right_question_block">
                                          {qs?.checkOption !== '' &&
                                            <div className={qs?.choice === 1 ? " on_option  " : qs?.choice === 0 ? " of_option  " : "question_wrapper"}>
                                              <div className="question_corect">
                                                <div className="correct_wrong">
                                                  <input type="checkbox" name="choice" checked={qs?.choice === 0} onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, 0)} />
                                                  <span>Incorrect</span>
                                                </div>
                                                <div className="correct_wrong mx-5" >
                                                  <input type="checkbox" name="choice" checked={qs?.choice === 1} onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, 1)} />
                                                  <span>Correct</span>

                                                </div>
                                              </div>
                                              <div className="explaination">
                                                <input type="text" placeholder="Explanation" name="choiceDesc" value={qs?.choiceDesc} onChange={(e) => handleInputChoice(e, "multiple", index, i, 0, 0)} />
                                              </div>
                                            </div>
                                          }
                                          <div className={" choice"}  >
                                            choice

                                            <div className="arrows">
                                              <RiArrowDropUpLine style={qs?.options?.length === 5 ? { cursor: 'not-allowed', opacity: '0.2' } : { cursor: 'pointer' }} size={30} onClick={() => InAndDesOpt("inc", index, i, ind)} />
                                              {qs?.options?.length}
                                              <RiArrowDropDownLine size={30} style={qs?.options?.length === 2 ? { cursor: 'not-allowed', opacity: '0.2' } : { cursor: 'pointer' }} onClick={() => InAndDesOpt("desc", index, i, ind)} />
                                              <span onClick={() => delQuestionAns("multiple_question", index, i, ind, 0)}>
                                                <i className="fa fa-trash" ></i>
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                    </div>
                                  </div>
                                ))}
                                <span className="add_ques" onClick={() => addmoreQues("question", index, i, 0)}>Add question</span>

                              </div>
                            ))
                          }
                          {
                            // d.short?.map((c: any, index: number) => (
                            d?.name === "short" &&
                            d.shortValue?.map((s: any, i: number) => (
                              <div className="multiple_choice">
                                <div className="multiple_heading">
                                  <div className="multiple_left">
                                    <h3>Participation Activity</h3>
                                    <input type="text" placeholder="Title" name="title" value={s?.title} onChange={(e) => handleInputChoice(e, "short", index, 0, 0, 0)} />
                                    <span className="right_border"></span>
                                  </div>
                                  <div className="multiple_right" onClick={() => delQuestionAns("short", index, 0, 0, 0)}>
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </div>
                                <div className="multple_sugest">
                                  <input type="text"
                                    name="instruction"
                                    placeholder="Optional shared instruction for all questions"
                                    value={s?.instruction}
                                    onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                  />
                                </div>
                                {s?.questions?.map((q: any, ind: number) => (
                                  <div className="multiple_option">
                                    <div className="row">
                                      <div className="col-md-7" >
                                        <>
                                          <div className="question">
                                            {i + 1})
                                            <input type="text"
                                              name="question"
                                              placeholder="Type question prompt"
                                              value={s?.question}
                                              onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                            />

                                          </div>
                                          {q?.answers?.map((ans: any, aIndex: number) => (
                                            <div className="options_data">
                                              <input type="text"
                                                value={ans}
                                                name="answer"
                                                style={{ border: '1pt solid lightgray', width: '80%', marginRight: '10px' }} placeholder="type option"

                                                onChange={(e) => handleInputChoice(e, "short", index, i, ind, aIndex)}
                                              />

                                              <span onClick={() => delQuestionAns("short_answer", index, i, ind, aIndex)}>
                                                <i className="fa fa-close "></i>
                                              </span>
                                            </div>

                                          ))}

                                        </>


                                        <span className="add_ques mx-3" onClick={() => addmoreQues("short_answer", index, i, ind)}>Add Answer </span>


                                      </div>
                                      <div className="col-md-5">
                                        {s?.length !== 1 &&
                                          <span onClick={() => delQuestionAns("short_question", index, i, ind, 0)}>
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
                                                value={s?.incorrect}
                                                onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                                placeholder="(Required) hint for an incorrect submittion" />
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
                                                value={s?.correct}
                                                onChange={(e) => handleInputChoice(e, "short", index, i, 0, 0)}
                                                placeholder="(Required) Explaination for an incorrect submittion" />
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </div>
                                  </div>
                                ))}
                                <span className="add_ques" onClick={() => addmoreQues("short_question", index, 0, 0)}>Add question</span>

                              </div>
                            ))
                          }

                          {
                            // d.images?.map((im: any, i: number) => (
                            d?.name === "images" &&
                            <div className="table_section">
                              <div className="table_heading">
                                <div className="heading_left">


                                  <input type="text" name="title" value={d.imageValue?.title} onChange={(e) => handleFiles(e, "images", index)} className="form-control" placeholder="Title" />
                                </div>
                                <div className="heading_right" onClick={() => delQuestionAns("images", index, 0, 0, 0)}>
                                  <i className="fa fa-trash"></i>
                                </div>
                              </div>
                              {url ? <div>
                                <img src={url} className="image_show" alt="slected_image" />
                              </div>
                                :
                                <div className="add_image">
                                  <span>Drag and drop images onto this area to upload them or
                                    <label htmlFor="file_img">
                                      <span id="image_upload" style={{ cursor: 'pointer' }}>Click to add an Image</span>
                                    </label>
                                  </span>
                                  <input type="file" style={{ display: 'none', }} id="file_img" name="file" accept="/images" onChange={(e) => handleFiles(e, "images", index)} />
                                </div>
                              }

                            </div>
                            // ))
                          }


                          {
                            // d.videos?.map((v: any, i: number) => (
                            d?.name === "videos" &&
                            <div className="table_section">
                              <div className="table_heading">
                                <div className="heading_left">

                                  <input type="text" name="title" value={d?.videoValue?.title} onChange={(e) => handleFiles(e, "videos", index)} className="form-control" placeholder="Title" />
                                </div>
                                <div className="heading_right" onClick={() => delQuestionAns("videos", index, 0, 0, 0)}>
                                  <i className="fa fa-trash"></i>
                                </div>
                              </div>
                              {d.videoValue?.url ?
                                <div className="video_player">
                                  <ReactPlayer url={d.videoValue?.url} width="50%" height={300} />
                                </div>
                                :
                                <div className="add_video">
                                  <input type="text" name="url" value={videoFile} onChange={(e) => setVideoFile(e.target.value)} className="form-control" placeholder="Video upload" />
                                  <button onClick={() => AddVideo("video", index)} >Add</button>
                                </div>
                              }
                            </div>
                            // ))
                          }

                          {
                            // d.codes?.map((c: any, i: number) => (
                            d?.name === "codes" &&
                            <div className="code_block">
                              <div className="table_heading">
                                <div className="heading_left">
                                  <h3 style={{ fontSize: '15px' }}>CodeEditor </h3>
                                  <input type="text" value={d?.codeValue?.title} name="title"
                                    onChange={(e) => handleInput(e, "codes", index,)}
                                    placeholder="Title"
                                    className="form-control" />
                                </div>
                                <div className="heading_right">
                                  <div className="code_right">
                                    <select className="mx-3" value={d?.codeValue?.language} name="language" onChange={(e) => handleInput(e, "codes", index)}>
                                      {language?.map((lang) => (
                                        <option value={lang?.id} key={lang?.id}>{lang?.name}</option>

                                      ))}

                                    </select>
                                    <span onClick={() => delQuestionAns("codes", index, 0, 0, 0)}>
                                      <i className="fa fa-trash"></i>
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div className="code_instuction">
                                <input type="text" name="instruction" value={d?.codeValue?.instruction} onChange={(e) => handleInput(e, "codes", index,)}
                                  placeholder="Instruction for running code" />
                              </div>


                              <div className="code_editor">
                                <div className="w-100 ">
                                  <Editor
                                    height="50vh"
                                    language={d?.codeValue?.language}
                                    value={d?.codeValue?.code}
                                    theme={theme}
                                    onChange={(data) => {
                                      // setData({ ...data, full_content: data })
                                      handleInputCkEditor("codes", index, data)

                                    }}
                                  />
                                </div>
                              </div>


                            </div>
                            // ))
                          }
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
                        {/* {sectionData?.some((s:any ) => s.text.length || s.code.length || s.multiple.length || s.short.length || s.images.length || s.videos.length || s.codes.length) > 0  ? */}
                        <>
                          <button className="save_publish" onClick={(e) => handleSubmit(e)}>
                            {loader ? <Spinner animation="border" variant="light" /> : "Save & Publish"}
                          </button>
                          <Link href={`/en/instructor/courseDetail/${courseSectionId}`}>
                            <span className="cancel"style={{cursor:'pointer'}}>Cancel</span>
                          </Link>

                        </>
                        {/* :
                          <span className="cancel">Cancel</span>
                        } */}
                      </div>
                      <div className="right_footers">
                        {/* <span className="preview">Student view</span> */}
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


