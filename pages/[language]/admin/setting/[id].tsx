import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEffect, useState, } from "react";
import { Small } from '../../../../src/components/admin/loader'
import { Breadcrumb, Spinner } from "react-bootstrap";
import Sidebar from "../../../../src/components/admin/sidebar2";
import axios from "axios";
import { SweetAlert } from "../../../../src/function/hooks";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const options = ["one", "two", "three"];


const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)

  const { Admin, token } = useSelector((state: RootStateOrAny) => state?.admin)

  const [state, setState] = useState([]);
  const [errors, setErros] = useState({});
  const [value, setValue] = useState({});





  const dispatch = useDispatch()


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  useEffect(() => {
    let fetchSetting = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get('api//admin/settings')
        setState(res.data.response.settings)
        setLoading(false)

      }
      catch (err) {
        SweetAlert({ icon: "error", text: err })
      }
    }

    fetchSetting()
  }, [])


  const handleChange = (e, field) => {
    let newPresetList = [...state]
    newPresetList.map((_item) => {
      if (_item.id === field.id) {
        _item.value = e.target.value
        return
      }
    })
    setState(newPresetList)
  };



  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value
  //   });
  // };





  let convtObj = Object.assign({}, state)

  console.log("obj", convtObj)

  const updateSetting = async () => {


    let values = {
      whatsapp_number: state[0].value,
      purchase_validity: state[1].value
    }

    try {
      setLoader(true)
      let res = await AxInstance.post('api//admin/settings', values)
      if (res.data.success === true) {
        setLoader(false)
        SweetAlert({ icon: 'success', text: res.data.message })

      }
      else {
        setLoader(false)
        setErros(res.data.error)

      }
    }
    catch (err) {
      setLoader(false)
      SweetAlert({ icon: 'error', text: err })

    }

  }




  return (
    <div className="inst idnasd0w3-edsad">
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
                <div className="hdsf0s-sadmsa my-4">
                  <div className="back-btn">
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item active>Settings </Breadcrumb.Item>
                    </Breadcrumb>

                  </div>
                </div>


                <div className="complete-web-1">

                  <div className="hdsf0s-sadmsa">
                    <div className="complete-web-1">
                      <div className="d-flex mb-4 idfadsf-sads">

                        <button
                          className="upload-1 sdisad-dsdactive"
                          id="activetab"

                          onClick={() => updateSetting()}>
                          <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                          Update
                          {/* <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                          {saveSetting ? <Spinner animation="border" /> :
                            "Save"
                          } */}
                        </button>
                      </div>

                      <div className="sdkahfsndj-sadsd">
                        {state && state?.map((field, index) => (
                          <div className="label-bar-1">
                            <label className="mb-5cst" key={index} >
                              {field?.label}
                            </label>
                            <input
                              value={field.value}
                              onChange={(e) => handleChange(e, field)}
                              name={field?.key}
                              className="form-control"
                              type="text"
                              placeholder="Write Here...." />

                          </div>
                        ))}



                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        }

      </section >


    </div>
  );
};

export default AdminAuth(Home);
