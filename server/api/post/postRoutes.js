var router = require('express').Router();
var post = require("./postModel");
router.route('/')
  .get(function(req, res){
	post.find({})
	.populate('author')
	.exec(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		}
	});
  });
  
  router.route('/')
	.post(function(req,res){
		var postData = {title: req.body.title,
						text: req.body.text,
						author: req.body.author,
						categories: req.body.category}
		var userPost = new post(postData);
		userPost.save(function(err, records){
			if(err){
				res.send(err);
			}else{
				res.send("Post added");
			}
		});
	});
	
	router.route('/:post_id')
		.get(function(req, res){
			var id = req.params.post_id;
			post.findById(id, function(err, data){
				if(err){
					res.send(err);
				}else{
					res.json(data);
				}				
			});			
		});
		
router.route('/:post_id')
	.put(function(req, res){
		var id = req.params.post_id;
		var updateData = {title: req.body.title,
						  text: req.body.text,
						  author: req.body.author,
						  categories: req.body.category};
		var updatePost = new post(updateData);
		var upsertData = updatePost.toObject();
		delete upsertData._id;
		post.update({_id: id}, upsertData, {upsert:true}, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send("Post updated");
			}
			
		});
		
	});
	
router.route('/:post_id')
	.delete(function(req, res){
		var id = req.params.post_id;
		post.remove({_id: id}, function(err){
			if(err){
				res.send(err);
			}else{
				res.send("Post deleted")
			}
		});
		
		
	});
		


module.exports = router;
