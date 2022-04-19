import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { add3Dots } from '../../function/hooks';
// const CardImage = require('../../images/unsplah-1.svg');
export default ({ f, key }: any) => {

  const src = f?.cover_image
  // const srcIns = f?.instructor?.image
  return (
    <Link href={`/en/course/${f?.slug}`} passHref>
      <div className="card-course "  key={key}>
        {f?.cover_image.length > 0 && (
          <Image
            src={src}
            alt="img"
            width="300"
            height="200"
            objectFit="cover"
          />
        )}
        < h4 > { add3Dots(f?.title , 25)}</h4>
        <div className="digit">
          <span>{f?.category_tree[0]}</span>
          <h3>${f?.price}</h3>
        </div>
        <div className="bosan" style={{padding: '3px 5px 3px 5px'}}>
          <img src={f?.instructor?.image} alt="instructor_image"/>
          {/* {f?.instructor?.image.length > 0 && (
            <Image
              src={srcIns}
              alt="img"
              width="40%"
              height="30%"
              objectFit="cover"
            />
          )} */}

          <div className="b-name">
            <h5>{f?.instructor?.fullname}</h5>
            <p>Digital Marketing Expert At Bollot</p>
          </div>
        </div>
        <div className='card-course-rel'>
          <svg width={13} height={12} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.31111 9.64444L10.212 12L9.18 7.56044L12.6222 4.57511L8.08267 4.18533L6.31111 0L4.53778 4.18533L0 4.57511L3.44356 7.56044L2.40978 12L6.31111 9.64444Z" fill="white" />
          </svg>
          <p>4.9 <span>(345)</span></p>
        </div>
      </div>
    </Link >
  )

}