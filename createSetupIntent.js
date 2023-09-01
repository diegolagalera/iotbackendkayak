require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createSetupIntent(req, res) {
    console.log('ppppppppppppppppppppppppppppppppppppppppppppppppp');
    const { name, email } = req.body;

    stripe.setupIntents.create()
        .then(paymentIntent => {
            res.json({ clientSecret: paymentIntent.client_secret });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while creating the payment intent' });
        });
}

module.exports = {
    createSetupIntent,
};