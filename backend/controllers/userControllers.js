const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const genToken = require('../utils/genToken.js');
const { Post, Comment } = require('../models/postModel.js')

// Register User

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, lastName, userName, email, password } = req.body;

  const userNameExist = await User.findOne({ userName });

  if (userNameExist) {
    res.status(400);
    throw new Error('Username already Exist');
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    res.status(400);
    throw new Error('Email already Exist');
  }

  const user = await User.create({
    name,
    lastName,
    userName,
    email,
    password
  });

  if (user) {
    res.status(201);
    return res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      token: genToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('User Registration Failed');
  }
});

//Login User

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await user.matchPassword(password)) {
      return res.json({
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Email and Password Do Not Match');
    }
  } else {
    res.status(400);
    throw new Error('Email Does Not Exist');
  }
});

// get User Details

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.password = undefined;


    let whoToFollow = await User.find({
      followers: { $ne: req.user._id },
      _id: { $ne: req.user._id }
    })
      .select('-password -email')
      .sort({ followerLength: -1 })
      .limit(4);

    return res.json({ user, whoToFollow });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// Edit User Profile

exports.editUserProfile = asyncHandler(async (req, res) => {

  const { name, lastName, userName, email, password, photo } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    if (userName && userName !== user.userName) {
      const userNameExist = await User.findOne({ userName });

      if (userNameExist) {
        res.status(400);
        throw new Error('Username already Used');
      }
    }

    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email });

      if (emailExist) {
        res.status(400);
        throw new Error('Email already Used');
      }
    }

    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.photo = photo ? photo : user.photo;

    const updatedUser = await user.save();

    if (updatedUser) {
      return res.json({
        msg: 'User Updated'
      });
    } else {
      res.status(400);
      throw new Error('User Could Not Update');
    }
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// get liked posts for user

exports.getLikedPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('likes');

  if (user) {
    return res.json({
      _id: user._id,
      likes: user.likes
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// follow user

exports.followUser = async (myId, userId) => {

  const user = await User.findById(userId);

  if (user) {
    const alreadyFollowing = user.followers.find(
      i => i.toString() === myId.toString()
    );

    if (alreadyFollowing) {
      // unfollow

      user.followers = user.followers.filter(
        i => i.toString() !== myId.toString()
      );

      const myProfile = await User.findById(myId);

      if (myProfile) {
        myProfile.following = myProfile.following.filter(
          i => i.toString() !== userId.toString()
        );

        await myProfile.save();
      } else {

        return { error: 'My Profile Not Found' };
      }

      await user.save();

      myProfile.password = undefined


      let newWhoToFollow = await User.find({
        followers: { $ne: myId },
        _id: { $ne: myId }
      })
        .select('-password -email')
        .sort({ followerLength: -1 })
        .limit(4);

      const otherUserInfo = await User.findById(userId);

      otherUserInfo.password = undefined

      return { myProfile, newWhoToFollow, otherUserInfo }


    } else {
      //follow

      user.followers = [...user.followers, myId];

      const myProfile = await User.findById(myId);

      if (myProfile) {
        myProfile.following = [...myProfile.following, userId];

        await myProfile.save();
      } else {
        return { error: 'My Profile Not Found' };
      }

      await user.save();

      myProfile.password = undefined


      let newWhoToFollow = await User.find({
        followers: { $ne: myId },
        _id: { $ne: myId }
      })
        .select('-password -email')
        .sort({ followerLength: -1 })
        .limit(4);


      const otherUserInfo = await User.findById(userId);

      otherUserInfo.password = undefined

      return { myProfile, newWhoToFollow, otherUserInfo }

    }
  } else {
    return { error: 'User Not Found' };
  }
};


exports.getFollowingUsers = asyncHandler(async (req, res) => {

  const myProfile = await User.findById(req.user._id);

  if (myProfile) {
    const users = await User.find({ _id: { $in: myProfile.following } }).select('_id name lastName userName photo')

    if (users) {

      if (users.length === 0) {
        res.status(400);
        throw new Error("You Are Not Following Any One")
      }

      return res.json(users)

    } else {
      res.status(404);
      throw new Error("Users Not Found")
    }


  } else {
    res.status(404);
    throw new Error("User Following Not Found")
  }
})


exports.getFollowersUsers = asyncHandler(async (req, res) => {

  const myProfile = await User.findById(req.user._id);

  if (myProfile) {
    const users = await User.find({ _id: { $in: myProfile.followers } }).select('_id name lastName userName photo')

    if (users) {

      if (users.length === 0) {
        res.status(400);
        throw new Error("No One Folloing You")
      }

      return res.json(users)

    } else {
      res.status(404);
      throw new Error("Users Not Found")
    }


  } else {
    res.status(404);
    throw new Error("User Following Not Found")
  }
})


exports.getSearchedUsers = asyncHandler(async (req, res) => {

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const users = await User.find({ ...keyword }).select('_id name lastName userName photo')

  if (users) {
    if (users.length === 0) {
      res.status(404);
      throw new Error("No user found")
    }

    return res.json(users)
  } else {
    res.status(404);
    throw new Error("Error in Searching")
  }

})





exports.userDeactivate = asyncHandler(async (req, res) => {


  try {

    await User.updateMany(
      {
        followers: { $in: req.params.id }
      },
      {
        $pull: { followers: req.params.id }
      }
    )

    await User.updateMany(
      {
        following: { $in: req.params.id }
      },
      {
        $pull: { following: req.params.id },
      }
    )



    await Post.updateMany(
      {
        likes: { $in: req.params.id }
      },
      {
        $pull: { likes: req.params.id },
      }
    )

    await Post.updateMany(
      {
        bookmarks: { $in: req.params.id }
      },
      {
        $pull: { bookmarks: req.params.id },
      }
    )

    await Post.updateMany(
      { "comments.user": req.params.id },
      { $pull: { 'comments': { user: req.params.id } } }
    )

    await Post.updateMany(
      { "comments.likes": { $in: req.params.id } },
      { $pull: { "comments.$.likes": req.params.id } }
    )

    await Post.deleteMany({ user: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    res.json({ Msg: "done" })


  } catch (error) {
    res.status(404);
    throw new Error("Error in Updating Users")
  }

})




exports.getOtherUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if (user) {

    user.password = undefined

    const posts = await Post.find({ user: req.params.id }).populate('user', '_id name lastName userName photo')
      .sort({
        createdAt: -1
      });

    if (posts) {
      return res.json({
        user,
        posts
      })
    } else {
      res.status(404);
      throw new Error("Posts Not Found")
    }

  } else {
    res.status(404);
    throw new Error("User Not Found")
  }
})






exports.followUserAPI = asyncHandler(async (req, res) => {

  const userId = req.params.id;
  const myId = req.user._id

  const user = await User.findById(userId);

  if (user) {
    const alreadyFollowing = user.followers.find(
      i => i.toString() === myId.toString()
    );

    if (alreadyFollowing) {
      // unfollow

      user.followers = user.followers.filter(
        i => i.toString() !== myId.toString()
      );

      const myProfile = await User.findById(myId);

      if (myProfile) {
        myProfile.following = myProfile.following.filter(
          i => i.toString() !== userId.toString()
        );

        await myProfile.save();
      } else {

        res.status(404);
        throw new Error('My Profile Not Found')

      }

      await user.save();

      return res.json({ msg: 'success' })


    } else {
      //follow

      user.followers = [...user.followers, myId];

      const myProfile = await User.findById(myId);

      if (myProfile) {
        myProfile.following = [...myProfile.following, userId];

        await myProfile.save();
      } else {
        res.status(404);
        throw new Error('My Profile Not Found')
      }

      await user.save();

      return res.json({ msg: 'success' })
    }
  } else {
    res.status(404);
    throw new Error('User Not Found')
  }
})