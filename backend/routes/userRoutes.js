const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, editUserProfile, getLikedPost, followUserAPI, getFollowingUsers, getFollowersUsers, getSearchedUsers, userDeactivate, getOtherUser } = require('../controllers/userControllers.js');
const { protect, admin } = require('../AuthRoutes/protect.js');


// Register User
router.post("/register", registerUser)

//Login User
router.post("/login", loginUser)

// get User
router.get("/", protect, getUser);

// edit user profile

router.put("/", protect, editUserProfile)

// get Liked post

router.get("/likedPost", protect, getLikedPost)

// follow user

router.put("/follow/:id", protect, followUserAPI)

// get following users

router.get("/following", protect, getFollowingUsers)

// get followers users

router.get("/followers", protect, getFollowersUsers)

// get seached users

router.get("/search", protect, getSearchedUsers)
module.exports = router;

// deactivate user

router.delete('/:id', protect, userDeactivate)

// get Other User

router.get('/other/:id', protect, getOtherUser)

//