import orderModel from "../models/orderModel.js";
export const createOrderController = async (req, res) => {
  try {
    const { cart, total, address } = req.body;
    const order = new orderModel({
      products: cart,
      payment: { success: true, amount: total },
      buyer: req.user._id,
      address,
    });
    await order.save();
    res.status(201).send({ success: true, message: "Order placed", order });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};
