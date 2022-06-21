import type { NextPage } from "next";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar2 from "../../../../src/components/student/NavigationBar2";
import { useEffect, useState } from "react";
import axios from "axios";
import CriculumCard from '../../../../src/components/student/criculumCard'
import Link from "next/link";
import Conversation from "../../../../src/components/student/messageForm";
import CricculumSidebar from "../../../../src/components/student/cricculumSidebar";
import { SweetAlert } from "../../../../src/function/hooks";
import CodeEditorWindow from "../../../../src/components/student/codeEditor";
import useKeyPress from "../../../../src/components/Hoc/useKeyPress";
import OutputWindow from "../../../../src/components/student/codeResult";
import { Form } from "react-bootstrap";
import { RootStateOrAny, useSelector } from "react-redux";
import { Small } from "../../../../src/components/student/loader";
import withAuth from "../../../../src/components/Hoc/authRoute";

const Home: NextPage = () => {

  const [code, setCode] = useState(null);
  const [selectLanguage, setselectLanguage] = useState({});
  const [loading, setLoading] = useState(true)
  const [courseId, setCourseId] = useState('')
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState([]);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (e) => {
    let lang = language[e.target.value]
    setselectLanguage(lang);
  };

  // const { Lectures } = useSelector((state: RootStateOrAny) => state.studentCourse)


  useEffect(() => {


    setTimeout(() => {
      setLoading(false)

    }, 2000);

    let fetchLanuage = async () => {
      const options: Object = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages',
        headers: {
          'X-RapidAPI-Key': 'dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
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
      language_id: selectLanguage.id,
      source_code: btoa(code),
    };
    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
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
        console.log("Err", err)
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
        'X-RapidAPI-Key': 'dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
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
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();
    }
  };



  return (
    <>
      <NavigationBar2 />
      {loading ? Small() :
        <section className="dash-board">
          <div className="dash-board-1">
            <div className="aksldnsd-sdnaskdse">

              <CricculumSidebar
              // lecture={(value: any) => setLectures(value)}
              // courseId={(value: any) => setCourseId(value)}
              />
            </div>




            <div className="w-100">
              <div className="sad-ds-asajd">
                <div className="dash-2 m-0">
                  <div className="my-course">
                    <TopNavbar />
                  </div>
                </div>
              </div>
              <div className="my-course jdsad-snd">



                {/* {lectures.length ?
                <CriculumCard lectures={lectures}  CourseId={Lectures?.id}  />
                :

                <> */}

                <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
                  <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '350px' }}>
                      <Form.Select onChange={(e) => onSelectChange(e)}>
                        <option>Select Language </option>

                        {language && language.map((lang: any, index: number) => (
                          <option value={index} key={lang?.id}>{lang?.name}</option>
                        ))}
                      </Form.Select>
                    </div>

                    <button className="btn-1s mx-2" onClick={handleCompile} >

                      {processing ? "Processing..." : "Compile and Execute"}

                    </button>
                  </div>
                  <div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="card-daskfj-e " style={{ padding: '0px', width: '50%' }}>
                    <div className="user-card-inbox ">
                      <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme.value}
                      />

                    </div>
                    {/* <div className="spinner-chatbox">
                    <Spinner animation="border" />
                  </div> */}



                  </div>
                  <div className="card-daskfj-e " style={{ padding: '0px 2px ', width: '50%' }}>


                    <div className="user-card-inbox mt-0"  >
                      <OutputWindow outputDetails={outputDetails} />
                    </div>

                  </div>







                </div>

                {/* </>
              } */}


              </div>
            </div>
          </div>

        </section>
      }
    </>
  );
};


export default withAuth( Home );
