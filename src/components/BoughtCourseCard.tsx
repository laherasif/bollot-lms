import moment from "moment";
import Link from "next/link";
import React from "react";
import Icons from "../icons";
export default ({ item, key }: any) => {
  return (
    <Link href={`/en/course/${item?.slug}`}>
      <div className="bought-course-card-p" key={key} style={{cursor:'pointer'}}>
        <div className="bought-course-card">
          <div>
            <img src={item?.cover_image || "/bc-1.png"} />
          </div>
          <div className="w-100">
            <div className="kdafkdsm-asekfien">

              <h4>{item?.title} </h4>
              <div className="jdsfad-sjier">
                <h4>{item?.avg_rating?.avg_rating}</h4>
                <div>
                  <Icons name="lk3" />

                </div>
              </div>
              <div className="jdsfad-sjier">
                <div>
                  <Icons name="lk4" />
                </div>
                <p>{item?.avg_rating?.total_reviews}</p>
              </div>

              <div className="lmcadsiod0je2e">
                <h2>${item?.price}</h2>
                <h3>${item?.discounted_price}</h3>
              </div>
            </div>
            <div className="jhasdkfi0asnw-waene">
              {/* <h5>32 total hours</h5> */}
              <p>
                <Icons name="lk6" />
                Updated {moment(item?.createdAt).format('ll')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
