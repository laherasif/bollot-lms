import React from 'react'
import Icons from '../icons'
import Link from 'next/link'
const SucessCheckout = () => {
    return (
        <div>
            <div className="container-3">
                <div className="shipping-2"></div>
                <div className="alert alert-success mt-4"> You order Successfully Checkout  </div>

                <div className="nofdaisf-sdnew">
                    <Icons name="c43" />
                    <p>Your cart is empty. Keep shopping to find a course!</p>
                    <Link href="/en/courses">
                        <button className="btn-2s my-4">Keep Shopping</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default SucessCheckout