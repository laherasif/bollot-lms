import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useEffect, useState } from 'react';
import instance from '../confiq/axios/instance';
import { Banners } from '../skeleton/course';
import { SweetAlert } from '../function/hooks';
export default () => {
  const [banner, setBanners] = useState([])

  useEffect(() => {
    try {
      try {
        let fetchMembership = async () => {
          let res = await instance.get('api//get-banners')
          setBanners(res.data.response.banners)
        }
        fetchMembership()
      }
      catch (err) {
        SweetAlert({ icon: 'error', text: err })

      }
    }
    catch (err) {

    }
  }, [])

  return (
    <>
      <div className='kdsfdpd-dsfasdnf'>
        {banner && banner.length > 0 ?
          <Carousel showStatus={false} showThumbs={false} showArrows={false} transitionTime={200} infiniteLoop={true} autoPlay={true}>
            {banner && banner?.map((b: any) => (
              <div>
                <section className="flex">
                  <div className="text-learning" style={{ background: `url(${b?.banner_image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
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
            ))

            }

          </Carousel>
          :
          <Banners />
        }
      </div>
    </>
  )
}
