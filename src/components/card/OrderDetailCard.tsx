import React from 'react';
export default ({ cart, key }: any) => {
  return <div className="img-flex my-4" key={key}>
    <img src={cart.cover_image} alt="caover_imag" />
    <div className="d-flex justify-content-between">
      <div>
        <h5>
          {cart.title}
        </h5>
      </div>
      <div className="adfdishfsadf-fsaf">
        <h4>${cart.price}</h4>
        <span>${cart.price}</span>
      </div>
    </div>
  </div>
}