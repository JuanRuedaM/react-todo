import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM `todos`',
    function (err, results, fields) {
      console.log(results)
      res.json(results)
    }
  );

})

app.post('/:title', (req, res) => {
  const { title } = req.params
  console.log('Agregando tarea', title)
  connection.query(
    'INSERT INTO todos(title) values(?);', title,
    function (err, results, fields) {
      console.log(results)
      res.json(results)
    }
  )
})

app.delete('/:id', (req, res) => {
  const { id } = req.params
  connection.query(
    'DELETE FROM todos WHERE id = ?;', id,
    function (err, results, fields) {
      console.log(results)
      res.json(results)
    }
  )
})

app.listen(process.env.PORT, () => {
  console.log('http://localhost:3000')
  console.log('listening on port', process.env.PORT)
})
