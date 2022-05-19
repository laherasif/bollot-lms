import moment from "moment";
import React from "react";
import Icons from "../icons";
import Rating from "./ratingStar";
export default ({ item, key }: any) => {
  console.log("Rev" , item )
  return (
    <div className="arewosjerer">
      <div className="f-reviews-sie">
        <div className="mdsafis-ejamd">
          <div>
            <img src="/usr1.png" />
          </div>
          <div>
            <h6>Minaxi Shantaram H.</h6>
            <div className="kjadsf-senr">
              <Rating value={item?.rating} />

              <p style={{marginLeft:'10px'}}>{ moment(item?.created_at).fromNow()}</p>
            </div>
            <div className="kdjsafkosderddc">
              <p >
               {item?.review}
              </p>
              <p>Was this review helpful?</p>
            </div>
            <div className="kajfnds-ejrise">
              {/* <button>
                <Icons name="lk1" />
              </button>
              <button>
                <Icons name="lk2" />
              </button> */}

              {/* <p>Report</p> */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
