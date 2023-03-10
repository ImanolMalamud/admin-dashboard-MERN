import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    const productsWithStats = await Promise.all(
      products.map(async product => {
        const stat = await ProductStat.find({
          productId: product._id,
        })

        console.log(product)

        // When we use Promise.all with MongoDB, we use this "product._doc" to return all the product information
        return {
          ...product._doc,
          stat,
        }
      })
    )

    res.status(200).json(productsWithStats)
  } catch (error) {
    res.satus(404).json({ message: error.messsage })
  }
}
