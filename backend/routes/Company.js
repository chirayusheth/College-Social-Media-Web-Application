const router = require('express').Router();
let Company = require('../models/Company.model');

router.route('/').get((req, res) => {
  Company.find()
    .then(Company => res.json(Company))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const Name = req.body.Name;
  const Date_time = Date.parse(req.body.Date_time);
  const RegDateStart = Date.parse(req.body.RegDateStart);
  const RegDateEnd = Date.parse(req.body.RegDateEnd);
  const OfferType = req.body.OfferType;
  const Category = req.body.Category;
  const OpenFor = req.body.OpenFor;
  const Locations = req.body.Locations;
    
  const newCompany = new Company({
	  Name,  
	  Date_time, 
	  RegDateStart, 
	  RegDateEnd, 
      OfferType, 
	  Category,
	  OpenFor,
	  Locations,	  
	});

  newCompany.save()
    .then(() => res.json('Company added!'))
    .catch(err => res.status(400).json('Error: ' + err));
	
});
	

router.route('/:id').get((req, res) => {
  Company.findById(req.params.id)
    .then(Company => res.json(Company))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then(() => res.json('Company deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Company.findById(req.params.id)
    .then(Company => {
		Company.Name = req.body.Name;	
		Company.Date_time = Date.parse(req.body.Data_time);
		Company.RegDateStart = Date.parse(req.body.RegDateStart);
		Company.RegDateEnd = Date.parse(req.body.RegDateEnd);
		Company.OfferType = req.body.OfferType;
		Company.Category = req.body.Category;
		Company.OpenFor = req.body.OpenFor;
		Company.Locations = req.body.Locations;
    	
			
		Company.save()
		.then(() => res.json('Company updated!'))
		.catch(err => res.status(400).json('Error: ' + err));
		      
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;