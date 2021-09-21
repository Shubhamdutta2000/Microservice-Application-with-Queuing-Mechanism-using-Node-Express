import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// store all events
const events = [];

app.post("/events", async (req, res) => {
    const event = req.body;

    events.push(event);

    await axios.post("http://localhost:5000/events", event)
    await axios.post("http://localhost:5001/events", event)
    await axios.post("http://localhost:5002/events", event)
    await axios.post("http://localhost:5003/events", event)

    res.send({ status: "ok" })
})

// get all events 
app.get("/events", (req, res) => {
    res.send(events);
})

app.listen(5005, () => {
    console.log('Listening on 5005');
});