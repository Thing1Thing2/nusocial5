const express = require('express');
const path = require('path');
const cors = require('cors')
const http = require("http");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

// routers
const router = require('./routes/studentRouter.js')
app.use('/api/students', router)
const chatRouter = require('./routes/chatRouter.js')
app.use('/api/chats', chatRouter)
const postRouter = require('./routes/postRouter.js')
app.use('/api/posts', postRouter)
const friendsListRouter = require('./routes/friendsListRouter.js')
app.use('/api/friends', friendsListRouter)
//static Images Folder
app.use('/ProfilePics', express.static('../client/ProfilePics'))



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);