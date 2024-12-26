const Form = require('../models/form');
const Field = require('../models/field');
const mongoose = require('mongoose');



exports.createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ message: 'Error creating form', error: err });
  }
};


exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find().populate('fields');
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving forms', error: err });
  }
};


exports.getForm = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid ID format:', id);
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const form = await Form.findById(id);
      if (!form) {
        console.log('Form not found:', id);
        return res.status(404).json({ message: 'Form not found' });
      }
  
      res.status(200).json(form);
    } catch (err) {
      console.error('Error in getForm controller:', err); 
      res.status(500).json({ message: 'Error retrieving form', error: err.message });
    }
  };
  

exports.updateForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ message: 'Error updating form', error: err });
  }
};


exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting form', error: err });
  }
};

exports.togglePublishedStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid form ID format' });
    }


    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.published = !form.published; 
    await form.save(); 

    res.status(200).json({ message: 'Published status updated', form });
  } catch (err) {
    console.error('Error toggling published status:', err);
    res.status(500).json({ message: 'Error toggling published status', error: err.message });
  }
};


exports.getPublishedForms = async (req, res) => {
  try {
    const publishedForms = await Form.find({ published: true });

    if (!publishedForms || publishedForms.length === 0) {
      return res.status(404).json({ message: 'No published forms found' });
    }

    res.status(200).json(publishedForms);
  } catch (err) {
    console.error('Error retrieving published forms:', err);
    res.status(500).json({ message: 'Error retrieving published forms', error: err.message });
  }
};