import React, { useState, useEffect } from 'react';
import Icons from '../../icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SaveCart } from '../../redux/actions/course/course'
import Rating from '../ratingStar';
import Link from 'next/link'
import InfoCart from '../cartInfoPopup';
import { Spinner } from 'react-bootstrap';
export default ({ cours }: any) => {

  const [toglecart, setTogalcart] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)

  const dispatch = useDispatch()



  const { AddCart } = useSelector((state: RootStateOrAny) => state.cartReducer)
  let check = AddCart?.some((a:any) => a.id === cours?.id)
 
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
  return (
    < div style={{ position: 'relative' }}>

      {/* <Link href={`/en/course/${cours?.slug}`} passHref> */}
      <div className="photo-maker" style={{ cursor: 'pointer', position: 'relative' }} >
        <div className="photo-maker-1" style={{ cursor: 'pointer' }}>

          <img src={cours?.cover_image} alt="course_image" />
          <div className="w-100">
            <div className="sajkdf-dasas">
              <div className="f-col">
                <h3>
                  {cours?.title}
                </h3>
                <h4 className="mb-2">
                  by Instructor {cours?.instructor?.fullname}

                </h4>
                <div className="d-flex justify-content-between fdsfads-sadd">
                  <h5 className="mb-2">
                    {cours?.avg_rating.aggr_rating}
                    <Rating value={3.3} />
                    <span>({3.3} ratings)</span>
                  </h5>
                  <h5 className="mb-2">
                    ${cours?.price}
                    <span className="rat">(76% off)</span>
                  </h5>
                </div>
                <h6 className="mb-2">
                  78 Lectures
                  {/* <span>12.5 total hours</span> */}
                </h6>
              </div>
              <div className="">
                <h6 className="jdsfd-sad">${cours?.price}</h6>
              </div>
            </div>
            {check ? ""
              :
              <div className="d-flex justify-content-end jdsafd-dsad" onClick={() => RegisterCart()}>
                <Icons name='c42' />
              </div>
            }

          </div>
          {toglecart === cours?.id ?
            <Link href="/en/checkout">
              <div style={{ position: 'absolute', top: '35%', left: "45%", right: 0, bottom: 0 }}>
                <button className='btn-2s'>Go to cart </button>
              </div>
            </Link>
            : null}

        </div>
      </div>


      {/* </Link> */}
      {/* {loading &&
        <div style={{ backgroundColor: 'lightcyan', width: '100%', height: '100%', position: 'absolute' , zIndex:'999'}}>
          <Spinner animation="border" />
        </div>
      } */}

      {showPopUp && <InfoCart Course={cours} />}
    </div>
  )
}