const UserModel = require("../Model/User");

const getAllusers = async (req, res) => {
    try {

        const users = await UserModel.find({})
            .select("-password")
            .sort({
                createdAt: -1
            });
          res.status(200).json({
            success:true,
            users,
          });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success:false,
            message:"server error",
        });
    }
}

module.exports = {
    getAllusers
}