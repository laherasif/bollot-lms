import { NextApiRequest, NextApiResponse } from 'next';

// import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
// import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51KdbUqClKeR1kzzag8NYqYGUoqfMisDwtsOTEGtowDhYXeL2qOpEBfTlA8EuOALcZ2y97B297nbhUPREcmMndQ1n00q5sTrQ7o", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount;
    try {
      // Validate the amount that was passed from the client.
      
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Custom amount donation',
            amount: amount,
            currency: 'US',
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}