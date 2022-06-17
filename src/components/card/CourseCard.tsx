import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { add3Dots } from '../../function/hooks';
// import Rating from '../ratingStar';
// const CardImage = require('../../images/unsplah-1.svg');
export default ({ f, key }: any) => {
  const src = f?.cover_image
  // const srcIns = f?.instructor?.image
  return (
    <Link href={`/en/course/${f?.slug}`} passHref>
      <div className="card-course" key={key}>
        {f?.cover_image.length > 0 && (
          <Image
            src={src}
            alt="img"
            width="300"
            height="200"
            objectFit="cover"
          />
        )}
        <div className="digit">
          <h4> {add3Dots(f?.title, 25)}</h4>
          <span>{f?.category_tree[0]}</span>
          <div className="digit-price">
            <h3>${f?.price}</h3>
            <h5 className="text-decoration-line">${f?.discounted_price}</h5>
          </div>
        </div>

        <div className="bosan" >
          <img src={f?.instructor?.image} alt="instructor_image" />
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
            {/* <h4>{f?.short_desc}</h4> */}
            <h5>{f?.instructor?.fullname}</h5>
            <p>{f?.instructor?.tagline || "Digital Marketing Expert At Bollot"}</p>
          </div>
        </div>

      </div>
    </Link >
  )

}