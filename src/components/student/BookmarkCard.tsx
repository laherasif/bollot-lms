import React from 'react';
import Rating from '../ratingStar';
export default ({ BookMark, key }: any) => {
  return (
    <>
      <div className="cm-web kdsjf0ew-ew" key={key}>
        <div className="dhafusd9we0sd-p">
          <div>
            <img src={BookMark?.cover_image || "/assets/images/purple.svg"} alt="book-mark" />
          </div>
          <div className="assahdwe0-ass">
            <img src="/assets/images/heart.svg" alt="hert_image" />
          </div>
        </div>
        <div className="sdhafadsie-sd">
          <p  >By {BookMark?.instructor?.fullname }</p>
          <h3>{BookMark?.title}</h3>
          <div className="jdsifsd-ds">
            <div />
            <div className="sha9dasd0em">
              <div className='lasjdsad-sdjsa'>
               <Rating value={BookMark?.avg_rating?.aggr_rating}/>
              </div>
              <p>{BookMark?.avg_rating?.aggr_rating}({BookMark?.avg_rating?.total_reviews})</p>
            </div>
          </div>
          <h3>${BookMark?.price}</h3>
        </div>
      </div>
    </>
  )

}