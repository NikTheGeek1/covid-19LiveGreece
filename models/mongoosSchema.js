const mongoose = require('mongoose'); // requiring the module

const dataSchema = mongoose.Schema({ // creating the schema (data structure which will save)

  update_time:{type: String},
  total_cases:{type: String},
  recovered:{type: String},
  deaths:{type: String},
  news:{type:String}
});

module.exports = mongoose.model('Stamp', dataSchema); // exporting the user data
