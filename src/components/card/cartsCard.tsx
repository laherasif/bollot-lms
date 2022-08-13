import React from 'react';
// import Icons from '../../icons';
import { useDispatch } from 'react-redux';
import { DeleteCart } from '../../redux/actions/courses'
// import Rating from '../ratingStar';
import Link from 'next/link'
export default ({ item, key }: any) => {

  const dispatch = useDispatch()
  const {
    id,
    title,
    // rate,
    // time,
    // instructor,
    cover_image,
    price,
    sections
  } = item



  let numberofLect = 0
  sections?.forEach(datum => numberofLect += datum.lectures.length)


  const DeletCart = () => {
    dispatch(DeleteCart(id))
  }

  return (
   
    <div className="photo-maker w-100" key={key}>
      <div className="photo-maker-1">
        <img src={cover_image} alt="cover_image" width="10%" height="50px" style={{objectFit:'cover'}} />
        <div className="w-100">
          <Link href={`/en/course/${item?.slug}`} passHref>
            <div className="sajkdf-dasas" style={{cursor:'pointer'}}>
              <div className="f-col">
                <h3>
                  {title}
                </h3>
                {/* <h4 className="mb-2">
                  by Instructor {instructor?.fullname}


                </h4> */}
                {/* <div className="d-flex justify-content-between fdsfads-sadd">
                  <h5 className="mb-2">
                    <Rating value={3.5} />
                    <span>({3.3} ratings)</span>
                  </h5>
                  <h5 className="mb-2">
                    ${price}
                    <span className="rat ">({rate}% off)</span>
                  </h5>
                </div> */}
                {/* <h6 className="mb-2">
                  {numberofLect} Lectures <span>{time} total hours</span>
                </h6> */}
              </div>
              <div className="">
                <h6 className="jdsfd-sad" style={{fontSize:'16px'}}>${price}</h6>
              </div>
            </div>
          </Link>
          
        </div>
      </div>
    </div >
  )
}