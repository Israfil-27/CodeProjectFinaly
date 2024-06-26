import mongoose from "mongoose";
import dotenv from "dotenv";
import Colors from "colors";
import users from "./data/users.js"
import products from "./data/products.js";
import User from "./models/userModels.js";
import Product from "./models/productsModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";





dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProduct = products.map((product)=>{
        return {...product,user:adminUser}
    })
    await Product.insertMany(sampleProduct)
    console.log("data imported".green.inverse);
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
};

const destroyData =async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data destroy".red.inverse);
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2]=== "-d") {
    destroyData()
}
else{importData()}