const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jk860241:jaspreet@gupshup.dabo1zz.mongodb.net/?retryWrites=true&w=majority&appName=gupshup").then(()=>{
    console.log("Db connection is made succesfully")
}).catch((err)=>{
    console.log(err.message);
});
