import { Carousel } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import ReactPlayer from "react-player";
import { S3_BUCKET, myBucket } from '../../confiq/aws/aws'


export default ({ lectures }: any) => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    GetLect(lectures[index]?.object_key)
  };

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
            
            <ReactPlayer width="100%" height="100%" playing={lectures[index].id === lec.id ? true : false} controls url={value} />

          </Carousel.Item>
        ))
        }

      </Carousel>
    </>
  );
}
