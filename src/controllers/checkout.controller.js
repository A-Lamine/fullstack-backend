const stripe = require('stripe')(process.env.PRIVATE_KEY);

const initiateStripeSession = async (req,res) => {
    const { marque, totalPrice } = req.body
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: marque
              },
              unit_amount: totalPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/confirmation`,
        cancel_url: `${req.headers.origin}/cancel`,
      });
    return session;
}

exports.createSession = async function (req, res) {
    try {
      const session = await initiateStripeSession(req);
      res.status(200).json({
        id: session.id,
        price: session.amout_total,
        currency: session.currency,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }; 