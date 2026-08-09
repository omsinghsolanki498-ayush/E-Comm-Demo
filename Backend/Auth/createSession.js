const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 const createSession = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: product.name,
              images: [product.image], // use image, not images
            },

            unit_amount: product.price * 100,
          },

          quantity: quantity,
        },
      ],

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/dashboard`,

      cancel_url: `${process.env.CLIENT_URL}/payment`,
    });

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports={
    createSession
}