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
    type: int,
    require:true
  },
  BookPrice:{
    type: int,
    require:true
  },
  NoPages:{
    type: int,
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
    type: int, // number of Stars from 1 --> 5
    require:true
  },
  Replyno:{
    type: int,
    require:true
  }
});

module.exports = mongoose.model('Book', bookSchema);