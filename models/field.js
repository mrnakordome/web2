const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, enum: ['text', 'number', 'boolean'], required: true },
  defaultValue: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(value) {
        if (this.type === 'text') return typeof value === 'string';
        if (this.type === 'number') return typeof value === 'number';
        if (this.type === 'boolean') return typeof value === 'boolean';
        return false;
      },
      message: 'Default value does not match the field type'
    }
  },
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' }
}, { timestamps: true }); 


fieldSchema.index({ form: 1 });


fieldSchema.pre('remove', async function (next) {
  const field = this; 
  try {
    await mongoose.model('Form').findByIdAndUpdate(field.form, {
      $pull: { fields: field._id } 
    });
    next(); 
  } catch (err) {
    next(err); 
  }
});

module.exports = mongoose.model('Field', fieldSchema);
