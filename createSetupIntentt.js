require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createSetupIntentt(req, res) {
    console.log('ppppppppppppppppppppppppppppppppppppppppppppppppp');
    const { customer } = req.body;

    stripe.setupIntents.create({
        customer,
        automatic_payment_methods: {
            enabled: true,
        },
    })
        .then(setupIntent => {
            res.json({ clientSecret: setupIntent.client_secret });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while creating the payment intent' });
        });
}

module.exports = {
    createSetupIntentt,
};