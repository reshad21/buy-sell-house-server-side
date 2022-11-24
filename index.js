const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log(user);// browser a dakha jabe na karon ata post method tai console a dakha jbe data server theke send hobe kina
            const result = await usersCollection.insertOne(user);
            res.send(result)

        })

        app.get('/user',async(req,res)=>{
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.log)





app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
