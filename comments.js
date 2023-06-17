// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Create a route handler
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a route handler
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get the comments array for this post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the comments array
    comments.push({ id: commentId, content });

    // Set the comments array for this post id
    commentsByPostId[req.params.id] = comments;

    // Send back the new comment
    res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
    console.log('Listening on 4001');
});

// Data
const commentsByPostId = {};
```

### 4.3.9. Query Service

```javascript
// Path: query.js
// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Create express app
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Create a route handler
app.get('/posts', async (req, res) => {
    const result = await axios.get('http://localhost:4000/posts');

    res.send(result.data);
});

// Create a route handler
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);

    res.send({});
});

// Start the server
app.listen