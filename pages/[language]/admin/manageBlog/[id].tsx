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
import Editor from "../../../../src/components/admin/Editor";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
const options = ["one", "two", "three"];


let intialState = {
  title: '',
  short_desc: '',
  tags: [],
  full_content: '',
  cover_image: '',
}


const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [values, setValues] = useState({
    title: '',
    short_desc: '',
    tags: [],
    full_content: '',
    cover_image: '',
  }
  );
  const [detail, setDetail] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState()
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  
  const router = useRouter()
  let blogId = router.query.id


  const { token } = useSelector((state: RootStateOrAny) => state?.admin)
  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  // useEffect(() => {
  //   let fetchCourse = async () => {
  //     try {
  //       let res = await AxInstance.get('api//admin/blogs')
  //       if (res.data.success === true) {
  //         setValues(res.data.response.blogs)
  //       }
  //     }
  //     catch (err) {

  //     }
  //   }
  //   fetchCourse()
  // }, [])



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

    try {
      setLoader(true)
      let res = await AxInstance.post('api//admin/blogs/store', values)
      if (res.data.success === true) {
        setLoader(false)
        setValues({...intialState})
        // setValues({ title : "" , short_desc : '' , cover_image: '' , tags : [] })
        SweetAlert({ icon: 'success', text: res.data.message })
        router.push('/en/admin/website ')

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


  console.log("state " , values)


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
                    <Link href="/en/admin/website" >
                      <h3>
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>

                    <h3> Manage Website Banners</h3>
                  </div>

                </div>

                <div className="complete-web-1 mt-2">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive">
                          Banners
                        </button>

                      </div>

                    </div>
                  </div>
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
                          <label>Catagory Name </label>
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

                          <TagsInput selectedTags={selectedTags} tags={[]} />
                          {error?.tags && <div className="invalid mt-1">{error?.tags[0]}</div>}

                        </div>

                        <div className="mt-3">
                          <Editor
                            name="description"
                            value={values?.full_content}
                            onChange={(data) => {
                              setValues({ ...values, full_content: data })
                              

                            }}
                            editorLoaded={editorLoaded}
                          />
                          {error?.full_content && <div className="invalid mt-1">{error?.full_content[0]}</div>}

                          {/* <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                           
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              // setValues({full_content : data })

                            }}
                          /> */}
                        </div>



                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
                          <span >Catagory Image</span>
                          <label className="drop-box" htmlFor="img" style={{ cursor: 'pointer' }}>
                            <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                              {url ? <img src={url || values?.cover_image} alt="course_img" style={{ width: '30%', height: ' 50%', objectFit: 'cover' }} /> : ""}
                              {url ? " " : <p>Drag your photos here</p>}
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

export default Home;
