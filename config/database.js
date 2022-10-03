const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
    .then(()=> console.log('Connected to mongodb'))
    .catch(error => console.error(error))