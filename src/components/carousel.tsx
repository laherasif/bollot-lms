import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React from 'react';
export default ()=>{
    return    <div className='kdsfdpd-dsfasdnf'>
     <Carousel showStatus={false} showThumbs={false} showArrows={false} infiniteLoop={true}>
       <div>
       <section className="container-3 flex">
          <div className="text-learning">
            <div className="data">
              <h2 className="data-head">Learning that gets to</h2>
              <p className="data-par">
                Skills for your present(and you future).get started with us
              </p>
            </div>
            <div className="sign">
              <button className="btn-2-5">Sign Up</button>
            </div>
          </div>
        </section>
       </div>
       <div>
       <section className="flex">
          <div className="text-learning">
            <div className="data">
              <h2 className="data-head">Learning that gets to</h2>
              <p className="data-par">
                Skills for your present(and you future).get started with us
              </p>
            </div>
            <div className="sign">
              <button className="btn-2-5">Sign Up</button>
            </div>
          </div>
        </section>
       </div>
    </Carousel>
  </div>
}
