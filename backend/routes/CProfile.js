const router = require('express').Router();
let CProfile = require('../models/CProfile.model');
let Company = require('../models/Company.model');

//pass the name and date of the company in the request body in the field Company and Dae
router.route('/add').post((req, res) => {
  const Name = req.body.Name;
  const Description = req.body.Description;
  const CriticalSkills = req.body.CriticalSkills;
  const DesiredSkills = req.body.DesiredSkills;
  const UGPackage = req.body.UGPackage;
  const PGPackage = req.body.PGPackage;
  const CPICriteria = req.body.CPICriteria;
  
  
    var query = Company.findOne({Name: String(req.body.Company), Date_time: Date.parse(req.body.Date)},{'_id':1});
  query.exec(function(err,company){
	  if(err)
		  return console.log(err);
		
	Company=company._id;
  
  
  const newProfile = new CProfile({
	  Company,
	  Name,  
	  Description,
	  CriticalSkills, 
      DesiredSkills, 
	  UGPackage, 
	  PGPackage, 
      CPICriteria, 
	});

  newProfile.save()
    .then(() => res.json('Profile added!'))
    .catch(err => res.status(400).json('Error: ' + err));
	
	});
	
});


//pass the id of the company for whilch you want to find the company profiles
router.route('/:id').get((req, res) => {
	CProfile.find({Company:req.params.id})
    .then(CProfile => res.json(CProfile))
    .catch(err => res.status(400).json('Error: ' + err));
});

//pass the name of the company and date of the company
//router.route('/:Name').get(())


//in order to delete a particular profile
router.route('/:id').delete((req, res) => {
  CProfile.findByIdAndDelete(req.params.id)
    .then(() => res.json('Profile deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  CProfile.findById(req.params.id)
    .then(profile => {
		profile.Name = req.body.Name;
		profile.Description = req.body.Description;
        profile.CriticalSkills = req.body.CriticalSkills;
		profile.DesiredSkills = req.body.DesiredSkills;
		profile.UGPackage = req.body.UGPackage;
		profile.PGPackage = req.body.PGPackage;
		profile.CPICriteria = req.body.CPICriteria;
		      
		var query = Company.findOne({Name: String(req.body.Company), Date_time: Date.parse(req.body.Date)},{'_id':1});
		query.exec(function(err,company){
			if(err)
				return console.log(err);
		
			profile.Organizer=company._id;
			
			profile.save()
			.then(() => res.json('Profile updated!'))
			.catch(err => res.status(400).json('Error: ' + err));
		});      
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;