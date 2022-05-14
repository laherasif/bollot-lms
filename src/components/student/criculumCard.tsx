import { Carousel } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import ReactPlayer from "react-player";
import { S3_BUCKET, myBucket } from '../../confiq/aws/aws'
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";


export default ({ lectures , CourseId}: any) => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [played, setPlayed] = useState(0)
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    GetLect(lectures[index]?.object_key)
  };

  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  const countTime = async () => {
    try {

      let value = {
        course_id: CourseId,
        course_section_lecture_id: lectures[index].id,
        minutes: 1
      }

      await AxInstance.post('api//student/my-courses/progress/record', value)


    } catch (error) {

    }
  }

  useEffect(() => {
    if (played === 28.68) {
      countTime()
    }
  }, [played])

  useEffect(() => {

    const paramss = {
      Bucket: S3_BUCKET,
      Key: lectures[0]?.object_key
    };
    try {
      const url = myBucket.getSignedUrl('getObject', paramss);
      setValue(url)
    }
    catch (err) {

    }
  }, [lectures])

  console.log("payal", played)


  const GetLect = (link: any) => {

    const paramss = {
      Bucket: S3_BUCKET,
      Key: link
    };
    try {
      const url = myBucket.getSignedUrl('getObject', paramss);
      setValue(url)
      console.log("url", url)
    }
    catch (err) { }
  }

  return (
    <>
      <div className="videos-title">
        <div>
          <h4>Title : {lectures[index].title}</h4>
        </div>
        <div>
          Lectures : {index + 1} / {lectures.length}
        </div>
      </div>
      <Carousel activeIndex={index} interval={null} indicators={false} onSelect={handleSelect}>
        {lectures.length && lectures?.map((lec: any, i: number) => (
          <Carousel.Item key={i} style={{ width: '100%' }}>

            <ReactPlayer
              width="100%"
              height="100%"
              onProgress={(progress) => {
                setPlayed(progress.playedSeconds);
              }}
              playing={lectures[index].id === lec.id ? true : false}
              controls
              url={value} />

          </Carousel.Item>
        ))
        }

      </Carousel>
    </>
  );
}
