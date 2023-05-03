import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });

        // When we use Promise.all with MongoDB, we use this "product._doc" to return all the product information
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.satus(404).json({ message: error.messsage });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // Customers are clients with the parameter role: "user" (there are other roles such as "admin" and "superadmin")
    // We want to avoid returning the value of the user's password
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.satus(404).json({ message: error.messsage });
  }
};
