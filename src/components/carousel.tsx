import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useEffect, useState } from 'react';
import instance from '../confiq/axios/instance';
export default () => {
  const [banner, setBanners] = useState([])

  useEffect(() => {
    try {
      let fetchMembership = async () => {
        let res = await instance.get('api//get-banners')
        console.log("Res", res)
        setBanners(res.data.response.banners)
      }
      fetchMembership()
    }
    catch (err) { }
  }, [])

  return (
    <div className='kdsfdpd-dsfasdnf'>

      <Carousel showStatus={false} showThumbs={false} showArrows={false} infiniteLoop={true}>
        {banner && banner.map((b: any) => (
          <div>
            <section className="container-3 flex">
              <div className="text-learning" style={{background : `url(${b?.banner_image})` , backgroundRepeat:'no-repeat' , backgroundSize:'cover'}}>
                <div className="data">
                  <h2 className="data-head">{b?.banner_title}</h2>
                  <p className="data-par">
                    {b?.banner_text}
                  </p>
                </div>
                <div className="sign">
                  <button onClick={() => window.open(b?.banner_link)} className="btn-2-5">{b?.banner_link_text}</button>
                </div>
              </div>
            </section>
          </div>
        ))}

      </Carousel>
    </div>
  )
}
