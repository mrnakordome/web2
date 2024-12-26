const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field' }],
  published: { type: Boolean, default: false },
});

module.exports = mongoose.model('Form', formSchema);
