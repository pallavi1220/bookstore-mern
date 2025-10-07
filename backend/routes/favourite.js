const router = require("express").Router();
const User = require("../models/user");
const { authenticationToken } = require("./userAuth");

// add book to favourite

router.put("/add-book-to-favourite", authenticationToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "book is already in favourite " });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "book added to  favourite " });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete book from favourite

router.put(
  "/remove-book-from-favourite",
  authenticationToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);
      if (isBookFavourite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      }

      return res.status(200).json({ message: "book removed from favourite " });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//get favourite books of a particular user
router.get("/get-favourite-book", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({
      status: "success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred " });
  }
});

module.exports = router;
