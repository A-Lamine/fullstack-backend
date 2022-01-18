const stripe = require('stripe')("sk_test_51KHW6rHDhohYn0outq44WpsLCj0kjwGsgF5Dwl8jJsiVrBg4yQwdHajFLrmSXk7iLH15kYiKb9VQkbyGULG9hZb10083T26Y2W");

const initiateStripeSession = async (req,res) => {
    const { lamine, totalPrice } = req.body
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: lamine
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