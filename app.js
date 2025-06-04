const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
const db = mysql.createConnection(urlDB);

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL!");
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "Missing fields!" });
    }

    const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error("DB Insert Error:", err);  // Log detailed error
            return res.status(500).json({ error: err.message }); // Send detailed error back
        }
        res.status(201).json({ message: "School added!", id: result.insertId });
    });
});

app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude & Longitude required!" });
    }

    const sql = `SELECT * FROM schools`;
    db.query(sql, (err, schools) => {
        if (err) return res.status(500).json({ error: "Database error!" });

        const schoolsWithDistance = schools.map(school => {
            const distance = Math.sqrt(
                Math.pow(school.latitude - parseFloat(latitude), 2) +
                Math.pow(school.longitude - parseFloat(longitude), 2)
            );
            return { ...school, distance: parseFloat(distance.toFixed(2)) };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        res.json(schoolsWithDistance);
    });
});