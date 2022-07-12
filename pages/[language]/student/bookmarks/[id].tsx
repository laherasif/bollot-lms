import type { NextPage } from "next";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Small } from "../../../../src/components/student/loader";
import { SweetAlert } from "../../../../src/function/hooks";
const Home: NextPage = () => {
  // const intl = useIntl();

  const [bookmark, setBookMark] = useState([])
  const [loading, setLoading] = useState(false)

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

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
        setLoading(true)
        let res = await AxInstance.get('api//student/my-courses')
        if (res.data.success === true) {
          setLoading(false)
          setBookMark(res.data.response.courses)
        }
      }
      catch (error) {
        SweetAlert({ icon: "error", text: error })

      }
    }
    fetchCourse()
  }, [])

  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">

                  <div className="complete-web-1">
                    {bookmark && bookmark ? bookmark.map((item: any, index: number) => (
                      <BookmarkCard BookMark={item} key={index} />

                    ))
                      : <div>Record not found </div>
                    }

                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Home);
