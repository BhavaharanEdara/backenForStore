const express = require('express')
const app = express()
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())

const {initialiseDatabase} = require('./db/db.connect')
const Product = require('./models/product.model')
const Category = require('./models/category.model')
const Wishlist = require('./models/wishlist.model')
const Address = require('./models/address.model')
console.log(initialiseDatabase)
initialiseDatabase()

const createProduct = async(productData)=>{
  try{
    const newProduct = new Product(productData);
    const saveProduct = await newProduct.save();
    return saveProduct
  }
  catch(error){
    console.log(error)
  }
}



const createCategory = async(category)=>{
  try{
    const getCategory = await Category.findOne({name:category});
    if(!getCategory){
      const newCategory = new Category({name:category})
      const savedCategory = newCategory.save();
    }
  }
  catch(error){
    console.log(error);
  }
}


app.post("/products", async (req,res)=>{
  try{
    const newProduct = await createProduct(req.body);
    const addCategory = await createCategory(req.body.category)

    res.status(200).json({msg:"Added product sucessfully", product:newProduct})
  }
  catch(error){
    res.status(400).json({error:"Failed to add product"})
  }
})

const getProductById = async (id)=>{
  try{
    const product = await Product.findById(id);
    return product
  }
  catch(error){
    console.log(error);
  }
}

app.get("/products/:id", (req,res)=>{
  try{
    const product = getProductById(req.params.id);
    if(product){
      res.send(product);
    }
    res.status(404).json({error:"Product not found"})
  }
  catch(error){
    res.status(400).json({error:"Failed to read product."})
  }
})


const getProductByCategory = async (category)=>{
  try{
    const product = await Product.find({category:category});
    return product
  }
  catch(error){
    console.log(error);
  }
}
app.get("/products/category/:category", (req,res)=>{
  try{
    const product = getProductByCategory(req.params.category);
    if(product){
      res.send(product);
    }
    res.status(404).json({error:"Product not found"})
  }
  catch(error){
    res.status(400).json({error:"Failed to read product."})
  }
})

const getAllProducts = async()=>{
  try{
    const allProducts = await Product.find();
    return allProducts
  }
  catch(error){
    console.log(error)
  }
}


app.get("/products", async(req,res)=>{
  try{
    const products = await getAllProducts();
    if(products.length!=0){
      res.send(products);
    }
    else{
      res.status(404).json({error:"No Product found"})
    }
  }
  catch(error){
    res.status(400).json({error:"Failed to read products."})
  }
})

const getAllCategories  = async ()=>{
  try{
    const categories = await Category.find();
    return categories
  }
  catch(error){
    console.log(error)
  }
}


app.get("/categories", async(req,res)=>{
  try{
    const categories = await getAllCategories();
    if(categories.length!=0){
      res.send(categories)
    }
    else{
      res.status(404).json({error:"No Category found"})
    }
  }
  catch(error){
    res.status(400).json({error:"Failed to read products."})
  }

})

const getCategorieById  = async (id)=>{
  try{
    const categories = await Category.findById(id);
    return categories
  }
  catch(error){
    console.log(error)
  }
}


app.get("/categories/:id", (req,res)=>{
  try{
    const categories = getCategorieById(req.params.id);
    if(categories.length){
      res.send(categories);
    }
    else{
    res.status(404).json({error:"Category not found"})
    }
  }
  catch(error){
    res.status(400).json({error:"Failed to read products."})
  }
})

const Cart = require("./models/cart.model")

const getCartItems = async()=>{
    try{
        const items = await Cart.find();
        return items
    }
    catch(error){
        console.log(error)
    }
}
const createCartItem = async(productData)=>{
    try{
      const newProduct = new Cart(productData);
      const saveProduct = await newProduct.save();
      return saveProduct
    }
    catch(error){
      console.log(error)
    }
  }

const updateCartItem = async (data, id)=>{
    try {
       const updatedItem = await Cart.findByIdAndUpdate(id, data, {
        new: true
      }) 
      return updatedItem
    } catch (error) {
        console.log(error)
    }
}

app.post("/cartItems", async(req,res)=>{
    try{
        const item = await createCartItem(req.body);        
        res.status(200).json({msg:"Added product to cart sucessfully", product:item});
      
    }
    catch(error){
        res.status(400).send({error:"Failed to add Item to Cart"});
    }
})

app.put("/cartItems/:id", async(req,res)=>{
    const id = req.params.id
    try{
        const item = await updateCartItem(req.body, id);
        res.status(200).json({msg:"Updated product sucessfully", product: item}) 
    }
    catch(error){
        res.status(400).send({error:"Failed to update Cart Item"})
    }
})
app.get("/cartItems", async(req,res)=>{
    try{
        const cartItems = await getCartItems();
        res.send(cartItems)
    }
    catch(error){
        res.status(400).json({error: "Failed to read Cart Items"});
    }
})
const deleteCartItem = async(id)=>{
  try{
    const deletedItem = await Cart.findByIdAndDelete(id);
    return deletedItem;
  }catch(error){
    console.log(error);
  }
} 

app.delete("/cartItems/:id", async(req,res)=>{
  try{
    const deletedItem = await deleteCartItem(req.params.id);
    res.send(deletedItem)
  }
  catch(error){
    res.status(400).json({errpr: "Failed to delete cart item"})
  }
})

const getWishlistProduct = async()=>{
  try{
    const products = await Wishlist.find({});
    return products
  }
  catch(error){
    console.log(error);
  }
}

const addProduct = async(data)=>{
  try{
      const newProduct = new Wishlist(data);
      const saveProduct = await newProduct.save();
      return saveProduct
  }
  catch(error){
    console.log(error);
  }
}

const removeProduct = async(id)=>{
  try{
      const product = await Wishlist.findOneAndDelete({productId:id});
      return product
  }
  catch(error){
    console.log(error);
  }
}
app.get("/wishlist", async(req,res)=>{
  try{
    const products = await getWishlistProduct();
    res.status(200).send(products)
  }
  catch(error){
    res.status(400).json({error:"Failed to get wishlist products"})
  }
})

app.post("/wishlist", async(req,res)=>{
  try{
    const product = await addProduct(req.body)
    if(!product){
      res.status(400).json({error:"failed to add product"})
    }
    else{
      res.send(product)
    }
  }
  catch(error){
    res.status(400).json({error:"Failed to add wishlist product"})
  }
})

app.delete("/wishlist/:id", async(req,res)=>{
  try{
    const product = await removeProduct(req.params.id);
    
    res.status(200).send(product)
  }
  catch(error){
    res.status(400).json({error:"Failed to remove wishlist product"})
  }
})

const getAddress = async()=>{
  try{
    const addresses = await Address.find();
    return addresses
  }
  catch(error){
    console.log(error)
  }
}

const addAddress = async(data)=>{
  try{
    const newAddress = new Address(data);
    const saveAddress = await newAddress.save();
    return saveAddress
  }
  catch(error){
    console.log(error)
  }
}
const updateAddress = async(data, id)=>{
  try{
    const address = await Address.findByIdAndUpdate(id, data, {new:true})
    return address
  }
  catch(error){
    console.log(error);
  }
}
const deleteAddress = async(id)=>{
  try{
    const address = await Address.findByIdAndDelete(id);
    return address;
  }
  catch(error){
    console.log(error)
  }

}
app.get("/address", async(req,res)=>{
  try{
    const addresses = await getAddress();
    res.send(addresses);
  }
  catch(error){
    res.status(400).json({error:"Failed to get addresses"})
  }
})
app.post("/address", async(req,res)=>{
  try{
    const address = await addAddress(req.body);
    if(!address){
      res.status(500).send("Failed to add address");
    }
    res.status(200).send(address);
  }
  catch(error){
    res.status(400).json({error:"Failed to add addresses"})
  }
})

app.put("/address/:id", async(req,res)=>{
  try{
    const address = await updateAddress(req.params.id, req.body)
    res.status(200).send(address);
  }
  catch(error){
    res.status(400).json({error:"Failed to update address"})
  }
})

app.delete("/address/:id", async(req,res)=>{
  try{
    const address = await deleteAddress(req.params.id);
    res.status(200).send(address);
  }
  catch(error){
    res.status(400).json({error:"Failed to delete addresses"})
  }

})

const PORT = 5000
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
