const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createPaymentIntent } = require('./createPaymentIntent');
const { createCustomer } = require('./createCustomer');
const { createSetupIntent } = require('./createSetupIntent');
const { createSetupIntentt } = require('./createSetupIntentt');
const { finishService } = require('./finishService');

const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', createPaymentIntent);
app.post('/create-user', createCustomer);
app.post('/create-setup-intent', createSetupIntent)
app.post('/create-setup-intentt', createSetupIntentt)
app.post('/finish-service', finishService)
app.post('/create-customer', async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: 'ee',
      email: 'ee@gmail.com',
    });
    const cardToken = req.body.cardToken; // Token de la tarjeta desde el frontend
    await stripe.customers.createSource(customer.id, {
      source: cardToken,
    });
    res.status(200).json({ message: 'Tarjeta registrada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la tarjeta' });
  }
});
// app.post('/finish-service', async (req, res) => {
//   try {
//     const customerId = req.body.customerId; // ID del cliente en Stripe
//     const amount = req.body.amount; // Monto a cobrar
//     console.log('dentrooo');
//     const charge = await stripe.charges.create({
//       amount: amount * 100, // Convertir a centavos
//       currency: 'eur', // Moneda (puedes cambiarlo según tu necesidad)
//       customer: customerId,
//       description: 'Servicio finalizado',
//     });
//     res.status(200).json({ message: 'Servicio finalizado y cobrado exitosamente' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al finalizar el servicio' });
//   }
// });
app.post('/load-payment-methods', async (req, res) => {
  try {
    console.log(req);
    const customer = req.body.customer; // ID del cliente en Stripe
    // const amount = req.body.amount; // Monto a cobrar
    console.log('dentrooo');
    console.log(req.body.customer);
    const paymentList = await stripe.paymentMethods.list({
      customer,
      type: 'card',
    });
    res.json(paymentList)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al finalizar el servicio' });
  }
});
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});