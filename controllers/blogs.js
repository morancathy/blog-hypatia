const Blog = require('../models/blog');
const Comment = require('../models/comment');
const router = require('express').Router();

// Create
router.post('/', async(req, res) => {
  try{
    const createdBlog = await Blog.create(req.body)
    res.status(200).json(createdBlog)
  }catch(error){
    console.error(error)
    res.status(400).json({ message: error.message })
  }
});

// Read  (index)        //our root route
router.get('/', async (req, res) => {
   try{
     const foundBlogs = await Blog.find({})
     res.status(200).json(foundBlogs)
   }catch(error){
     console.error(error);                             //backend developer
     res.status(400).json({ message: error.message }); //frontend developer
   }
 });

// Read (show)
router.get('/:id', async (req, res) => {
  try{
    const foundBlog = await Blog.findById(req.params.id)
    res.status(200).json(foundBlog)
  }catch(error){
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Update (update)
router.put('/:id', async (req, res) => {
   try {
     const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
     res.status(200).json(updatedBlog)
   }catch(error){
     console.error(error);
     res.status(400).json({ message: error.message })
   }
 });

// Update (Add Comment)
// Create A Comment
// Take said comment and add it to the comment array of the ....
// ....Blog in question
// Send back a relevant response
router.put('/:id/addComment', (req, res) => {
  const createCommentQuery = Comment.create(req.body)/*this query is stored in variable that we can force to run when we want*/

  createCommentQuery.exec((err, createdComment) => { //now pass in error 1st call back THEN call the query
    const updateBlogQuery = Blog.findByIdAndUpdate(req.params.id, { $addToSet: { comments: createdComment._id }}, { new: true })       //how to make sure we update array on blog properly

    updateBlogQuery.exec((err, updatedBlog) => {     //add to the set of comments is the comments, and add createcomment id to that comment set
      if(err){
        console.error(err); //if do .log, it doesnt know i am sending that erro
        res.status(400).json({ message: err.message })
      } else {
        res.status(200).json(createdComment)  //could be updatedBlog if I wanted.
      }//called 'comments' because that isin our model. We are adding the object id. which gets created by
    })                                //createCommentQuery.     createdComment equals the document.
  })
});

/* NOT asycn...querys are not asunch. ALso we Do not want 2 async functions running side by side*/
//created comment, executite it, the do whats inside(line with exec)
//updateBlogQuery is forced to run after createCommentQuery because of exec query. Could have put this above exec fucn

// Delete
router.delete('/:id', async (req, res) => {
  try{
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBlog);
  } catch(error){
    console.error(error);
    res.status(400).json({ message: error.message})
  }
});

module.exports = router;
