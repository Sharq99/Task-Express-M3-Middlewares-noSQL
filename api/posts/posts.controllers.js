const Post = require('../../models/Post');

exports.postsCreate = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.post._id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.post._id, req.body, {new:true});
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.fetchPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const foundPost = await Post.findById(postId);
    res.status(200).json(foundPost);
  } catch (error) {
    return next(error);
  }
};

exports.findPostById = async (postId, next) => {
  try {
    const foundPost = await Post.findById(postId);
    return foundPost;
  } catch (error) {
    return next(error);
  }
};
