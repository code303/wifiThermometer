const express = require('express');
const sampleRouter = require('./routes/samples.js');
const app = express();
const port = 3000;

app.set('view engine', 'ejs' );
app.get('/', (req, res) => {
    res.render('index', {text: 'world'});
});

app.use('/samples', sampleRouter);

app.listen(port, () => {
    console.log('Server started. Listening on port ' + port + '.')
});
