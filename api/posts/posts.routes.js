const express = require('express');
const req = require('express/lib/request');
const { default: slugify } = require('slugify');
const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
  findPostById,
} = require('./posts.controllers');

//middleware
router.param("postId", async (req, res, next, postId) => {
  const post = await findPostById(postId, next);
  if(post) {
    req.post = post;
    next();
  }
  else{
    const error = new Error("Post Not Found");
    error.status = 404;
    next(error);
  }
});

router.use((req, res, next) => {
  if(req.method === 'POST'){
    req.body.slug = slugify(req.body.title);
  }
  next();
})

router.get('/', postsGet);
router.get('/:postId', fetchPost);
router.post('/', postsCreate);
router.delete('/:postId', postsDelete);
router.put('/:postId', postsUpdate);



module.exports = router;
