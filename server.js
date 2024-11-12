const express = require('express');
bodyParser = require('body-parser');
const sampleRouter = require('./routes/samples.js');
const monitorRouter = require('./routes/monitor.js');
const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs' );

app.use('/samples', sampleRouter);
app.use('/monitor', monitorRouter);


app.listen(port, () => {
    console.log('Server started. Listening on port ' + port + '.')
});
