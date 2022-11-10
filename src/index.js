const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const port = process.env.PORT || 3000
const dbUrl = "mongodb+srv://compProjects:99JoxDsJkLgJHS3i@cluster0.uxials2.mongodb.net/coortusDB"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(dbUrl, {useNewUrlParser: true})
.then( () => console.log("MongoDb is connected.."))
.catch ( err => console.log(err))


app.use('/', route)


app.listen(port, function () {
    console.log('Express app running on port ' + (port))
});