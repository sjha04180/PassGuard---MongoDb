const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')


const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'PassGuard';

client.connect();


//Get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//save a password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult })
})

//delete a password by id
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult })
})

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })

// // For local testing
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(port, () => {
//     console.log(`✅ Server is running on port ${port}`);
//   });
// }

// Export the app for Vercel's serverless functions
module.exports = app;