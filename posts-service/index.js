import express from "express"
import bodyParser from "body-parser"
import { randomBytes } from "crypto"
import cors from "cors"
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// GET all posts 
app.get("/posts", (req, res) => {
    res.json(posts)
})

// POST new post
app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex")
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    // call event-bus
    await axios.post("http://localhost:5005/events", {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).json(posts)
})

// Recieve any event that is coming from event-bus
app.post("/events", (req, res) => {
    console.log("Event recieved: ", req.body.type);

    res.send({})
})

app.listen(5000, () => {
    console.log('Listening on 5000');
});