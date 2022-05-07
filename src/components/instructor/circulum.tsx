import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import Icons from "../../insIcons";
import { useState, useEffect, useRef, useCallback } from "react";
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import Secdule from "./secdule";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { S3_BUCKET, myBucket } from "../../confiq/aws/aws";
import { generateVideoThumbnail, SweetAlert } from "../../function/hooks";

export default ({ courseId, onStepChange, onPrevStep, step }: any) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumb, setTumb] = useState();
  const [videos, setVideos] = useState();
  const [aswVideoSrc, setAwsVideoSrc] = useState([]);
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [err, setErr] = useState();
  const [section, setSection] = useState([{
    title: "",
    lectures: [
      {
        title: "",
        file_type: "",
        object_key: "",
        thumbnail: "",
        progressbar: "",
      },
    ],
  },]);

  const token = useSelector(
    (state: RootStateOrAny) => state?.userReducer?.token
  );

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });

  const AddmoreSection = () => {
    setSection([
      ...section,
      {
        title: "",
        lectures: [
          {
            title: "",
            file_type: "",
            object_key: "",
            thumbnail: "",
            progressbar: "",
          },
        ],
      },
    ]);
  };

  const handleChangeSection = (
    index: number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evnt.target;
    const lists: any = [...section];
    lists[index][name] = value;
    setSection(lists);
  };

  const handleChangeLecture = (
    index: number,
    i: number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    debugger;
    const { name, value } = evnt.target;

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i][name] = value;
      }
    }
    setSection(lists);
  };

  const handleChangeLectureFile = async (
    index: number,
    i: number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: any = evnt.target.files[0];
    if (!file.name.match(/.(mp4|pdf)$/i)) {
      SweetAlert({
        icon: "error",
        text: "please select only video or pdf files ",
      });
    } else if (file.type === "video/mp4") {
      const thumbnail: any = await generateVideoThumbnail(file);

      const params = {
        ACL: "private",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          if (evt.loaded && evt.total) {
            let prog = Math.round((evt.loaded / evt.total) * 100);
            const list: any = [...section];
            for (let j = 0; j < list.length; j++) {
              if (j === index) {
                const element = list[j];
                element.lectures[i].thumbnail = thumbnail;
                element.lectures[i].progressbar = prog;
                element.lectures[i].file_type = "Video";
                element.lectures[i].object_key = file.name;
              }
            }
            setSection(list);
          } else {
            SweetAlert({
              icon: "error",
              text: "please check your internet connection",
            });
          }
        })
        .send((err) => {
          if (err) {
            SweetAlert({ icon: "error", text: err });
          }
        });
    } else {
      const params = {
        ACL: "private",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          if (evt.loaded && evt.total) {
            let prog = Math.round((evt.loaded / evt.total) * 100);
            const list: any = [...section];
            for (let j = 0; j < list.length; j++) {
              if (j === index) {
                const element = list[j];
                element.lectures[i].thumbnail =
                  "data:image/png;base64,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";
                element.lectures[i].progressbar = prog;
                element.lectures[i].file_type = "PDF";
                element.lectures[i].object_key = file.name;
              }
            }
            setSection(list);
          } else {
            SweetAlert({
              icon: "error",
              text: "please check your internet connection",
            });
          }
        })
        .send((err, data) => {
          if (err) {
            SweetAlert({ icon: "error", text: err });
          }
        });
    }
  };

  const AddmoreLecture = (index: number) => {
    const lists: any = [...section];
    for (let i = 0; i < lists.length; i++) {
      if (i === index) {
        const element = lists[i];
        element?.lectures.push({ title: "", file_type: "", file_url: "" });
      }
    }
    setSection(lists);
  };
  const SaveCriculum = async () => {
    let arr = [];
    for (let index = 0; index < section.length; index++) {
      const element = section[index];
      for (let j = 0; j < element.lectures.length; j++) {
        const elements = element.lectures[j];
        let regex = /data:.*base64,/;
        let checks = elements.thumbnail.replace(regex, "");
        let regexBase64 =
          /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        let check = regexBase64.test(checks);
        elements.thumbnail = check ? elements.thumbnail : "";
      }
      arr.push(element);
    }

    let saveCri = {
      course_id: courseId,
      sections: arr,
    };

    try {
      setLoading(true);
      let res = await AxInstance.post(
        "api//instructor/courses/curriculum/store",
        saveCri
      );
      if (res.data.success === true) {
        setLoading(false);
        onStepChange()
        // SweetAlert({
        //   icon: "success",
        //   text: "Criculum are Successfully saved",
        // });
      } else {
        setLoading(false);
        // setErrors(res.data.error)
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const removeInputFields = (index: number, i: number) => {
    debugger;

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        let find = element.lectures;
        find.splice(i, 1);
      }
    }
    setSection(lists);
  };

  const removeInputField = (index: number) => {
    const row = [...section];
    row.splice(index, 1);
    setSection(row);
  };

  let red = section?.some((ac) =>
    ac.lectures.some((sa) => sa.progressbar < 100)
  );

  return (
    <>
      <div className="p-fields">
        <div className="row">
          <h4 className="mb-2">Plane Your Course </h4>
          <div className="col-12 col-md-6 mt-13 col-md-offset-1 ">
            <div
              data-cy="button-box"
              id="up-button-box"
              className={`up-button-box ${
                type === 0 ? "up-button-box  up-button-box-radio active" : ""
              } `}
              style={{ height: "100%" }}
              onClick={() => setType(0)}
            >
              <div className="up-radio">
                <label className="up-checkbox-label" htmlFor="up-button-box">
                  <input
                    type="radio"
                    checked={type === 0}
                    name="student"
                    onChange={(e) => setType(0)}
                  />
                  <span className="up-checkbox-replacement-helper">
                    {/**/} {/**/}{" "}
                  </span>{" "}
                </label>
              </div>{" "}
              <div className="up-illustrations">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 145 130"
                  aria-hidden="true"
                  role="img"
                >
                  <polygon
                    points="145,18.601 73.396,10.394 72.487,18.338 71.58,10.422 0,18.622 12.049,123.807	72.489,116.884 132.95,123.809"
                    fill="var(--illustration-color-13, #e8f1e8)"
                  />
                  <rect
                    x="28.472"
                    width="88.055"
                    height={130}
                    fill="var(--illustration-color-1, #d5e0d5)"
                  />
                  <rect
                    x="46.352"
                    y="99.789"
                    width="53.601"
                    height="16.229"
                    fill="var(--illustration-color-2, #14a800)"
                  />
                  <path
                    d="M98.925 40.338c0 14.554-11.802 26.361-26.354 26.361-14.56 0-26.36-11.807-26.36-26.361 0-14.552 11.801-26.355 26.36-26.355 14.552 0 26.354 11.804 26.354 26.355"
                    fill="var(--illustration-color-11, #f7faf7)"
                  />
                  <path
                    d="M81.664 37.781c0 4.764-3.865 8.633-8.626 8.633-4.769 0-8.629-3.869-8.629-8.633 0-4.763 3.86-8.633 8.629-8.633 4.761 0 8.626 3.87 8.626 8.633m-.971 9.439a12.184 12.184 0 01-6.476 2.661c-.396.043-.791.078-1.19.078-.402 0-.798-.035-1.194-.081a12.085 12.085 0 01-6.457-2.666A18.452 18.452 0 0055.05 59.997c4.66 4.154 10.781 6.706 17.519 6.706 7.108 0 13.541-2.832 18.285-7.409A18.44 18.44 0 0080.693 47.22"
                    fill="var(--illustration-color-15, #9aaa97)"
                  />
                  <path
                    d="M109.936 122.305l-6.063-6.059 5.198-3.309c.128-.121.063-.34-.11-.385l-18.143-6.512a.227.227 0 00-.281.271l6.518 18.149c.04.177.262.235.387.106l3.31-5.189 6.056 6.053c.16.162.424.162.584 0l2.545-2.545a.411.411 0 00-.001-.58z"
                    fill="var(--white, #ffffff)"
                  />
                  <path
                    d="M96.029 80.154H48.971a1.568 1.568 0 110-3.136H96.03c.867 0 1.566.701 1.566 1.568s-.7 1.568-1.567 1.568zm-3.102 9.319H52.075a1.568 1.568 0 110-3.135h40.852a1.567 1.567 0 110 3.135z"
                    fill="var(--illustration-color-4, #beccbe)"
                  />
                </svg>
              </div>{" "}
              <div id="button-box-1" className="up-button-box-labels">
                <div className="up-button-box-label">
                  <h4>I will upload lectures for students</h4>
                </div>{" "}
                {/**/}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-10">
            <div
              data-cy="button-box"
              className={`up-button-box ${
                type === 1 ? "up-button-box  up-button-box-radio active" : ""
              } `}
              onClick={() => setType(1)}
            >
              <div className="up-radio">
                <label className="up-checkbox-label">
                  <input
                    type="radio"
                    value={type}
                    checked={type === 1}
                    name="instructor"
                    onChange={(e) => setType(1)}
                  />{" "}
                  <span className="up-checkbox-replacement-helper">
                    {/**/} {/**/}{" "}
                  </span>{" "}
                </label>
              </div>{" "}
              <div className="up-illustrations">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 145 130"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    d="M125.657 123.228H57.062a1.55 1.55 0 01-1.553-1.555V8.328c0-.857.694-1.556 1.553-1.556h86.383c.857 0 1.556.698 1.556 1.556v95.436"
                    fill="var(--illustration-color-2, #14a800)"
                  />
                  <path
                    d="M108.203 30.291H72.431a1.612 1.612 0 010-3.222h35.772a1.611 1.611 0 010 3.222zm20.481 22.017H72.603a1.61 1.61 0 110-3.221h56.081a1.61 1.61 0 110 3.221zm-9.783 39.794H72.603a1.612 1.612 0 010-3.223h46.299a1.611 1.611 0 11-.001 3.223zm9.783-26.532H72.603a1.61 1.61 0 110-3.221h56.081a1.61 1.61 0 110 3.221zm0 13.268H72.603a1.611 1.611 0 010-3.221h56.081a1.61 1.61 0 110 3.221z"
                    fill="var(--illustration-color-5, #00c217)"
                  />
                  <polygon
                    points="125.657,123.228 125.657,103.764 145,103.764"
                    fill="var(--illustration-color-5, #00c217)"
                  />
                  <path
                    d="M55.515 96.132v-38.19a3.597 3.597 0 013.598-3.596h12.751c4.575 0 8.661-2.723 9.095-7.278.5-5.227-3.597-8.688-8.72-8.688H53.424a8.747 8.747 0 00-5.891 2.271L34.754 51.467l-.217.199a8.71 8.71 0 01-6.059 2.438H2.628v42.027h52.887z"
                    fill="var(--illustration-color-13, #e8f1e8)"
                  />
                  <path
                    d="M.809 98.674H29.34a1.62 1.62 0 001.623-1.616V53.236c0-.896-.728-1.621-1.623-1.621H.809a.809.809 0 00-.809.811v45.439c0 .444.36.809.809.809"
                    fill="var(--illustration-color-1, #d5e0d5)"
                  />
                  <path
                    d="M24.839 60.703a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0"
                    fill="var(--white, #ffffff)"
                  />
                </svg>
              </div>{" "}
              <div id="button-box-2" className="up-button-box-labels">
                <div className="up-button-box-labels">
                  <h4>I will all the classes personally, online </h4>
                </div>{" "}
                {/**/}
              </div>
            </div>
          </div>
        </div>

        {type === 0 ? (
          <>
            <div className="drop-box main-box mb-3">
              {section.map((sec: any, index: number) => (
                <>
                  <div className="kvjadsd-j43rm">
                    <div className="jodsa-wnedas">
                      <h6>Section title</h6>
                    </div>
                    {sec?.length !== -1 && (
                      <div
                        onClick={() => removeInputField(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={sec.title}
                    onChange={(e) => handleChangeSection(index, e)}
                    placeholder="Write here..."
                  />
                  {/* { errors && <div className='invalid'>{errors.sections.0.title[0]}</div>} */}
                  {sec.lectures.map((lec: any, i: number) => (
                    <div className="drop-box" style={{ marginTop: "10px" }}>
                      <div className="kvjadsd-j43rm">
                        <div className="jodsa-wnedas">
                          <h6>Lectures</h6>
                        </div>
                        {lec?.length !== -1 && (
                          <div
                            onClick={() => removeInputFields(index, i)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa fa-trash"></i>
                          </div>
                        )}
                      </div>

                      <div className="p-field  ">
                        <div className="d-flex">
                          <Icons name="i24" />
                          <label>Title</label>
                        </div>
                        <input
                          type="text"
                          name="title"
                          value={lec.title}
                          onChange={(e) => handleChangeLecture(index, i, e)}
                          placeholder="Write here..."
                        />
                      </div>

                      <div>
                        <label>Video / PDF file for this Lecture</label>
                        <div className="drop-box img_container">
                          <div className="kvjadsd-j43rm iasdufhvs-ernd">
                            <Icons name="i29" />
                            {lec.thumbnail ? (
                              <img
                                src={lec.thumbnail}
                                alt="course_img"
                                className="thum_img"
                              />
                            ) : (
                              ""
                            )}
                            {lec.thumbnail || lec.file_type === "Video" ? (
                              ""
                            ) : lec.object_key ? (
                              lec?.object_key
                            ) : (
                              <p>Drag file here / Choose file</p>
                            )}
                          </div>
                          {lec.thumbnail || lec.file_type === "PDF" ? (
                            ""
                          ) : (
                            <input
                              type="file"
                              accept="pdf/*"
                              onChange={(e) =>
                                handleChangeLectureFile(index, i, e)
                              }
                              className="custom-file-input"
                            />
                          )}
                        </div>
                        <div className="mt-2">
                          {lec.progressbar === 100
                            ? " "
                            : lec.progressbar && (
                                <ProgressBar animated now={lec.progressbar} />
                              )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3
                    className="add-more"
                    onClick={() => AddmoreLecture(index)}
                  >
                    + Add more lectures{" "}
                  </h3>
                </>
              ))}
            </div>
            
            <h3 id="more-section" onClick={() => AddmoreSection()}>
              + Add more lectures and more sections
            </h3>
            <div className="d-flex justify-content-center mt-2">
              <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                <button
                  className="upload-1 sdisad-dsdactive "
                  onClick={() => onPrevStep(1 - 1)}
                >
                  Preview
                </button>
              </div>
              <div className="idfadsf-sads kajfds-sdfe ">
                <button
                  className="upload-1 sdisad-dsdactive"
                  onClick={() => SaveCriculum()}
                >
                  {loading ? <Spinner animation="border" /> : "Save & Next"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <Secdule
            course_id={courseId}
            onStepChange={onStepChange}
            onPrevStep={onPrevStep}
            step={step}
          />
        )}
      </div>
    </>
  );
};
