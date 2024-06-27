const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');
const MONGO_URL = 'mongodb://localhost:27017/WanderLust';
async function main()
{
    await mongoose.connect(MONGO_URL);
}
main()
.then((res)=>{ 
    console.log("Connected to DB");
})
.catch(err=>{
    console.log(err);
});
const initDB = async () =>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("successfully uploaded");
}
initDB();