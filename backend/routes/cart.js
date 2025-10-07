const router = require("express").Router();
const User = require("../models/user");
const { authenticationToken } = require("./userAuth");


//add to cart 

router.put("/add-to-cart", authenticationToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if(isBookInCart){
        return res.json({
            status :"success",
            message : "book is already in cart",

        })
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
      return res.json({
            status :"success",
            message : "Book added to cart",

        })
    }
    catch (error) {
    res.status(500).json({ message: "Internal server error" });


  }
});

//remove from cart 

router.put("/remove-from-cart/:bookid", authenticationToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const {id} = req.headers;
    await User.findByIdAndUpdate(id, {
         $pull: { cart: bookid }
         });
      return res.json({
            status :"success",
            message : "Book removed from cart",

        })
    }
    catch (error) {
    res.status(500).json({ message: "Internal server error" });


  }
});

//get cart of a particular user
router.get("/get-user-cart", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred " });
  }
});
module.exports = router;