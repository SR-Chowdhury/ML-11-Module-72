require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

/**
 * ---------------------------------------------------------------------------
 */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hcsitps.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();

        const productsCollection = client.db("emaJohnDB").collection("products");

        app.get('/totalProducts', async (req, res) => {
            const result = await productsCollection.estimatedDocumentCount();
            res.send({totalProducts : result});
        });

        app.get('/products', async (req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

/**
 * ---------------------------------------------------------------------------
 */






app.get('/', (req, res) => res.send('Bismillahir Rahmanir Rahim'));
app.listen(port, () => console.log(`Server is running from port : ${port}`));