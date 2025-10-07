const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const user = require("../models/user");
const { authenticationToken } = require("./userAuth");
//place order 

router.post("/place-order", authenticationToken, async(req,res)=>{
    try {
        const {id } = req.headers;
        const {order} = req.body;

        for(const orderData of order){
            const newOrder = new Order({user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();
            //saving order in user model 
            await user.findByIdAndUpdate(id, {$push: {orders: orderDataFromDb}})
        
        // clearing cart 
        await user.findByIdAndUpdate(id, {
            $pull: {cart: orderData._id},
        })
        }
        return res.json({status: "success",
            message: "Order Placed Successfully",
        })
} catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred " });
        
    }
})

//get order history of particular user 
router.get("/get-order-history", authenticationToken, async(req,res)=>{
    try {
        const {id } = req.headers;
        const userData = await user.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        })
        const orderData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: orderData,
        })
        } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred " });
        
    }
})

//get-all-orders ------admin
router.get("/get-all-orders", authenticationToken, async(req,res)=>{
    try {
       
        const userData = await Order.find().populate({
            path: "book",
            
        })
        .populate({
            path: "user",
            
        })
        .sort({ createdAt: -1});
        return res.json({
            status: "success",
            data: userData,
        })
        } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred " });
        
    }
})

//update-order  --- admin
router.put("/update-status/:id", authenticationToken, async(req,res)=>{
    try {
        const {id } = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status})
       
        return res.json({
            status: "success",
            message: "Status Updated Successfully",
        });
        } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred " });
        
    }
})


module.exports = router ;
