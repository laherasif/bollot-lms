import {
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import Icons from "../../insIcons";
import { useState } from "react";
import Secdule from "./secdule";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { S3_BUCKET, myBucket } from "../../confiq/aws/aws";
import { bytesToSize, generateVideoThumbnail, SweetAlert } from "../../function/hooks";
import { pdfThumnail } from '../../constant/constant'
import {
  addMoreCriculum,
  addCriculumInput,
  addLectureInput,
  addLectureThumanil,
  addMoreLect,
  delLecture,
  delLectureThumanil,
  delCriculumSection,
  networkFail
} from '../../redux/actions/instructor/criculum'
import Icon from '../../../src/components/admin/icons'
export default ({ onStepChange, onPrevStep, step }: any) => {



  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});





  const token = useSelector(
    (state: RootStateOrAny) => state?.userReducer?.token
  );

  const { Criculums } = useSelector(
    (state: RootStateOrAny) => state.criculum
  );

  const { courseId } = useSelector((state: RootStateOrAny) => state?.addCourse)


  const dispatch = useDispatch()

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });

  const AddmoreSection = () => {

    dispatch(addMoreCriculum())

  };

  const AddmoreLecture = (index: number) => {
    dispatch(addMoreLect(index))

  };


  const handleChangeSection = (
    index: number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evnt.target;
    dispatch(addCriculumInput({ name, value, index }))
  };

  const handleChangeLecture = (
    index: number,
    i: number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evnt.target;
    dispatch(addLectureInput({ name, value, index, i }))

  };

  const handleChangeLectureFile = async (
    index: number,
    i: number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: any = evnt.target.files[0];
    if (!file.name.match(/.(mp4|pdf|mov|wmv|avi|avchd|flv|mkv|mpeg-2)$/i)) {
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
            let data = {
              thumbnail: thumbnail,
              prog: prog,
              video: "Video",
              file: file.name,
              file_size: file.size
            }

            dispatch(addLectureThumanil({ data, index, i }))
          } else {
            SweetAlert({
              icon: "error",
              text: "please check your internet connection",
            });
            dispatch(networkFail())

          }
        })
        .send((err) => {
          if (err) {
            SweetAlert({ icon: "error", text: err });
            dispatch(networkFail())

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

            let data = {
              thumbnail: pdfThumnail,
              prog: prog,
              video: "PDF",
              file: file.name,
              file_size: file.size
            }

            dispatch(addLectureThumanil({ data, index, i }))
          } else {
            SweetAlert({
              icon: "error",
              text: "please check your internet connection",
            });
            dispatch(networkFail())

          }
        })
        .send((err) => {
          if (err) {
            SweetAlert({ icon: "error", text: err });
            dispatch(networkFail())

          }
        });
    }
  };


  const removeInputFields = (index: number, i: number) => {
    if (errors) {
      let convert = errors.sections ? Object?.values(errors.sections) : {}
      const error: any = [...convert];
      for (let j = 0; j < convert.length; j++) {
        if (j === index) {
          const element = error[j];
          let find = element.lectures
          find.splice(i, 1)
        }

      }
      setErrors({ sections: error })
    }

    dispatch(delLecture({ index, i }))
  };

  const removeInputField = (index: number) => {
    if (errors) {
      let findIndex = errors?.sections?.filter((item, i) => {
        return i !== index
      })
      setErrors({ sections: findIndex })
    }
    dispatch(delCriculumSection(index))



  };
  const delThumnail = (index: number, i: number) => {
    dispatch(delLectureThumanil({ index, i }))
  }



  const SaveCriculum = async () => {

    let saveCri = {
      course_id: courseId,
      sections: Criculums,
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
        SweetAlert({
          icon: "success",
          text: res.data.message,
        });
      } else {
        setLoading(false);
        setErrors(res.data.error)

      }
    } catch (err) {
      setLoading(false);
      SweetAlert({
        icon: "error",
        text: err,
      });
    }
  };

  return (
    <>
      <div className="p-fields"  >
        <div className="row" >
          <h4 className="mb-2">Plan Your Course </h4>
          <div className="col-12 col-md-6 mt-13 col-md-offset-1" id="cricculum-card" >
            <div
              data-cy="button-box"
              id="up-button-box"
              className={`up-button-box ${type === 0 ? "up-button-box  up-button-box-radio active" : ""
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
                    {/**/} {/**/}
                  </span>
                </label>
              </div>
              <div className="up-illustrations">
                <Icon name="cricculum" />
              </div>
              <div id="button-box-1" className="up-button-box-labels">
                <div className="up-button-box-label">
                  <h4>I will upload lectures for students</h4>
                </div>
                {/**/}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-10" id="cricculum-card">
            <div
              data-cy="button-box"
              className={`up-button-box ${type === 1 ? "up-button-box  up-button-box-radio active" : ""
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
                  />
                  <span className="up-checkbox-replacement-helper">
                  </span>
                </label>
              </div>
              <div className="up-illustrations">
                <Icon name="live" />
              </div>
              <div id="button-box-2" className="up-button-box-labels">
                <div className="up-button-box-labels">
                  <h4>I will conduct all the classes personally, online </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {type === 0 ? (
          <>
            <div className="drop-box main-box mb-3" >
              {Criculums ? Criculums?.map((sec: any, index: number) => (
                <div className="drop-box" id="inner_drop_box">
                  <div className="kvjadsd-j43rm">
                    <div className="jodsa-wnedas">
                      <h6>Section title</h6>
                    </div>
                    {sec?.length !== -1 && <div onClick={() => removeInputField(index)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}
                  </div>
                  <div >
                    <input
                      type="text"
                      name="title"
                      style={errors && errors?.sections && errors?.sections[index]?.title && { border: '1pt solid red' }}
                      // style={{border: '1pt solid red'}}
                      value={sec.title}
                      onChange={(e) => handleChangeSection(index, e)}
                      placeholder="Write here..." />
                    {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.title}</div> : null}

                  </div>
                  {sec.lectures.map((lec: any, i: number) => (
                    <div className="drop-box " style={{ marginTop: '10px' }}>
                      <div className="kvjadsd-j43rm">
                        <div className="jodsa-wnedas">
                          <h6>Lectures</h6>
                        </div>
                        {
                          lec?.length !== -1 && <div style={lec?.progressbar > 0 && lec?.progressbar < 100 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} onClick={lec?.progressbar > 0 && lec?.progressbar < 100 ? null : () => removeInputFields(index, i)} ><i className="fa fa-trash"></i></div>

                        }
                      </div>

                      <div >
                        <div className="d-flex">
                          <Icons name="i24" />
                          <label>Title</label>
                        </div>
                        <input
                          type="text"
                          name="title"
                          style={errors && errors?.sections && errors?.sections[index]?.lectures[i]?.title && { border: '1pt solid red' }}
                          value={lec.title}
                          onChange={(e) => handleChangeLecture(index, i, e)}
                          placeholder="Write here..." />
                        {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.lectures[i]?.title}</div> : null}

                      </div>

                      <div className={lec.thumbnail && lec.id || lec.progressbar === 100 ? "image-container" : ""}>
                        <label>Video / PDF file for this Lecture</label>
                        <div className="drop-box img-box"
                          style={errors && errors?.sections && errors?.sections[index]?.lectures[i]?.object_key && { border: '1pt solid red' }}

                        >
                          <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                            <Icons name="i29" />
                            <>
                              {lec?.id ? <img src={lec.thumbnail} alt="course_img" className="thum_img" /> : lec?.object_key}
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {lec?.file_size > 0 && <p className="mt-2">File Size : {bytesToSize(lec?.file_size)}</p>}
                                {lec?.progressbar === 100 && <p className="mt-2">File Uploaded <i style={{ color: 'green' }} className="fa fa-check-circle"></i></p>}
                              </div>



                            </>
                          </div>
                          {lec?.object_key ? "" :
                            <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, i, e)} className="custom-file-input" />
                          }
                          {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.lectures[i]?.object_key}</div> : null}


                        </div>
                        <div className="mt-2">
                          {lec.progressbar === 100 ? " "
                            :
                            lec.progressbar && <ProgressBar animated now={lec.progressbar} />}
                        </div>
                        {lec?.object_key && lec.progressbar === 100 ?
                          <>
                            <div className="overlay"></div>
                            <div id="icon" onClick={() => delThumnail(index, i)}>
                              <i className="fa fa-close" ></i>
                            </div>
                          </>
                          : null
                        }
                      </div>

                    </div>
                  ))}
                  {/* {sec.lectures.some((s:any) => s.progressbar === 100 ? )} */}
                  <span className="add-mores"
                    style={sec.lectures.some((s: any) => s.progressbar > 0 && s.progressbar < 100) ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                    onClick={sec.lectures.some((s: any) => s.progressbar > 0 && s.progressbar < 100) ? null : () => AddmoreLecture(index)} >+ Add more lectures </span>


                </div>
              ))
                : <div>Record not found </div>
              }

            </div>

            <h3 id="more-section" style={Criculums.some((s) => s.lectures.some((l) => l.progressbar > 0 && l.progressbar < 100)) ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} onClick={() => AddmoreSection()} >
              + Add more lectures and more sections
            </h3>

            <div className="umpire w-100 " >
              <div className="umpire-1 umpire-1-cst d-flex justify-content-center mt-3 ">
                <div className="d-flex mb-3 idfadsf-sads">
                  <button
                    className="upload-1 sdisad-dsdactive "
                    id="activetab"
                    onClick={() => onPrevStep(1 - 1)}
                    disabled={Criculums.some((s) => s.lectures.some((l) => l.progressbar > 0 && l.progressbar < 100)) ? true : false}
                    style={Criculums.some((s) => s.lectures.some((l) => l.progressbar > 0 && l.progressbar < 100)) ? { opacity: '0.5' } : { opacity: '1' }}

                  >
                    Previous
                  </button>
                  <button
                    className="upload-1 sdisad-dsdactive"
                    id="activetab"
                    onClick={() => SaveCriculum()}
                    disabled={Criculums.some((s) => s.lectures.some((l) => l.progressbar > 0 && l.progressbar < 100)) ? true : false}
                    style={Criculums.some((s) => s.lectures.some((l) => l.progressbar > 0 && l.progressbar < 100)) ? { opacity: '0.5' } : { opacity: '1' }}
                  >
                    <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                    {loading ? <Spinner animation="border" /> : "Save & Next"}
                  </button>
                </div>

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
