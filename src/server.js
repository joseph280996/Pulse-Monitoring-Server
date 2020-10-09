import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import DBConfig from './db/db'
import createPatient from './Patient/createPatient'
import getPatients from './Patient/getPatients'
import sendWSSMessage from './utils/sendWSSMessage'

dotenv.config()

const port = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(helmet())

// Setting up Mongo database

mongoose
  .connect(DBConfig.MONGO_URL, DBConfig.MONGODB_OPTIONS)
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connected'))
  // eslint-disable-next-line no-console
  .catch(err => console.error('ERR', err.message))

app.post('/patients', createPatient)
app.get('/patients', getPatients)

app.get('/*', (req, res) => {
  res.status(404).send('Not Found')
})
app.post('/*', (req, res) => {
  res.status(404).send('Not Found')
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', ws => {
  ws.on('message', message => {
    const broadcastRegex = /broadcast:/i
    const sensorRegex = /sensor:/i
    if (broadcastRegex.test(message)) {
      sendWSSMessage(message, broadcastRegex, wss.clients, ws)
    } else if (sensorRegex.text(message)) {
      sendWSSMessage(message, sensorRegex, wss.clients, ws)
    }
  })
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${port}`)
  // eslint-disable-next-line no-console
  console.log(`🚀 Websocket ready at ws://localhost:${port}`)
})
