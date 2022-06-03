import React from "react";
import Image from "next/image";
import Link from "next/link";
import { add3Dots } from "../../function/hooks";
import moment from "moment";
// import  CardImage from "/images/news1.png";
export default ({ news }: any) => {
  return (
    <Link href={`/en/newspost/${news?.id}`}>
      <div className="card-item">
        <div className="">
          <img className="images-2" src={news?.cover_image  } alt="" />
          <h3>{news?.title}</h3>
          <h4>
            By <span>{news?.uploaded_by?.fullname}</span>
          </h4>
          <div className="mon">
            <h5>{moment(news?.createdAt).format('ll')} </h5>
            { news?.comment_count > 0 ? 
            <h5 className="sfsdfsd-s">{news?.comment_count} comment</h5>
            : null }
            {/* <h5 className="sfsdfsd-s">7 shares</h5> */}
          </div>
          <div className="dklsfjsdf-dsf"></div>
          <p>
            <div dangerouslySetInnerHTML={{ __html: add3Dots(news?.full_content, 50) }} />
            {/* {add3Dots(news?.full_content, 50)} */}
            {/* {news?.full_content.replace(/^"(.*)"$/, '$1')} */}
          </p>
        </div>
      </div>
    </Link>
  );
};
