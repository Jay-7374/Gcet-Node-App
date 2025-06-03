import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.listen(8080, () => {
  mongoose.connect("mongodb://localhost:27017/gcet");
  console.log('Server Started');
});

const userSchema = new mongoose.Schema({
  name :{type: String},
  email: {type: String},
  pass: {type: String}
});

const user = mongoose.model("users", userSchema);

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number }
});

const Product = mongoose.model("products", productSchema);


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
 return res.send("Good Morning");
});

app.post("/register", async (req,res) => {
  const {name,email,pass} = req.body;
  const result = await user.insertOne({name: name, email: email, pass: pass});
  return res.json(result);
});


app.post("/login", async (req,res) => {
  const {email, pass} = req.body;
  const result = await user.findOne({email: email, pass: pass});
  if(result) {
    return res.json({status: "ok", data: result});
  } else {
    return res.json({status: "error", data: "Invalid Credentials"});
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.get("/greet", (req,res) => {res.send("Greetings!")});

app.get("/name", (req,res) => {res.send("Jaya Prakash")});

app.get("/weather", (req,res) => {res.send("31°C")});

