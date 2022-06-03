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
import TagsInput from '../../../../src/components/admin/tagInput'
import Editor from "../../../../src/components/admin/NewsEditor";
import { Breadcrumb, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const options = ["one", "two", "three"];


let intialState = {
  title: '',
  short_desc: '',
  tags: [],
  cover_image: '',
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
  const [data, setData] = useState({
    full_content: '',

  });



  const router = useRouter()
  let blogId = router.query.id

  useEffect(() => {
    setEditorLoaded(true);

  }, []);

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
        let res = await AxInstance.get(`api//admin/news/${blogId}`)
        if (res.data.success === true && res.data.response.news !== null) {
          setValues({
            title: res.data.response.news.title,
            short_desc: res.data.response.news.short_desc,
            tags: res.data.response.news.tags,
            cover_image: res.data.response.news.cover_image,
          })
          setData({
            full_content: res.data.response.news.full_content,
          })
          setLoading(false)
        }
      }
      catch (err) {
        // setLoading(false)
        SweetAlert({ icon: "error", text: err })
      }
    }
    fetchCourse()
  }, [blogId])



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = event.target.files;
    if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      SweetAlert({ icon: "error", text: 'please select only image' })
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        let name = "cover_image"
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




  const selectedTags = (tags: any) => {
    setValues({ ...values, tags: tags })

  };


  let saveBlog = async () => {

    let valueWithoutId = {
      title: values?.title,
      short_desc: values?.short_desc,
      tags: values?.tags,
      cover_image: values?.cover_image,
      full_content: data?.full_content
    }
    let valuesWithId = {
      id: blogId,
      title: values?.title,
      short_desc: values?.short_desc,
      tags: values?.tags,
      cover_image: values?.cover_image,
      full_content: data?.full_content

    }

    try {
      setLoader(true)
      let res = await AxInstance.post('api//admin/news/store', blogId ? valuesWithId : valueWithoutId)
      if (res.data.success === true) {
        setLoader(false)
        setValues({ ...intialState })
        setUrl('')
        setData({ full_content : ''})
        SweetAlert({ icon: 'success', text: res.data.message })
        if(blogId){
        router.push('/en/admin/newsEvent ')
        }

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
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">

                  <div className="back-btn">
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/website">Website</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/newsEvent">News and Event</Breadcrumb.Item>
                      <Breadcrumb.Item active>Manage News and Event </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>

                </div>

                <div className="complete-web-1 mt-2">

                </div>
                <div className="complete-web-1">
                  <div className="blog">

                    <div className="mb-3 w-100"  >

                      <div style={{ display: 'flex', flexDirection: 'column', }} >
                        <div className="w-100 mb-2">
                          <label>Title </label>
                          <br />
                          <input type="text"
                            name="title"
                            className="form-control "
                            value={values?.title}
                            onChange={(e) => hendleFields(e)}
                            placeholder="Write here..." />
                          {error?.title && <div className="invalid mt-1">{error?.title[0]}</div>}

                        </div>
                        <div >
                          <label>Short Description  </label>
                          <br />
                          <textarea
                            className="form-control w-100"
                            rows={5}
                            name="short_desc"
                            value={values?.short_desc}
                            onChange={(e: any) => hendleFields(e)}
                            placeholder="Description"
                          ></textarea>
                          {error?.short_desc && <div className="invalid mt-1">{error?.short_desc[0]}</div>}

                        </div>
                        <div className="mt-3">
                          <label>Tags </label>

                          <TagsInput selectedTags={selectedTags} tags={values?.tags} />
                          {error?.tags && <div className="invalid mt-1">{error?.tags[0]}</div>}

                        </div>

                        <div className="mt-3">
                          <label>Full Content</label>
                          <Editor
                            name="description"
                            value={data?.full_content}
                            onChange={(data) => {

                              setData({ ...data, full_content: data })

                            }}
                            editorLoaded={editorLoaded}
                          />
                          {error?.full_content && <div className="invalid mt-1">{error?.full_content[0]}</div>}

                        </div>



                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
                          <span >Image</span>
                          <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
                            <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                              {url || values?.cover_image ? <img src={url || values?.cover_image} alt="course_img" style={{ width: '30%', height: ' 50%', objectFit: 'cover' }} /> : ""}
                              {url || values?.cover_image ? " " : <p>Select Image</p>}
                            </div>
                            <input type="file" accept="image/png, image/gif, image/jpeg" name="cover_image"
                              onChange={(e) => handleInputChange(e)}
                              id="img"
                              style={{ display: 'none' }} />
                          </label>
                          {error?.cover_image && <div className="invalid mt-1">{error?.cover_image[0]}</div>}

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
