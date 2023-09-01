require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function finishService(req, res) {
    try {
        console.log('-------------------------------------');
        const { customer, payment_method } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1400,
            currency: 'eur',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: { enabled: true },
            customer,
            payment_method,
            // return_url: 'https://google.com',
            off_session: true,
            confirm: true,
        });
        res.json(paymentIntent)
    } catch (err) {
        // Error code will be authentication_required if authentication is needed
        console.log('Error code is: ', err);
        // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
        // console.log('PI retrieved: ', paymentIntentRetrieved.id);
    }

}

module.exports = {
    finishService,
};