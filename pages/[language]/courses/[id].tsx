import type { NextPage } from "next";
import { Dropdown, Form, Spinner, } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
// import { Pagination } from "../../../src/components/pagination";
import CourseCardBig from "../../../src/components/card/CourseCardBig";
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import { Catagories } from '../../../src/components/skeleton'
import { GetCatagory, priceFilter, GetSorted, GetSearchCourse, GetAllCatagory, GetSortedSearch } from '../../../src/redux/actions/courses'
import dynamic from "next/dynamic";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Link from 'next/link'
import instance from "../../../src/confiq/axios/instance";
//@ts-ignore


const DynamicRangeComponent =
  typeof window !== "undefined"
    ? dynamic(() => import("multi-range-slider-react"))
    : null;

const Home: NextPage = () => {
  // const intl = useIntl();]


  const [view, setView] = useState(true);
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(0);
  const [sorting, setSorting] = useState('');
  const [searchCourse, setSearchCourse] = useState('')
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [mainLoading, setMainLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };



  const dispatch = useDispatch()
  const router = useRouter()
  let param = router.query.id;
  let searchC = router.query.search




  const getCatagory = (id: number) => {
    setMainLoading(true)
    dispatch(GetCatagory(id, "getall"))
    setTimeout(() => {
      setMainLoading(false)
    }, 2000);
  }

  const getAllCatagory = () => {
    setMainLoading(true)
    dispatch(GetAllCatagory())
    setTimeout(() => {
      setMainLoading(false)
    }, 2000);

  }

  const filterPrice = () => {
    setMainLoading(true)
    let arr = []
    arr.push(minValue, maxValue)
    dispatch(priceFilter(arr))
    setTimeout(() => {
      setMainLoading(false)
    }, 2000);
  }


  const getSorted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSorting(e.target.value);
    setMainLoading(true)

    if (searchC) {
      dispatch(GetSortedSearch(e.target.value , searchC))

    }
    else {
      dispatch(GetSorted(e.target.value))
    }
    setTimeout(() => {
      setMainLoading(false)
    }, 2000);
  }

  const getCourseCata = (id: number) => {
    setMainLoading(true)
    dispatch(GetCatagory(id, "getcourseCata"))
    setTimeout(() => {
      setMainLoading(false)
    }, 2000);
  }

  const getSearchCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMainLoading(true)

    dispatch(GetSearchCourse(searchCourse))
    setTimeout(() => {
      setMainLoading(false)
    }, 2000);

  }


  const { AllCourse, Catagory, loader } = useSelector((state: RootStateOrAny) => state.course)


  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
    if (searchC) {
      dispatch(GetSearchCourse(searchC))
    }
    else {
      let findCatagory = Catagory.find((i: any) => i.slug === param)
      getCourseCata(findCatagory?.id)
    }


  }, [searchC ? searchC : ''])



  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + page;
    setCurrentItems(AllCourse?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(AllCourse?.length / page));



  }, [itemOffset, page, AllCourse, Catagory]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setMainLoading(true)
    const newOffset = (event.selected * page) % AllCourse?.length;
    if (param) {
      router.replace(`/en/courses/${param}?p=${event.selected + 1}`)

    }
    else {
      router.replace(`/en/courses?p=${event.selected + 1}`)
    }
    setItemOffset(newOffset);
    setTimeout(() => {
      setMainLoading(false)

    }, 2000);

  };





  return (
    <>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>
      <div>
        <section className="browse browse-bg">
          <div className="container-3 all-browse">
            <div className="our">
              <h3>
                Browse Thousands of Our Video Tutorials Curated Only for you.
              </h3>
              <p>
                Access all tutorials and resources when you <br /> become a
                premium member of <span>Bolloot</span>{" "}
              </p>
            </div>
          </div>

        </section>
        {view == false ? (
          <section className="container-3 sajdhpa-dsandje">
            <div className="S-bar">
              <div className="s-bar-inner">
                <div className="mx-2">
                  <Icons name="c27" />
                </div>
                <form onSubmit={getSearchCourse} style={{ width: '100%' }}>
                  <input
                    className="cor"
                    type="text"
                    name="search"
                    value={searchCourse}
                    onChange={(e) => setSearchCourse(e.target.value)}
                    placeholder="Search for Courses i.e web-development"
                  />
                </form>
              </div>
            </div>
            <h1>
              Browse Thousands of Our Video Tutorials Curated Only for you.
            </h1>
            <p>
              Access all tutorials and resources when you become a premium
              member of Bolloot
            </p>
          </section>
        ) : (
          <></>
        )}
        {loader || loading ?
          <div style={{ margin: '20px 40px' }}>
            <Catagories />
          </div>
          :
          <div style={{ position: 'relative', zIndex: '999', cursor: 'pointer' }}>
            <section className="names">
              <div className="container named">
                <div className="name">
                  {view == false ? (
                    <>
                      <h3 id="all" onClick={() => getAllCatagory()}>All</h3>
                      {Catagory && Catagory.map((cata: any) => (
                        <>
                          <h3 id="web" key={cata.id} onClick={() => getCourseCata(cata.id)}>{cata.name}</h3>
                        </>
                      ))}

                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* {currentItems && currentItems.length > 0 ? */}
                <div className="iconss">
                  <div
                    className={`mx-2 ${view == true ? "sadsa" : ""}`}
                    onClick={() => {
                      setView(true);
                    }}
                  >
                    <Icons name="c28" />
                  </div>
                  <div
                    onClick={() => {
                      setView(false);
                    }}
                    className={`mx-2 ${view == false ? "sadsa" : ""}`}
                  >
                    <Icons name="c29" />
                  </div>

                  <div className="mx-2 sortdrp">
                    <Form.Select name="sorting" value={sorting} onChange={(e) => getSorted(e)}>
                      <option disabled>Sort By </option>
                      <option value="low">Sort by Price - Low to High</option>
                      <option value="high">Sort by Price - High to Low</option>
                      <option value="rating">Sort by Top Rated</option>
                      <option value="recent">Sort by most recent</option>
                    </Form.Select>
                  </div>
                </div>
                {/* // : null} */}
              </div>
            </section>
            <section className="all-of" style={{ width: '100%' }} >
              <div className="container-3 d-flex justify-content-between w-100 ahsdad-we">
                {view ? (
                  <div className="jadsf-dsddasdn " >
                    <h3 onClick={() => getAllCatagory()}>All Courses</h3>
                    {Catagory && Catagory.map((cat: any) => (
                      <Link href={`/en/courses/${cat.slug}`}>
                        <h5 key={cat.id} style={{ cursor: 'pointer' }} onClick={() => getCatagory(cat.id)}>{cat.name}</h5>
                      </Link>
                    ))}

                    <div className="kjsado-sadnw2">
                      <button className="asldjsa-sadns">Live </button>
                      <button className="asldjsa-sadns" style={{ width: 'max-content' }}>Criculum</button>
                    </div>
                    <h3>Price</h3>
                    {typeof window !== "undefined" ? (
                      <DynamicRangeComponent
                        min={0}
                        max={100}
                        step={5}
                        ruler={false}
                        label={false}
                        preventWheel={false}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                          handleInput(e);
                        }}
                      />
                    ) : null}

                    <p>Price ${minValue} - ${maxValue}</p>

                    <div className="d-flex jsutify-content-center w-100">
                      <button className="btn-1s px-5" onClick={() => filterPrice()}>Filter</button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className={`all-of ${view ? "asdjfi-dasd" : ""}`}>
                  {currentItems && currentItems?.length > 0 ? currentItems.map((cours: any) =>
                    view == false ? <CourseCard f={cours} key={cours.id} /> : <CourseCardBig cours={cours} key={cours.id} />
                  )
                    : <h2 style={{ textAlign: 'center' }}>Courses not avaliable</h2>
                  }
                </div>
              </div>
            </section>
            <section className="container-3 number mt-2">
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
              <div style={{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', opacity: '1', textAlign: 'center', top: 0, left: 0, right: 0, bottom: 0, zIndex: '999' }}>
                <div style={{ marginTop: '20rem', zIndex: '9999' }}>
                  <Spinner animation="border" variant="primary" />
                </div>

              </div>
            }


            <Footer />
          </div>
        }
      </div>
    </>
  );
};



export default Home;
