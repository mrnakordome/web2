const mongoose = require('mongoose');
const Field = require('../models/field');
const Form = require('../models/form');


exports.createField = async (req, res) => {
  try {
    const field = new Field(req.body);
    await field.save();
    
    const form = await Form.findById(req.body.form);
    form.fields.push(field);
    await form.save();

    res.status(201).json(field);
  } catch (err) {
    res.status(400).json({ message: 'Error creating field', error: err });
  }
};


exports.getFieldsByFormId = async (req, res) => {
    try {
      const { formId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(formId)) {
        return res.status(400).json({ message: 'Invalid form ID format' });
      }
  
      const fields = await Field.find({ form: formId });
  
      if (!fields || fields.length === 0) {
        return res.status(404).json({ message: 'No fields found for this form' });
      }
  
      console.log('Fields retrieved:', fields);
      res.status(200).json(fields);
    } catch (err) {
      console.error('Error fetching fields:', err);
      res.status(500).json({ message: 'Error fetching fields', error: err.message });
    }
  };


exports.updateField = async (req, res) => {
  try {
    const field = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }
    res.status(200).json(field);
  } catch (err) {
    res.status(400).json({ message: 'Error updating field', error: err });
  }
};


exports.deleteField = async (req, res) => {
    try {
      const { id } = req.params;
  
      console.log('Deleting field with ID:', id);
  

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  

      const field = await Field.findById(id);
      if (!field) {
        return res.status(404).json({ message: 'Field not found' });
      }

      await Field.findByIdAndDelete(id);

      await Form.findByIdAndUpdate(field.form, {
        $pull: { fields: id }
      });
  
      console.log('Field deleted and removed from form:', id);
      res.status(200).json({ message: 'Field deleted' });
    } catch (err) {
      console.error('Error deleting field:', err);
      res.status(500).json({ message: 'Error deleting field', error: err.message });
    }
  };
  