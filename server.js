const express = require('express');
const routes = require('./routes');
const path = require('path')

const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'placeholder',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60* 60* 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  }
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT}`));
