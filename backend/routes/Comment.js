const router = require('express').Router();
let Event = require('../models/Event.model');
let Comment = require('../models/Comment.model');
let User = require('../models/User.model');

router.route('/').get((req, res) => {
  Comment.find()
    .then(Comment => res.json(Comment))
    .catch(err => res.status(400).json('Error: ' + err));
});

//id of the event
// router.route('/add/:id').post((req, res) => {
//   const Description = req.body.Description;
//   const Event = req.params.id;
//   const reported = false;
//   User.findOne({username: String(req.body.username)},{'_id':1})
// 	.exec(function(err,user){
// 	  if(err)
// 		  return console.log(err);
		
// 	User=User._id;
  
  
//   const newComment = new Comment({
// 	  Event,  
// 	  Description, 
//     User,
//     reported	  
// 	});

//   newComment.save()
//     .then(() => res.json('Comment added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
	
// 	});
	
// });




router.route('/add/:id').post((req, res) => {
  const Description = req.body.Description;
  const Event = req.params.id;
  const User = req.body.username
  const reported = false;
  
  const newComment = new Comment({
	  Event,  
	  Description, 
    User,
    reported	  
	});

  newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
	
});


//find all comments for the event with 'id'
router.route('/:id').get((req, res) => {
  Comment.find({Event : req.params.id})
    .then(Comment => res.json(Comment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/report/:id').post((req,res) => {
  Comment.findById(req.params.id)
    .then(comment => {
        comment.reported = true;

          comment.save()
          .then(() => res.json('Comment Reported'))
          .catch(err => res.status(400).json('Error : ' + err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
  Comment.findById(req.params.id)
    .then(Comment => {		
		Comment.Description = req.body.Description;
		Comment.Event = Comment.Event;
		Comment.User = Comment.User;
    Comment.reported = false;  
		
			Comment.save()
			.then(() => res.json('Comment updated!'))
			.catch(err => res.status(400).json('Error: ' + err));
		     
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;