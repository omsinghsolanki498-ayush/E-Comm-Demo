const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createSession = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    console.log("PRODUCT:", product);
    console.log("QUANTITY:", quantity);
    console.log("CLIENT URL:", process.env.CLIENT_URL);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
            },

            unit_amount: Math.round(Number(product.price) * 100),
          },

          quantity: Number(quantity) || 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/dashboard`,

      cancel_url: `${process.env.CLIENT_URL}/payment`,
    });

    console.log("STRIPE SESSION CREATED:", session.id);

    res.status(200).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log("STRIPE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
};