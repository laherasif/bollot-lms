import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React, { useState } from "react"
import PaymentForm from "./paymentForm"
import { Modal , Button  } from 'react-bootstrap'

const PUBLIC_KEY = "pk_test_51KdbUqClKeR1kzza4zH3iiG3UwHY8K29bieZ50VV0BnCtQLQOHuEis2zLBU6ZpjUUibOEmzL6Av9NZelnF8m8uOk00c0mEUCVY"

const stripeTestPromise = loadStripe(PUBLIC_KEY)



export default function StripeContainer({ openToggle , open}:any) {
	const [show, setShow] = useState(open);

    const handleClose = () =>{
         setShow(false)
         openToggle(false)
        }

	return (
		<Elements stripe={stripeTestPromise}>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add Payment Method</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PaymentForm  />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" >Add</Button>
				</Modal.Footer>
			</Modal>
		</Elements>
	)
}