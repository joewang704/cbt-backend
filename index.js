import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import * as db from './db.js'

const app = express()

const portNum = process.env.PORT || 4000

const whitelist = ['http://localhost:3000']

app.use(cors({ 
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  origin: true,
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API is running correctly!')
})

app.post('/exercise/:type', (req, res) => {
  db.addExerciseEntry(req.params.type, req.body).then(result => {
    console.log('result')
    res.send(result)
  }).catch(err => {
    console.log('error')
    res.send(err)
  })
})

app.get('/exercise/:type', (req, res) => {
  db.getEntriesForExercise(req.params.type).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

app.get('/exercise/:type/:id', (req, res) => {
  const { type, id } = req.params
  db.getExerciseEntry(type, id).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

app.delete('/exercise/:type/:id', (req, res) => {
  const { type, id } = req.params
  db.removeExerciseEntry(type, id).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log(`Serving port number ${portNum}`)
  }
})