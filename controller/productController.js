import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req,res) => {
    try {
        let {name,description,price,category,subCategory,bestseller} = req.body

        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
 
        let productData = {
            name,
            description,
            price :Number(price),
            category,
            subCategory,
            bestseller :bestseller === "true" ? true : false,
            date :Date.now(),
            image1
            
        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
          console.log("AddProduct error")
    return res.status(500).json({message:`AddProduct error ${error}`})
    }
    
}


export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}

export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}
