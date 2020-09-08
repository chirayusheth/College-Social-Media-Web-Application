const router = require('express').Router();
let Complaint = require('../models/Complaint.model');

router.route('/').get((req, res) => {
  Complaint.find()
    .then(Complaint => res.json(Complaint))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const AddressedTo = req.body.AddressedTo;
  const Description = req.body.Description;

  const newComplaint = new Complaint({
	  AddressedTo,  
	  Description,  
	});

  newComplaint.save()
    .then(() => res.json('Complaint added!'))
    .catch(err => res.status(400).json('Error: ' + err));
	
	
	
});



router.route('/:id').get((req, res) => {
  Complaint.findById(req.params.id)
    .then(Complaint => res.json(Complaint))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Complaint.findByIdAndDelete(req.params.id)
    .then(() => res.json('Complaint deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Complaint.findById(req.params.id)
    .then(Complaint => {
		Complaint.AddressedTo = req.body.AddressedTo;	
		Complaint.Description = Description;
      
	  
		Complaint.save()
        .then(() => res.json('Complaint updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;