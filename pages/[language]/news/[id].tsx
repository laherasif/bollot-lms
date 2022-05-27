import type { NextPage } from "next";
import { Dropdown, Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
import NewsCard from "../../../src/components/card/NewsCard";
import CourseCard from "../../../src/components/card/CourseCard";
import CarouselNews from "../../../src/components/carouselNews";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getNews } from "../../../src/redux/actions/blogNews/blogs";
import ReactPaginate from "react-paginate";

const Home: NextPage = () => {
  // const intl = useIntl();

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(12);
  const [mainLoading, setMainLoading] = useState(false);

  const { News } = useSelector((state: RootStateOrAny) => state.blogs)


  const dispatch = useDispatch()
  const router = useRouter()
  // let param = router.query.p;

  useEffect(() => {
      router.replace(`/en/news/?p=1`)
    try {
      dispatch(getNews())
    }
    catch (err) { }
  }, [])


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + page;
    setCurrentItems(News?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(News?.length / page));
  }, [itemOffset, page, News]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setMainLoading(true)
    const newOffset = (event.selected * page) % News?.length;
   
      router.replace(`/en/news?p=${event.selected + 1}`)
    
    setItemOffset(newOffset);
    setTimeout(() => {
      setMainLoading(false)

    }, 2000);

  };



  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>
        <CarouselNews />

        <div className="container-3">
          <h3 className="jsdf0-sdsa">Upcoming Events</h3>

        </div>
        <section className="container-3 all-of my-3">

          <div className="all-of">
            {currentItems && currentItems.map((news:any,  i:number) => (
              <NewsCard news={news} key={i} />
            ))}
          </div>
        </section>
        <section className="container-3 number">
          {currentItems && currentItems?.length > 0 ?
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
            : null}
        </section>

        {
          mainLoading &&
          <div style={{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', opacity: '1', textAlign: 'center', top: '80%', left: 0, right: 0, bottom: 0, zIndex: '999' }}>
            <div style={{ marginTop: '20rem', zIndex: '9999'  , height:'100%' }}>
              <Spinner animation="border" variant="primary" />
            </div>

          </div>
        }
        <Footer />
      </div>
    </>
  );
};

export default Home;
