const productModel = require("../Model/ProductModel");

 const getotherproduct = async (req, res) => {
    try {
        const { id } = req.params;

        // without current product

        const products = await productModel.find({
            _id: { $ne: id }, //remove current product
        });

        res.status(200).json({
            success:true,
            products,
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            success:false,
            message:"server error"
        });     
    }
}

module.exports={
    getotherproduct,
}