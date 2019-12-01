const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/phonebook", { useNewUrlParser: true ,useCreateIndex: true,
useFindAndModify: false
});
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + 'mongodb://localhost:27017/phonebook');
  }); 