import React, { useState, useEffect } from 'react';
import Icons from '../../icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SaveCart } from '../../redux/actions/course/course'
import Rating from '../ratingStar';
import Link from 'next/link'
import InfoCart from '../cartInfoPopup';
export default ({ cours }: any) => {
  console.log('course', cours)
  const [toglecart, setTogalcart] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)

  const dispatch = useDispatch()



  const { AddCart } = useSelector((state: RootStateOrAny) => state.cartReducer)
  let check = AddCart?.some((a: any) => a.id === cours?.id)

  useEffect(() => {
    // let findCart = AddCart?.includes({id : 3} )
    for (let index = 0; index < AddCart?.length; index++) {
      const element = AddCart[index].id;
      if (element === cours?.id) {
        setTogalcart(element)

      }
    }
  }, [])

  const RegisterCart = () => {

    let pair = { Quantity: 1 };
    let newObj = { ...cours, ...pair }
    dispatch(SaveCart(newObj))

    setShowPopUp(true)

  }

  console.log("price", (cours?.discounted_price), parseFloat(cours?.price))

  let str = cours.price.replace(",", "");
  let strds = cours.discounted_price.replace(",", "");
  var priceReal = parseFloat(str);
  var priceDiscount = parseFloat(strds);

  return (
    < div style={{ position: 'relative', width: '100%' }}>

      <div className="photo-maker" style={{ cursor: 'pointer', position: 'relative' }} >
        <div className="photo-maker-1" style={{ cursor: 'pointer' }}>

          <img src={cours?.cover_image} alt="course_image" />
          <div className="w-100">
            <Link href={`/en/course/${cours?.slug}`} passHref>
              <div className="sajkdf-dasas">
                <div className="f-col">
                  <h3>
                    {cours?.title}

                  </h3>
                  <span>{cours?.short_desc}</span>

                  <p className="mb-2" style={{fontSize:'14px' , color:'darkgray'}}>
                    by Instructor {cours?.instructor?.fullname}

                  </p>
                  <div className="d-flex justify-content-between fdsfads-sadd">
                    <h5 className="mb-2">
                      {cours?.avg_rating.aggr_rating}
                      <div className='d-flex'>
                        <Rating value={cours?.avg_rating.aggr_rating} />
                        {cours?.avg_rating.aggr_rating > 0 ? <span style={{ marginLeft: '10px', paddingTop: '1px', fontSize: '14px' }}>({cours?.avg_rating.aggr_rating})</span> : null}
                      </div>
                    </h5>
                    
                  </div>
                  <h6 className="mb-2">
                    {cours?.lectures_count} Lectures
                  </h6>
                </div>
                <div className="">
                  <h6 className="jdsfd-sad">
                    ${cours?.price}
                    <br />
                    {
                      priceReal > priceDiscount ?
                        <h5 className="text-decoration-line">${cours?.discounted_price}</h5>
                        : null
                    }
                  </h6>


                </div>
              </div>
            </Link>
            {check ? ""
              :
              <div className="d-flex justify-content-end jdsafd-dsad" onClick={() => RegisterCart()}>
                <Icons name='c42' />
              </div>
            }
          </div>



        </div>
      </div>
      {
        toglecart === cours?.id ?
          <Link href="/en/checkout">
            <div style={{ position: 'absolute', top: '35%', left: "45%", right: 0, bottom: 0 }}>
              <button className='btn-2s'>Proceed to Cart </button>
            </div>
          </Link>
          : null
      }
      {/* {loading &&
        <div style={{ backgroundColor: 'lightcyan', width: '100%', height: '100%', position: 'absolute' , zIndex:'999'}}>
          <Spinner animation="border" />
        </div>
      } */}

      {showPopUp && <InfoCart Course={cours} />}
    </div >
  )
}