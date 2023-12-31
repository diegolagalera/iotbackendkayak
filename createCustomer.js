require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createCustomer(req, res) {
    console.log('ppppppppppppppppppppppppppppppppppppppppppppppppp');
    const { name, email } = req.body;

    stripe.customers.create({
        name,
        email,
        // // You can also add additional parameters here, such as a customer ID or payment method ID
        // metadata: { integration_check: 'accept_a_payment' },
    })
        .then(customer => {
            res.json({ id: customer.id });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while creating the payment intent' });
        });
}

module.exports = {
    createCustomer,
};