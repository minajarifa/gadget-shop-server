const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 3000;
// middleware
app.use(cors());
app.use(express.json());
// mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63qrdth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// api
app.get("/",(req,res)=>{
    res.send("server is running by gadget shop")
});
// jwt
app.post('/authentication',(req,res)=>{
  const useEmail = req.body;
  const token = jwt.sign(useEmail,process.env.ACCESS_KEY_TOKEN,{expiresIn:"10d"})
  res.send({token});
})
app.listen(port,()=>{
    console.log(`server is running by gadget shop on port, ${port}`)
})