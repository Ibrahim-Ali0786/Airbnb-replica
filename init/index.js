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
    initData.data = initData.data.map((obj)=>({...obj,owner:'669fe2fba49d12bc14a1bf09'}));
    await listing.insertMany(initData.data);
    console.log("successfully uploaded");
}
initDB();