import axios from "axios";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
export default () => {

  const [recomended, setRecomended] = useState([])

  const { token } = useSelector(
    (state: RootStateOrAny) => state?.userReducer
  );

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });


  useEffect(() => {
    let fetchApi = async () => {
      let res = await AxInstance.get('api//student/recommended-tutors')
      setRecomended(res.data.response.instructors)
    }
    fetchApi()
  }, [])

  return (
    <>
      {recomended && recomended ? recomended.map((rec: any, index: number) => (
        <div className="client" key={index}>
          <img src={rec?.image || "/assets/images/client-1.svg"} alt="user_image" />
          <div className="client-ch">
            <h3>{rec?.fullname }</h3>
            <p>{rec?.courses_count} Listed Courses</p>
          </div>
        </div>
      ))
      : <div>Record Not Found</div> 
    }

    </>
  );
};
