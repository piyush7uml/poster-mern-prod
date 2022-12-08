const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log(`DB IS CONNECTED`.green))
        .catch((error) => console.log(`DB CONNECTION FAILED-${error}`.red))
}


module.exports = connectDB