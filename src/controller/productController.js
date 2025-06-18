import { v2 as cloudinary } from "cloudinary";


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
        size:JSON.parse(size)
      }
        
        res.json({})
    } catch (error) {
        console.log(error);
        
    }
}

// list product
export const listProduct = async (req, res)=>{

}

export const removeProduct = async(req, res)=>{

}

export const singleProduct = async (req, res)=>{

}