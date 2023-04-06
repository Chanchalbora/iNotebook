
const mongoose = require('mongoose');
const mongoURI =  "mongodb+srv://bora546:B34ra25Sin1208GH@boracluster.t496f0t.mongodb.net/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(()=>{console.log("Connected!")})
}

module.exports = connectToMongo 