import React from "react";
import Image from "next/image";
import Link from "next/link";
import { add3Dots } from "../../function/hooks";
import moment from "moment";
// const CardImage = require("../../images/blog1.png");
export default ({ blog }: any) => {

  return (
    <Link href={`/en/blogpost/${blog?.id}`}>
      <div className="card-item">
        <div className="card-container">
          <img className="images-2" src={blog?.cover_image} alt="" />
          <h3>{blog?.title}</h3>
          <h4>
            By <span>{blog?.uploaded_by?.fullname}</span>
          </h4>
          <div className="mon">
            <h5>{moment(blog?.createdAt).format('ll')} </h5>
            <h5 className="sfsdfsd-s">6 comment</h5>
            {/* <h5 className="sfsdfsd-s">7 shares</h5> */}
          </div>
          <div className="dklsfjsdf-dsf"></div>
          <p>
            <div dangerouslySetInnerHTML={{ __html: add3Dots(blog?.full_content, 150) }} />
          </p>
        </div>
      </div>
    </Link>
  );
};
