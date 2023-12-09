const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  BookName:{
    type: String,
    require:true
  },
  Author:{
    type: String,
    require:true
  },
  ISBN:{
    type: String,
    require:true
  },
  BookPrice:{
    type: Number,
    require:true
  },
  NoPages:{
    type: Number,
    require:true
  },
  BookCover:{
    type: String,
    require:true
  },
  BookCategory:{
    type: String,
    require:true
  },
  Rate:{
    type: Number, // number of Stars from 1 --> 5
    require:true
  },
  Replyno:{
    type: Number,
    require:true
  }
});

module.exports = mongoose.model('Book', bookSchema);