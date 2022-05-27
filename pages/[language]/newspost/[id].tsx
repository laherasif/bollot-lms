import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
import { RootStateOrAny, useSelector } from "react-redux";
import BlogCard from "../../../src/components/card/BlogCard";
import CommentCard from "../../../src/components/card/CommentCard";
import CommentCard1 from "../../../src/components/card/CommentCard1";
import CommentCard2 from "../../../src/components/card/CommentCard2";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import instance from "../../../src/confiq/axios/instance";
import { SweetAlert } from "../../../src/function/hooks";
import Icons from "../../../src/icons";

let initialState = {
   name : '',
   comment : '',

}
const Home: NextPage = () => {
  // const intl = useIntl();
  const [blogs, setBlogs] = useState({})
  const [comments, setComents] = useState([])
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const blogId = router.query.id

  const { User } = useSelector((state: RootStateOrAny) => state.userReducer)
  const { Admin } = useSelector((state: RootStateOrAny) => state.admin)

  useEffect(() => {
    try {
      let fetch = async () => {
        let res = await instance.get(`api//news/${blogId}`)
        let resCom = await instance.get(`api//news/comments/${blogId}`)
        setBlogs(res.data.response.news)
        setComents(resCom.data.response.news_comments)
        console.log("res", resCom)
      }
      fetch()
    }
    catch (err) { }
  }, [blogId , loading === false ])
  console.log("comments", comments)



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const saveComment = async () => {
    try {
      let value = {
        news_id: blogId,
        user_id: User?.id || Admin?.id,
        message: state?.comment,
        // image : User?.image || Admin.image 
      }

      let value2 = {
        news_id: blogId,
        name: state?.username,
        message: state?.comment,
        image: User?.image || Admin.image
      }

      let users = User || Admin;
      if (users) {
        setLoading(true)
        let res = await instance.post('api//news/comments/store', value)
        if (res.data.success === true) {
          setLoading(false)
          setState({...initialState})
          SweetAlert({ icon: 'success', text: res.data.message })
        }

      }
      else {
        let res = await instance.post('api//news/comments/store', value2)
        if (res.data.success === true) {
          setLoading(false)
          setState({...initialState})



          SweetAlert({ icon: 'success', text: res.data.message })
        }
      }

    }
    catch (err) {
      setLoading(false)

     }
  }


  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>        <div className="sm-box">
          <section className="containerms">
            <div className="music">
              <h3>{blogs?.title}</h3>
              <p>{moment(blogs?.createdAt).format('ll')} - by {blogs?.uploaded_by?.fullname}</p>
            </div>
            {/* <div className="music-img">
              <button className="btn p-0">
                <Icons name="c31" />
              </button>
              <button className="btn p-0 hsad0sa-dsd">
                <Icons name="c32" />
              </button>
            </div> */}
          </section>
          <section className="container-3s">
            <div className="music-text">
              <p className="mb-59">
                <div dangerouslySetInnerHTML={{ __html: blogs?.full_content }} />

              </p>
            </div>
            <div className="music-text">
              <div className="d-flex justify-content-between">
                <div>
                  {blogs?.tags ?
                    <h3 style={{display:'flex'}}>
                      Tags : 
                      {blogs?.tags && blogs?.tags.map((t: any, i: number) => (
                        <div key={i} style={{paddingLeft:'10px'}}>
                           {t}
                        </div>
                      ))}
                    </h3>
                    : null}
                </div>
                <div className="jaskdf-sdda">
                  <h3>Share with</h3>
                  <img src="/s1.png" alt="" />
                  <img src="/s2.png" alt="" />
                  <img src="/s3.png" alt="" />
                </div>
              </div>
            </div>
            <div className="music-text">
              <div className="dis-flex pd-50  pd-121">
                {/* <h5>9 Marketing Techniques in 2050</h5>
                <h4>
                  Learn What Makes A <br /> Successful Business
                </h4> */}
              </div>
            </div>
            <div className="music-text">
              <div className="dis-flex pd-50">
                {/* <p>Prev Post</p>
                <p>Next Post</p> */}
              </div>
            </div>
          </section>



          <section className="music-text mt-3">
            {comments && comments.length > 0 ?
              <>
                <h4 className="come">{comments?.length} Comment</h4>

                <div className="box-sha">
                  {/* <div className="brd-cst1">
                  <CommentCard2 />
                  <div className="ml5per">
                    <CommentCard2 />
                  </div>
                </div> */}
                  {comments && comments.map((c: any, i: number) => (
                    <div className="brd-cst1">
                      <CommentCard2 comment={c} key={i} />
                    </div>

                  ))}

                </div>
              </>
              : null}
          </section>
          <section className="music-text">
            <h4 className="come">Leave A Comment</h4>
            <p className="mb-45">
              Your email address will not be published. Required fields are
              marked *
            </p>
          </section>
        </div>
        <div className="pos-rel">
          <div className="form-blog-box-p">
            {User || Admin ? " " :
              <div className="form-blog-box">
                <div className="form-blog-box-input mx-2">
                  <input placeholder="Name" type="text" name="username" value={state?.username} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-blog-box-input mx-2">
                  <span>Image (Optional ) </span>
                  <input style={{ display: 'none' }} type="file" name="email" value={state?.email} onChange={(e) => handleChange(e)} />
                </div>
              </div>
            }
            <div className="form-blog-box flex-column">
              <div className="form-blog-box-input form-blog-box-input1">
                <textarea
                  rows={10}
                  name="comment"
                  value={state?.comment}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center w-100">
                <button className="btn-1 px-5 my-4" onClick={() => saveComment()}>
                  {loading ? <Spinner animation="border" />
                    :
                    "Send"
                  }
                </button>

              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 80 }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
