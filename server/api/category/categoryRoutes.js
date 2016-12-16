var router = require('express').Router();
var categories = require("./categoryModel");

//get
router.route('/')
  .get(function(req, res){
	categories.find({}, function(err, data){
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});  
  });
 
 //add/post
  router.route('/').post(function(req, res){
		var categoryData = {name: req.body.name};
		var newCategory = new categories(categoryData);
		newCategory.save(function(err, records){
			res.send("Category added");
		});	
	});
	
//Delete
router.route('/:category_id')
		.delete(function(req, res){
			var id = req.params.category_id;
			categories.remove({_id: id}, function(err){
				if(err){
					res.send(err);
				}else{
					res.send("Category deleted");
				}	
			});		
		});
		
 /*
 router.route('/:category_id').get(function(req, res){
	var id = req.params.category_id;
		categories.findById(id, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.json(data);
			}
		});
	});
  */

module.exports = router;
