import React from 'react';
// import Image from "next/image";
import moment from 'moment'
import Link from 'next/link';
import { add3Dots } from '../../function/hooks';
// const CardImage = require('../../images/unsplash-2.jpeg');
export default ({ live, i }: any) => {
  return (
    <Link href={`/en/course/${live?.slug}`} passHref>
      <div className="card-course-1" key={i}>
        <img className="images-2" src={live?.cover_image} alt="" />

     

        <div className="digit">
          <h4> {add3Dots(live?.title, 25)}</h4>
          <span style={{ paddingLeft: '10px' }}>{live?.category_tree[0]}</span>
          <div className="digit-price">
            <h3 style={{ paddingLeft: '5px' }} >${live?.price}</h3>
            <h5 className="text-decoration-line">$84.99</h5>
          </div>
        </div>

        <div className="start">
          <h2>Starting from:</h2>
          <span>{moment(live?.schedule[0].date).format('LL')}</span>
        </div>
        <div className='card-course-rel align-items-center '>

          <div>
            <img src={live?.instructor?.image} alt="instrctor" />
          </div>
          <div>
            <h5>{live?.instructor?.fullname}</h5>
            <p>{live?.category_tree[0]} Expert at Bolloot</p>
          </div>
        </div>
      </div>
    </Link>
  )


}