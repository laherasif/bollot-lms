import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
import BlogCard from "../../../src/components/card/BlogCard";
import CartCard from "../../../src/components/card/CartCard";
import CommentCard from "../../../src/components/card/CommentCard";
import CommentCard1 from "../../../src/components/card/CommentCard1";
import CommentCard2 from "../../../src/components/card/CommentCard2";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import { useSelector, RootStateOrAny, useStore, useDispatch } from 'react-redux';
import WishList from "../../../src/components/card/WishList";
import instance from "../../../src/confiq/axios/instance";
import { updateCart } from "../../../src/redux/actions/course/course";
import { SweetAlert } from "../../../src/function/hooks";
// import {largeSpinner}  from '../../../src/components/loader'

const Home: NextPage = () => {
  // const intl = useIntl();
  const [items, setitesm] = useState([0, 1, 2]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});
  const [coupon, setCoupon] = useState('')

  const carts = useSelector((state: RootStateOrAny) => state.cartReducer.AddCart)
  const { BookMark } = useSelector((state: RootStateOrAny) => state.cartReducer)

  const totalamount = carts.reduce(function (currentTotal: any, obj: any) {
    let str = obj.price.replace(",", "");
    var price = parseFloat(str);
    if (!isNaN(price)) return currentTotal + price * obj.Quantity;
    return currentTotal;
  }, 0).toFixed(2)

  // let totalamount = carts.reduce((total: number, product: any) => total + parseFloat(product.price) * product.Quantity, 0).toFixed(2)


  const dispatch = useDispatch()



  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])


  const saveDiscount = async () => {
    try {
      setLoad(true)
      let res = await instance.post('api//check-coupon', { coupon_code: coupon })
      if (res.data.success === true) {
        dispatch(updateCart(res.data.response.coupon))
        setLoad(false)

        SweetAlert({ icon: 'success', text: res.data.message })
        setCoupon('')
      }
      else {
        setError(res.data.error)
        setLoad(false)
      }
    }
    catch (err) {
      SweetAlert({ icon: 'error', text: err })

    }

  }

  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>
        <div className="container-3">
          {loading ? <div style={{ textAlign: 'center', margin: '9rem' }}>
            <Spinner animation="border" />
          </div> :
            <>
              <div className="shipping-2">
                <h3>Shopping Cart</h3>
                <p>{carts && carts.length} Course in cart</p>
              </div>

              <div className="d-flex hdsafjf-dsa" style={{ justifyContent: 'space-between' }}>
                {carts.length > 0 ? <>
                  <div className="w-100">
                    {
                      carts.map((item: object, index: number) => <CartCard item={item} key={index} />)
                    }
                    {/* <div>
                      <h3>Recently wishlisted</h3>
                      {

                        BookMark.map((item: object, index: number) => <WishList item={item} key={index} />)
                      }
                    </div> */}
                  </div>

                  <div className="photo-maker-2">
                    <div className="d-flex justify-content-between">
                      <h4>Total</h4>
                      <h4>
                        ${totalamount}
                        {/* <span>$49.99 (76% off)</span> */}
                      </h4>

                    </div>
                    <Link href="/en/checkout">
                      <button className="btn-2s w-100 my-4">Checkout</button>
                    </Link>
                    {/* <h5>Promotions:</h5>
                    <h6>
                      <Icons name="c34" />
                      <p className="mt-4" style={{ paddingLeft: '10px' }}>
                        ST11MT22122 is applied

                      </p>
                    </h6> */}
                    <div className="btnn-1">
                      <input placeholder="Enter Coupon" name="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                      <button onClick={() => saveDiscount()}>
                        {load ?
                          <Spinner animation="border" />
                          :
                          "Apply"}
                      </button>

                    </div>
                      {error?.coupon_code && <div className="invalid mt-1">{error?.coupon_code[0]}</div>}
                  </div>
                </> :
                  <div className="nofdaisf-sdnew" style={{ width: '100%' }}>
                    <Icons name="c43" />
                    <p>Your cart is empty. Keep shopping to find a course!</p>
                    <Link href="/en/courses">
                      <button className="btn-2s my-4">Keep Shopping</button>
                    </Link>
                  </div>
                }
              </div>

            </>
          }
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
