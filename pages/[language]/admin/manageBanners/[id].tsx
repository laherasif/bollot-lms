import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import { SweetAlert } from "../../../../src/function/hooks";
// import TagsInput from '../../../../src/components/admin/tagInput'
// import Editor from "../../../../src/components/admin/Editor";
import { Breadcrumb, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
// import { MdOutlineBrandingWatermark } from "react-icons/md";
const options = ["one", "two", "three"];


let intialState = {
  banner_title: "",
  banner_text: "",
  banner_link: "",
  banner_link_text: "",
  banner_image: ""
}


const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [values, setValues] = useState(intialState);
  const [detail, setDetail] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState()
  const [editorLoaded, setEditorLoaded] = useState(false);


  useEffect(() => {
    setEditorLoaded(true);
  }, []);


  const router = useRouter()
  let BannerId = router.query.id


  const { token } = useSelector((state: RootStateOrAny) => state?.admin)
  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  useEffect(() => {
    let fetchCourse = async () => {
      try {
        // setLoading(true)
        let res = await AxInstance.get(`api//admin/banners/${BannerId}`)
        if (res.data.success === true && res.data.response.banner !== null) {
          // setLoading(false)
          setValues({
            banner_title: res.data.response.banner.banner_title,
            banner_text: res.data.response.banner.banner_text,
            banner_link: res.data.response.banner.banner_link,
            banner_link_text: res.data.response.banner.banner_link_text,
            banner_image: res.data.response.banner.banner_image
          })

        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [BannerId])



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = event.target.files;
    if (!files[0]?.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      SweetAlert({ icon: "error", text: 'please select only image' })
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        let name = "banner_image"
        let value = e.target?.result
        setValues({ ...values, [name]: value })

        let imageUrl = URL.createObjectURL(event.target.files[0])
        setUrl(imageUrl)

      }
    }
  }


  const hendleFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  };







  let saveBlog = async () => {

    let valueWithoutId = {
      banner_title: values?.banner_title,
      banner_text: values?.banner_text,
      banner_link: values?.banner_link,
      banner_link_text: values?.banner_link_text,
      banner_image: values?.banner_image
    }
    let valuesWithId = {
      id: BannerId,
      banner_title: values?.banner_title,
      banner_text: values?.banner_text,
      banner_link: values?.banner_link,
      banner_link_text: values?.banner_link_text,
      banner_image: values?.banner_image

    }

    try {
      debugger
      setLoader(true)
      let res = await AxInstance.post('api//admin/banners/store', BannerId ? valuesWithId : valueWithoutId)
      if (res.data.success === true) {
        setLoader(false)
        setValues({ ...intialState })
        setUrl('')
        setError('')
        if (BannerId) {
          router.push('/en/admin/banner')
        }
        // setValues({ title : "" , short_desc : '' , banner_image: '' , tags : [] })
        SweetAlert({ icon: 'success', text: res.data.message })


      }
      else {
        setLoader(false)
        setError(res.data.errors)
      }
    }
    catch (err) {
      SweetAlert({ icon: 'error', text: err })
      setLoader(false)

    }
  }



  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {loading ? Small()
          :
          <div className="dash-board-1 mt-2">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">

                  <div className="back-btn">
                    {/* <Link href="/en/admin/banner" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link> */}
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/banner">
                        Banner
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Manage Banner </Breadcrumb.Item>
                    </Breadcrumb>

                  </div>

                </div>


                <div className="complete-web-1 ">
                  <div className="blog w-100" >
                    <div className="mb-3"   >
                      <div style={{ display: 'flex', flexDirection: 'column', }} >
                        <div className="w-100 mb-2">
                          <label>Title </label>
                          <br />


                          <input type="text"
                            name="banner_title"
                            className="form-control "
                            value={values?.banner_title}
                            onChange={(e) => hendleFields(e)}
                            placeholder="Write here..." />
                          {error?.banner_title && <div className="invalid mt-1">{error?.banner_title[0]}</div>}

                        </div>
                        <div >

                          <label>Description </label>
                          <br />
                          <textarea
                            className="form-control w-100"
                            rows={5}
                            name="banner_text"
                            value={values?.banner_text}
                            onChange={(e: any) => hendleFields(e)}
                            placeholder="Description"
                          ></textarea>
                          {error?.banner_text && <div className="invalid mt-1">{error?.banner_text[0]}</div>}

                        </div>


                        <div className="mt-3">
                          <label>Link </label>
                          <input type="text"
                            name="banner_link"
                            className="form-control "
                            value={values?.banner_link}
                            onChange={(e) => hendleFields(e)}
                            placeholder="Write here..." />

                          {/* <TagsInput selectedTags={selectedTags} tags={values?.tags} /> */}
                          {error?.banner_link && <div className="invalid mt-1">{error?.banner_link[0]}</div>}

                        </div>



                        <div className="mt-3">
                          <label>Link Title </label>
                          <input type="text"
                            name="banner_link_text"
                            className="form-control "
                            value={values?.banner_link_text}
                            onChange={(e) => hendleFields(e)}
                            placeholder="Write here..." />

                          {/* <TagsInput selectedTags={selectedTags} tags={values?.tags} /> */}
                          {error?.banner_link_text && <div className="invalid mt-1">{error?.banner_link_text[0]}</div>}

                        </div>


                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
                          <label >Banner Image</label>
                          <span style={{ color: 'lightgray' }}>Use an image with 3:1 ratio dimensions</span>
                          <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
                            <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                              {url || values?.banner_image ? <img src={url || values?.banner_image} alt="course_img" style={{ width: '30%', height: '50%', objectFit: 'cover' }} /> : ""}
                              {url || values?.banner_image ? "" : <p>Select Image </p>}
                            </div>
                            <input type="file" accept="image/png, image/gif, image/jpeg" name="banner_image"
                              onChange={(e) => handleInputChange(e)}
                              id="img"
                              style={{ display: 'none' }} />
                          </label>
                          {error?.banner_image && <div className="invalid mt-1">{error?.banner_image[0]}</div>}

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <div style={{ marginTop: '20px', width: '50%', textAlign: 'center' }}>
                            <div className="active_color w-100">
                              <button className="upload-active-save " onClick={() => saveBlog()}>
                                {loader ?
                                  <Spinner animation="border" />
                                  :
                                  "Save"
                                }
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>




                  </div>
                </div>
              </div>
            </div>
          </div>
        }



      </section >
    </div >
  );
};

export default AdminAuth( Home );
