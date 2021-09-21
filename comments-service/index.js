import express from "express"
import bodyParser from "body-parser"
import { randomBytes } from "crypto"
import cors from "cors"
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};
// MOCK up
// {
//     "POST_ID": [{
//         id: "COMMENT_ID",
//         content: "COMMENT_BODY"
//     }]
// }

// GET all comments attached to particular post 
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostID[req.params.id] || []);
})

// POST new post attached to particular post
app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex")
    const { content } = req.body;

    const comments = commentsByPostID[req.params.id] || [];
    comments.push({
        id: commentId,
        content: content,
        status: "pending"
    })
    commentsByPostID[req.params.id] = comments

    // call event-bus
    await axios.post("http://localhost:5005/events", {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content: content,
            postId: req.params.id,
            status: "pending"
        }
    })

    res.status(201).json(commentsByPostID)
})

// Recieve any event that is coming from event-bus
// If event type is of 'CommentModerated' then update that comment status and send 'CommentUpdated' event to event-bus again 
app.post("/events", async (req, res) => {
    console.log("Event recieved: ", req.body.type);

    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { postId, id, status, content } = data;
        const comments = commentsByPostID[postId];

        console.log(comments);

        const comment = comments.find((comment) => comment.id === id);
        comment.status = status;

        await axios.post("http://localhost:5005/events", {
            type: "CommentUpdated",
            data: {
                id: id,
                postId: postId,
                content: content,
                status
            }
        })

    }
    res.send({})
})


app.listen(5001, () => {
    console.log('Listening on 5001');
});