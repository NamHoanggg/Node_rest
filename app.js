const express = require('express');

const {connectToDb, getDb} = require('./db');

// initialize the app
const app = express();

// parse json
app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })

        db = getDb();
    }
})

// API routes
app.get('/api/students', (req, res) => {
    const page = req.query.page || 0;
    const studentsPerPage = 10;
    
    let students = [];
    db.collection('students')
        .find()
        .sort({ id: 1 })
        .skip(page * studentsPerPage)
        .limit(studentsPerPage)
        .forEeach(student => {
            students.push(student);
        })
        .then(() => {
            res.status(200).json(students);
        })
        .catch(() => {
            res.status(500).json({ error: 'Something went wrong' });
        });

})