import express from "express"
import bodyParser from "body-parser"
import axios from "axios";

const app = express();
app.use(bodyParser.json());

// Event Moderation for comment status updation and send the response to event-bus
app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('slang') ? "rejected" : "approved";

        await axios.post("http://localhost:5005/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        })

        res.send({})
    }
})

app.listen(5003, () => {
    console.log('Listening on 5003');
});