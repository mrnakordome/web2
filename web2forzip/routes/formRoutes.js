const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');


router.get('/published', formController.getPublishedForms);
router.post('/:id/publish', formController.togglePublishedStatus);
router.post('/', formController.createForm); 
router.get('/', formController.getForms);   
router.get('/:id', formController.getForm);  
router.put('/:id', formController.updateForm); 
router.delete('/:id', formController.deleteForm); 


module.exports = router;
