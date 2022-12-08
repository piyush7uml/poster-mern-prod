const express = require('express');
const router = express.Router();
const { protect } = require('../AuthRoutes/protect.js');
const { createPost, getMyPost, getLikedPostByUser, likePost, bookmarkPost, getBookmarkedPostByUser, getMediaPosts, getTimlinePosts, deletePost, postComment, deleteComment, likeComment, deleteAllPosts, getPostById } = require('../controllers/postControllers.js')



// create post
router.post("/create", protect, createPost)

// get post by user
router.get("/my", protect, getMyPost)

// like post
router.post("/like/:id", protect, likePost)

// get liked post for user
router.get("/like", protect, getLikedPostByUser)


// bookmark post by user
router.post("/bookmark/:id", protect, bookmarkPost)

// get post by id

router.get("/postDetails/:id", protect, getPostById)

// get bookmarked post for user
router.get("/bookmark", protect, getBookmarkedPostByUser)

// get media post

router.get("/media", protect, getMediaPosts)

// timline posts

router.get("/timeline", protect, getTimlinePosts)

//delete post

router.delete("/single/:id", protect, deletePost)

// comment post

router.post("/comment/:id", protect, postComment)

// delete comment

router.delete("/comment/:postId/:commentId", protect, deleteComment)

// like comment

router.post("/comment/like/:postId/:commentId", protect, likeComment)

// delete all posts

router.delete("/all", protect, deleteAllPosts)


module.exports = router