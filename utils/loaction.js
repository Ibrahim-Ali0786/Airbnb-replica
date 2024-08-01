const axios = require('axios');
const API_KEY = process.env.MAP_TOKEN
async function getcordinates(address){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${API_KEY}`);
    let data =  await response.data;
    if(!data || data==='ZERO_RESULTS')
    {
        throw error;
    }
    const coordinates = await data.results[0].geometry.location;
    return coordinates;   
}

module.exports = getcordinates;