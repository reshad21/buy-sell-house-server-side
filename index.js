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

// db name:buySellHouse
// db password:e2KBOaVcKe5aEyzJ


const uri = "mongodb+srv://buySellHouse:e2KBOaVcKe5aEyzJ@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const usersCollection = client.db("buySellHouse").collection("users");
        const productCollection = client.db("buySellHouse").collection("products");

        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log(user);// browser a dakha jabe na karon ata post method tai console a dakha jbe data server theke send hobe kina
            const result = await usersCollection.insertOne(user);
            res.send(result)

        })

        app.get('/user', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result);

        })

        // products collection all code
        app.post('/products', async (req, res) => {
            const products = req.body;
            console.log(products);
            const result = await productCollection.insertOne(products)
            res.send(result);
        })

        // find a specific user all products
        app.get('/products', async (req, res) => {
            console.log(req.query.email);
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(console.log)





app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
