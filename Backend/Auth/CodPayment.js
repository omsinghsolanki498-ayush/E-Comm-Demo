const ordermodel = require("../Model/Order");

const Order = async(req, res) => {
    try{

        const {product, quantity,size,address} = req.body;

        const order = await ordermodel.create({
            user : req.user.id,
            product,
            quantity,
            size,
            address,
            paymentMethod:"COD",
            paymentStatus:"pending",
            orderStatus:"placed",
          totalAmount:product.price*quantity,
        });

        res.status(201).json({
            success:true,
            message:"order place successfull",
            order,
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports ={
    Order
}