import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error->" + error });
  }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error->" + error });
  }
};

//fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    return res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error->" + error });
  }
};

export { addToCart, removeFromCart, getCart };
