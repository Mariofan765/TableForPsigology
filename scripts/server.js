const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'mariofan765.tplinkdns.com',
    database: 'postgres',
    password: 'r0Gbc1lmO',
    port: 5432,
});

app.post('/data', cors(), (req, res) => {
    const data = req.body;
    console.log(data)

    // Запрос SQL для вставки данных
    const text = 'INSERT INTO psihology_problems(context, id_user) VALUES($1, $2) RETURNING *'
    const values = [data.data, data.id_user]; // replace 'user_id_value' with the actual user ID

    // Выполнение запроса
    pool.query(text, values, (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while inserting data');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    })
})

app.get('/data', cors(), (req, res) => {
    const text = 'SELECT * FROM psihology_problems';

    pool.query(text, (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while fetching data');
        } else {
            res.status(200).json(result.rows);
        }
    })
})
app.post('/delData', cors(), (req, res) => {
    const data = req.body;
    console.log(data)
    const text = 'DELETE FROM psihology_problems WHERE id_for_users = $1 '
    const values = [data.id_for_users];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
            res.status(500).send('Error occurred while deleting data');
        } else {
            console.log(result.rows[0])
            res.status(200).send('Data deleted successfully');
        }
    })
})
app.post('/newUser', cors(), (req, res) => {
    const data = req.body;
    console.log(data)
    const text = 'INSERT INTO psihology_users(login, password) VALUES($1, $2) RETURNING *'
    const values = [data.log, data.pas]; // replace 'user_id_value' with the actual user ID
    pool.query(text, values, (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while inserting data');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    })
})
app.post('/addNewCaption', cors(), (req, res) => {
    const data = req.body
    console.log(data)
    const text = 'INSERT INTO psihology_records(date, situation, mind, emotion, strong, id_user) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [data.data.date, data.data.situation, data.data.mind, data.data.emotion, data.data.strong, data.id_user];
    pool.query(text, values, (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while inserting data');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    })
})
app.get('/getRecords', cors(), (req, res) => {
    const text = 'SELECT * FROM psihology_records';
    pool.query(text, (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while fetching data');
        } else {
            res.status(200).json(result.rows);
        }
    })
})
app.listen(2000, () => {
    console.log('Server is running on port 3000');
});
