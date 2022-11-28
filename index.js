const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server is running');
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const usersCollection = client.db("buySellHouse").collection("users");
        const productCollection = client.db("buySellHouse").collection("products");
        const bookingsCollection = client.db("buySellHouse").collection("bookings");
        const categoryCollection = client.db("buySellHouse").collection("categories");

        // =============== categoryCollection all api ============== //
        app.get('/category', async (req, res) => {
            const query = {}
            const result = await categoryCollection.find(query).toArray()
            res.send(result);

        })

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category: id }
            const result = await productCollection.find(query).toArray();
            res.send(result);

        })


        // =============== user collection code =============== //
        app.post('/user', async (req, res) => {
            const user = req.body;
            // console.log(user);
            // browser a dakha jabe na karon ata post method tai console a dakha jbe data server theke send hobe kina
            const result = await usersCollection.insertOne(user);
            res.send(result)

        })

        app.get('/user', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/user/:id',async(req,res)=>{
            const id = req.params.id;
            const query = { email: id }
            const result = await usersCollection.findOne(query);
            res.send(result)

        })

        
        

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result);

        })

        // ========= products collection all code =========== //
        app.post('/products', async (req, res) => {
            const products = req.body;
            console.log(products);
            const result = await productCollection.insertOne(products)
            res.send(result);
        })

        // find a specific user all products
        app.get('/products', async (req, res) => {
            // console.log(req.query.email);
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })

        app.delete('/products/:id', async (req, res) => {
            console.log(req.params.id);
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.send(result);

        })

        app.put('/products/:id', async (req, res) => {
            // console.log(req.params.id);
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'available'
                }
            }
            const result = await productCollection.updateOne(query, updatedDoc);
            res.send(result);

        })

        // advertizer section code
        app.get('/products/home', async (req, res) => {
            let query = {}
            if (req.query.role) {
                query = {
                    role: req.query.role
                }
            }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })


        // =============== booking collection all code ================ //
        app.post('/bookings', async (req, res) => {
            const bookings = req.body;
            console.log(bookings);
            const result = await bookingsCollection.insertOne(bookings)
            res.send(result);
        })

        app.get('/bookings', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        })

        app.put('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'paid'
                }
            }
            const result = await bookingsCollection.updateOne(query, updatedDoc);
            res.send(result);
        })


        // ================ admin all seller and buyer find out =============== //
        app.get('/admin/allseller',async(req,res)=>{
            // res.send('allseller')
            let query = {}
            if (req.query.role) {
                query = {role:req.query.role }
            }
            const result = await usersCollection.find(query).toArray()
            res.send(result);
        })

        app.get('/admin/allbuyer',async(req,res)=>{
            // res.send('allseller')
            let query = {}
            if (req.query.role) {
                query = {role:req.query.role }
            }
            const result = await usersCollection.find(query).toArray()
            res.send(result);
        })

        // seller verification route create
        app.put('/admin/allseller/:id',async(req,res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updatedDoc = {
                $set : {
                    type: 'verified'
                }
            }
            const result = await usersCollection.updateOne(query,updatedDoc)
        })


    }
    finally {

    }
}
run().catch(console.log)

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
