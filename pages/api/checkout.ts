// import { NextApiRequest, NextApiResponse } from 'next';

// const stripe = require('stripe')("sk_test_51KdbUqClKeR1kzzag8NYqYGUoqfMisDwtsOTEGtowDhYXeL2qOpEBfTlA8EuOALcZ2y97B297nbhUPREcmMndQ1n00q5sTrQ7o");

// async function CreateStripeSession(req : NextApiRequest, res : NextApiResponse) {
//   const { item } = req.body;
//    console.log("re" , req.body)
//   const redirectURL =
//     // process.env.NODE_ENV === 'development'
//        'http://localhost:3000/'
//     //   : 'https://stripe-checkout-next-js-demo.vercel.app';

//     const transformedItem = {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             images: [item.image],
//             name: item.name,
//           },
//           unit_amount: item.price * 100,
//         },
//         description: item.description,
//         quantity: item.quantity,
//       };

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [transformedItem],
//     mode: 'payment',
//     success_url: redirectURL + '?status=success',
//     cancel_url: redirectURL + '?status=cancel',
//     metadata: {
//       images: item.image,
//     },
//   });

//   res.json({ id: session.id });
// }

// export default CreateStripeSession;

import { NextApiRequest, NextApiResponse } from "next";

// import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
// import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51KdbUqClKeR1kzzag8NYqYGUoqfMisDwtsOTEGtowDhYXeL2qOpEBfTlA8EuOALcZ2y97B297nbhUPREcmMndQ1n00q5sTrQ7o",
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-03-02",
  }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const { item } = req.body;
    try {
      // Validate the amount that was passed from the client.

      // const transformedItem = {
      //   currency: "usd",
      //   description: "my first cart",
      //   amount: 12000,
      //   name: "course_one",
      //   quantity: 1,
      // };

      const verificationSession =
        await stripe.identity.verificationSessions.create({
          type: "document",
        });

      // Create Checkout Sessions from body params.
      // const params: Stripe.Checkout.SessionCreateParams = {
      //   submit_type: "pay",
      //   payment_method_types: ["card"],
      //   line_items: [transformedItem],
      //   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${req.headers.origin}/donate-with-checkout`,
      // };
      // const checkoutSession: Stripe.Checkout.Session =
      //   await stripe.checkout.sessions.create(params);

      res.status(200).json(verificationSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
