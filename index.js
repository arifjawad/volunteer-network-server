const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("SERVER says: Im in");
})
app.get('/addEvents', (req, res) => {
    res.send("SERVER says: Im in");
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sjlqb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
    console.log("DB connected with server");
    app.post('/addEvents', (req, res) => {
        const newEvent = req.body;
        console.log("adding new event", newEvent)
        eventCollection.insertOne(newEvent)
            .then(result => {
                console.log(result)
            })

    })

    app.get('/events', (req, res) => {
        eventCollection.find()
            .toArray((err, items) => {
                // console.log('from database', items);
                res.send(items);
            })
    })
    // client.close();
});


app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})