const express = require('express');
bodyParser = require('body-parser');
const sampleRouter = require('./routes/samples.js');
const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs' );
app.get('/monitor', (req, res) => {
    res.render('monitor', {text: '17.9'});
});

app.use('/samples', sampleRouter);

app.listen(port, () => {
    console.log('Server started. Listening on port ' + port + '.')
});
