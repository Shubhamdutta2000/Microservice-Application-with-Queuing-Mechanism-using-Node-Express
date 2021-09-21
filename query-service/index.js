import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// MOCK UP
// {
//     "POST_ID": {
//         id: "POST_ID",
//         title: "POST_TITLE",
//         comments: [
//             { id: "COMMENT_ID_1", content: "COMMENT_BODY_1", status: "pending" }
//             { id: "COMMENT_ID_2", content: "COMMENT_BODY_2", status: "pending" }
//         ]
//     }
// }


const handleEvent = (type, data) => {

    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        const comment = post.comments.find((comment) => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}


// get full listing pf posts and comments
app.get("/posts", (req, res) => {
    res.send(posts)
})

// receive events from event-bus (3 types of event - PostCreated and CommentCreated, CommentUpdated)
app.post("/events", (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({})
})

app.listen(5002, async () => {
    console.log('Listening on 5002');

    // get events data from event-bus if the qery-service goes down 
    const res = await axios.get("http://localhost:5005/events");

    for (var event of res.data) {
        console.log("Processing event: ", event.type);

        handleEvent(event.type, event.data);
    }

});