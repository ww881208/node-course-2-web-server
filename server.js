const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = new express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var log = new Date().toString() + " : " + req.method + ' ' + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
            console.log('Unable to write to server.log.');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         message: 'The site is currently updating.'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
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

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page',
        message: 'welcome to project page'
    })
})

app.listen(port, () => {
    console.log('Web server starts at port ', port);
});