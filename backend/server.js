const express = require('express')
const app = express()

const path = require('path')

const { likePost, bookmarkPost, likeComment } = require('./controllers/postControllers.js');
const { followUser } = require("./controllers/userControllers.js")

const http = require('http').createServer(app)

const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});


io.on('connection', socket => {
    socket.on('like', async ({ postId, userId }) => {
        const { post, error } = await likePost({ postId, userId })

        if (post) {
            socket.emit('liked', { post })
        }
    })

    socket.on('bookmark', async ({ postId, userId }) => {
        const { post, error } = await bookmarkPost({ postId, userId })

        if (post) {
            socket.emit('bookmarked', { post })
        }
    })

    socket.on('follow', async ({ myId, userId }) => {
        const { myProfile, newWhoToFollow, otherUserInfo, error } = await followUser(myId, userId);

        if (myProfile && newWhoToFollow) {
            socket.emit('followed', { myProfile, newWhoToFollow, otherUserInfo })
        }


    })


    socket.on('likeComment', async ({ postId, commentId, userId }) => {
        const { getComment, error } = await likeComment(postId, commentId, userId);

        if (getComment) {

            socket.emit('likedComment', { getComment })
        }


    })

});

const dotenv = require('dotenv')
dotenv.config();

const { notFound, errorHandler } = require('./middlewares/errorHandler.js');
const connectDB = require('./config/connectDB.js');



// process.on('SIGINT', function () {
//     console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
//     // some other closing procedures go here
//     process.exit(1);
// });

//middleware
app.use(express.json());

// connecting DataBase
connectDB();

//importing middleware
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js')

//routes middleware

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/upload', uploadRoutes)

const __dname = path.resolve()


// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/uploads', express.static(process.cwd() + '/uploads'));


app.use(express.static(path.join(__dname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dname, 'frontend', 'build', 'index.html')))


// error middleware
app.use(notFound);
app.use(errorHandler);

//starting server

const PORT = process.env.PORT || 4000;



http.listen(PORT, console.log(`App is Up and Running at port ${PORT}`));
