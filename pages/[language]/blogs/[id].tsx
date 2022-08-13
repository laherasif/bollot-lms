import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
import ReactPaginate from "react-paginate";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import BlogCard from "../../../src/components/card/BlogCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import { SweetAlert } from "../../../src/function/hooks";
import { getBlogs } from '../../../src/redux/actions/blogNews/blogs'

const Home: NextPage = () => {
  // const intl = useIntl();\
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(12);
  const [mainLoading, setMainLoading] = useState(false);

  const { Blogs } = useSelector((state: RootStateOrAny) => state.blogs)


  const dispatch = useDispatch()
  const router = useRouter()
  let param = router.query.p;


  useEffect(() => {
    router.replace(`/en/blogs/?p=1`)
    try {
      dispatch(getBlogs())
    }
    catch (err) { 
      SweetAlert({ icon: "error", text: err })

    }
  }, [])


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + page;
    setCurrentItems(Blogs?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Blogs?.length / page));


  }, [itemOffset, page, Blogs]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setMainLoading(true)
    const newOffset = (event.selected * page) % Blogs?.length;

    router.replace(`/en/blogs?p=${event.selected + 1}`)

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
        </div>        <section className="browse browse-bg1">
          <div className="container-3 all-browse">
            <div className="our mx-5">
              <h3>
                Welcome to Our <br /> Forever Updated <br /> Blog Post!
              </h3>
              <p>Be informed! Never miss a single post</p>
            </div>
          </div>
        </section>


        <section className="container-3 all-of my-5">
          <div className="all-of">
            {currentItems && currentItems.map((blog: any, i: number) => (
              <BlogCard blog={blog} key={i} />
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
            <div style={{ marginTop: '20rem', zIndex: '9999', height: '100%' }}>
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
