const asyncHandler = require('express-async-handler');
const { Post, Comment } = require('../models/postModel.js');
const User = require('../models/userModel.js');

// create post
exports.createPost = asyncHandler(async (req, res) => {
  const post = await Post.create({ ...req.body, user: req.user._id });

  if (post) {
    const user = await User.findById(req.user._id);

    if (user) {
      user.postCount = user.postCount + 1;
      await user.save();
    } else {
      res.status(404);
      throw new Error('User Not found to add post count');
    }

    res.status(201);
    return res.json(post);
  } else {
    res.status(400);
    throw new Error('Post Could Not Created');
  }
});

// get My Post
exports.getMyPost = asyncHandler(async (req, res) => {
  const myPosts = await Post.find({ user: req.user._id }).populate('user', 'photo name lastName userName')
    .sort({
      createdAt: -1
    });

  if (myPosts) {
    if (myPosts.length === 0) {
      res.status(404);
      throw new Error('No Posts');
    }
    return res.json(myPosts);
  } else {
    res.status(400);
    throw new Error('error in finding post for user');
  }
});

// like unlike post
exports.likePost = async ({ postId, userId }) => {
  const post = await Post.findById(postId).populate('user', 'photo name lastName userName');

  if (post) {
    const alreadyLiked = post.likes.find(
      i => i.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        i => i.toString() !== userId.toString()
      );

      await post.save();
      return { post }
    } else {
      post.likes = [...post.likes, userId];
      await post.save();
      return { post }
    }
  } else {
    return { error: "like request failed" }
  }
};

// get liked post of user

exports.getLikedPostByUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    likes: { $in: req.user._id }
  }).populate("user", "name lastName userName photo")
    .sort({ createdAt: -1 });

  if (posts) {
    if (posts.length === 0) {
      res.status(404);
      throw new Error('No Posts');
    }
    return res.json(posts);
  } else {
    res.status(400);
    throw new Error('Error in getting liked posts');
  }
});

// bookmark post by user

exports.bookmarkPost = async ({ postId, userId }) => {
  const post = await Post.findById(postId).populate('user', 'photo name lastName userName');

  if (post) {
    const alreadyBookmarked = post.bookmarks.find(
      i => i.toString() === userId.toString()
    );

    if (alreadyBookmarked) {
      post.bookmarks = post.bookmarks.filter(
        i => i.toString() !== userId.toString()
      );

      await post.save();

      return { post }
    } else {
      post.bookmarks = [...post.bookmarks, userId];
      await post.save();

      return { post }
    }
  } else {
    return { error: "bookmarking failed" }
  }
};

// get bookmarked post for user

exports.getBookmarkedPostByUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({ bookmarks: { $in: req.user._id } }).populate("user", "name lastName userName photo")
    .sort({
      createdAt: -1
    });

  if (posts) {
    if (posts.length === 0) {
      res.status(404);
      throw new Error('No Posts');
    }
    res.json(posts);
  } else {
    res.status(404);
    throw new Error('Error in getting bookmarked posts');
  }
});

// get media posts

exports.getMediaPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
    .exists('image')
    .populate("user", "name lastName userName photo")
    .sort({ createdAt: -1 });

  if (posts) {
    if (posts.length === 0) {
      res.status(404);
      throw new Error('No Posts');
    }
    return res.json(posts);
  } else {
    res.status(404);
    throw new Error('Error in getting media posts');
  }
});

// get timeline post

exports.getTimlinePosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: { $in: req.user.following } })
    .populate("user", "name lastName userName photo")
    .sort({
      createdAt: -1
    });

  if (posts) {
    if (posts.length === 0) {
      res.status(404);
      throw new Error('No Posts');
    }
    return res.json(posts);
  } else {
    res.status(404);
    throw new Error('Timeline posts not found');
  }
});

//delete post

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (post) {
    const user = await User.findById(req.user._id);

    if (user) {
      user.postCount = user.postCount - 1;
      await user.save();
    } else {
      res.status(404);
      throw new Error('User Not found to add post count');
    }

    res.json(post);
  } else {
    res.status(400);
    throw new Error('Error in removing post');
  }
});

//post comment

exports.postComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  console.log("comment", comment)

  const post = await Post.findById(req.params.id);

  if (post) {
    post.comments = [...post.comments, { user: req.user._id, comment }];
    await post.save();
    return res.json(post);
  } else {
    res.status(404);
    throw new Error('Post for comment not found');
  }
});

// delete comment

exports.deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (post) {
    post.comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.commentId.toString()
    );
    await post.save();

    return res.json(post);
  } else {
    res.status(404);
    throw new Error('post for comment delete not found');
  }
});



exports.likeComment = async (postId, commentId, userId) => {
  const post = await Post.findById(postId).populate('user', '_id name lastName userName photo').populate('comments.user', '_id name lastName userName photo')

  if (post) {

    let getComment

    post.comments = post.comments.map(comment => {

      if (comment._id.toString() === commentId.toString()) {

        const alreadyLiked = comment.likes.find(
          i => i.toString() === userId.toString()
        );

        if (alreadyLiked) {
          comment.likes = comment.likes.filter(
            i => i.toString() !== userId.toString()
          );
        } else {
          comment.likes = [...comment.likes, userId];
        }

        getComment = comment

        return comment;
      } else {
        return comment;
      }
    });

    await post.save();

    return { getComment };
  } else {
    const error = { msg: "Post Not Found" }
    return { error }
  }
};



//delete all posts of user

exports.deleteAllPosts = asyncHandler(async (req, res) => {

  const posts = await Post.deleteMany({ user: req.user._id })

  if (posts) {
    res.json(posts)
  } else {
    res.status(404);
    throw new Error(`Posts Not Found`)
  }
})


// get post by id

exports.getPostById = asyncHandler(async (req, res) => {



  const post = await Post.findById(req.params.id)
    .sort({ "comments.createdAt": -1 })
    .populate('user', '_id name lastName userName photo')
    .populate('comments.user', '_id name lastName userName photo')


  if (post) {

    post.comments = post.comments.reverse();

    return res.json(post)
  } else {
    res.status(404);
    throw new Error("Post Not Found")
  }
})

