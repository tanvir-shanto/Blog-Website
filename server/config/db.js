const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        mongoose.set('strictQuery', false);
        const conn = mongoose.connect(process.env.MONGODB_URI);
        //console.log("connected");
        console.log(`Database Connected ${(await conn).connection.host}`);
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;