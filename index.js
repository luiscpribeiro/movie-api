const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

const app = express();

app.use(bodyParser.json());

const movies = [
    {
      title: 'The Godfather',
      director: 'Francis Ford Coppola',
      genre: 'Crime'
    },
    {
      title: 'The Godfather: Part II',
      director: 'Francis Ford Coppola',
      genre: 'Crime'
    },
    {
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      genre: 'Action'
    },
    {
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      genre: 'Crime'
    },
    {
      title: 'The Lord of the Rings: The Return of the King',
      director: 'Peter Jackson',
      genre: 'Adventure'
    },

    {
      title: 'Fight Club',
      director: 'David Fincher',
      genre: 'Drama'
    },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      director: 'Peter Jackson',
      genre: 'Adventure'
    },
    {
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      genre: 'Comedy'
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      director: 'Irvin Kershner',
      genre: 'Action'
    },
    {
      title: 'The Lord of the Rings: The Two Towers',
      director: 'Peter Jackson',
      genre: 'Adventure'
    }
  ];

// Get all movies data

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// Get movie data by title

app.get('/movies/:title', (req, res) => {
    const {title} = req.params;

    let movie = movies.find(movie => movie.title === title);

    if (movie) {
        return res.status(200).json(movie);
    } else {
        return res.status(404).send('Movie not found')
    }
});

// Get data about a genre

app.get('/movies/genres/:genreName', (req, res) => {
    const {genreName} = req.params;

    let genre = movies.find(movie => movie.genre === genreName);

    if (genre) {
        return res.status(200).json(genre);
    } else {
        return res.status(404).send('Genre not found')
    }
});

// Get data about a director

app.get('/movies/directors/:directorName', (req, res) => {
    const {directorName} = req.params;

    let director = movies.find(movie => movie.director === directorName);

    if (director) {
        return res.status(200).json(director);
    } else {
        return res.status(404).send('Director not found')
    }
});

let users = [
    {
        email: 'a@a.com',
        username: 'Jessica',
        movies: ['movie 1', 'movie 2']
    },
    {
        email: 'b@a.com',
        username: 'Ben',
        movies: ['movie 1', 'movie 2']
    },
    {
        email: 'c@a.com',
        username: 'Lisa',
        movies: ['movie 1', 'movie 2']
    }
];

// Get user data

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Get user data by username

app.get('/users/:username', (req, res) => {
    const {username} = req.params;

    let user = users.find(user => user.username === username);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).send('User not found')
    }
});

// Add a new user

app.post('/users', (req, res) => {
    let newUser = req.body;

    if (newUser.username) {
        users.push(newUser);
        res.status(201).send('User added');
    } else {
        res.status(404).send('Missing a name');
    }
});

// Update user username

app.put('/users/:username', (req, res) => {
    const {username} = req.params;
    const newUsername = req.body.username;

    let user = users.find(user => user.username === username);

    if (user) {
        user.username = newUsername;
        res.status(201).send(`${username} was changed to ${newUsername}`);
    } else {
        res.status(404).send('User not found')
    }
});

// Add movie to favorites

app.post('/users/:username/:movie', (req, res) => {
    const {username, movie} = req.params;

    let user = users.find(user => user.username === username);

    if (user) {
            if (user.movies.includes(movie)) {
                res.status(400).send(`${movie} is already a favorite`);
            } else {
                user.movies.push(movie);
                res.status(201).send(`${movie} added to favorites`);
            }
    } else {
        res.status(404).send('User not found');
    }
});

// Remove movie from favorites

app.delete('/users/:username/:movie', (req, res) => {
    const {username, movie} = req.params;

    let user = users.find(user => user.username === username);

    if (user) {
        for (let i = 0; i < user.movies.length; i++ ) {
            if (user.movies[i] === movie) {
                user.movies.splice(i, 1);
                res.status(200).send(`${movie} removed from favorites`);
            } else {
                res.status(404).send(`${movie} is not in favorites`);
            }
        }
    } else {
        res.status(404).send('User not found');
    }
});

// Delete user by email

app.delete('/users/:email', (req, res) => {
    const {email} = req.params;

    let user = users.find(user => user.email === email);

    if (user) {
        users = users.filter(user => user.email !== email);
        res.status(200).send(`User with email ${email} was deleted`);
    } else {
        res.status(404).send('Email not found');
    }
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to myFlix!');
});

app.use(express.static('public'));

app.use(morgan('common'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => console.log('Your app is listening on port 8080.'));
