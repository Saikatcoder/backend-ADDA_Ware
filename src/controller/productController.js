import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


// add product
export const addProduct = async (req, res)=>{
    try {
        const {name, description, price , category, subcategory, size, bestSeller}= req.body;
        if (!name || !price || !category || !description || !size) {
         return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
        
        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)
       
        let imagesUrl = await Promise.all(
                images.map(async (item) => {
            try {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return null;
    }
  })
);

imagesUrl = imagesUrl.filter((url) => url !== null);

      const productData = {
        name,
        description,
        category,
        price:Number(price),
        subcategory,
        bestSeller:bestSeller === "true" ? true : false,
        size:JSON.parse(size),
        image:imagesUrl,
        date:Date.now()
      }
      const product = new productModel(productData);
      await product.save()
    res.json({success:true,message:'product Added'})

    } catch (error) {
        console.log(error);
        
    }
}

// list product
export const listProduct = async (req, res)=>{
    try {
        const products = await productModel.find({})
        res.json({success:true, products})

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"product not listed"
        })
    }
}

// remove product 
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Error removing product:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}