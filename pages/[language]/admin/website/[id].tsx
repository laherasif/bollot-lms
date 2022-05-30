import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Search from "../../../../src/components/instructor/search";
import DataTable from "react-data-table-component";
import AddBlog from "../../../../src/components/admin/addBlog";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [blog, setBlog] = useState([])
  const [showblog, setShowBlog] = useState(true)
  const [loading, setLoading] = useState(false)
  const [filterText, setFilterText] = useState('');

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
        setLoading(true)
        let res = await AxInstance.get('api//admin/blogs')

        if (res.data.success === true) {
          setLoading(false)
          setBlog(res.data.response.blogs)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [])

  const columns: any = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (d: any) => (
        <img src={d?.cover_image} className="dlink" width="30%" height="90%" style={{ objectFit: 'contain' }} />
      )
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,


    },
    {
      name: "Tags",
      selector: "tags",
      sortable: true,
      cell: (d: any) => (
        d.tags.map((t) => (
          <span style={{ margin: '0px 3px' }} >{t}{","}</span>

        ))
      )
    },
    {
      name: "Action",
      selector: "id",
      sortable: true,
      cell: (d: any) => (
        <div className='d-flex pl-2'>
          <Link href={`/en/admin/manageBlog/${d.id}`}>
            <div>
              <i className='fa fa-edit'></i>
            </div>
          </Link>
          <div style={{ marginLeft: '20px' }}>
            <i className='fa fa-trash'></i>
          </div>

        </div >
      )
    }
  ];
  const filteredItems = blog?.filter(item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()));


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
                    <Link href="/en/instructor/" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Manage Website Components</h3>
                  </div>
                  <div className=" jidfjsd-asjreid">
                    {/* <Search /> */}
                    <Link href="/en/admin/manageBlog">
                      <div className="d-flex idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive" >
                          + Add New Blog </button>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 idfadsf-sads w-100">
                        <button className="upload-1 sdisad-dsdactive">
                           Blogs
                        </button>
                        <Link href="/en/admin/newsEvent">
                          <button className="upload-1" > New and Event</button>
                        </Link>
                        <Link href="/en/admin/manageHeader">
                          <button className="upload-1" > Header Menu</button>
                        </Link>
                        <Link href="/en/admin/banner">
                          <button className="upload-1" > Banners</button>
                        </Link>
                        <Link href="/en/admin/contactForm">
                          <button className="upload-1" >Users Emails</button>
                        </Link>
                        
                      </div>

                    </div>
                  </div>
                </div>
                <div className="complete-web-1">

                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                    <div className="dsnodi-sdjsad">
                      <div className="searchbar-icon">
                        <FiSearch color="#8A8A8A" size={17} />

                      </div>
                      <input type="text" placeholder="Search" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
                    </div>

                  </div>

                  <div style={{ width: '100%' }}>
                    <DataTable
                      columns={columns}
                      data={filteredItems}
                      sortIcon={<i className='fa fa-arrow-down'></i>}
                      pagination
                      selectableRows
                      highlightOnHover
                    />
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
