const express = require('express');
const hbs = require('hbs');

var app = new express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        welcome: 'Welcome to visit our website'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page'
        //currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        name: 'bad page'
    });
});

app.listen(3000, () => {
    console.log('Web server starts at port 3000.');
});