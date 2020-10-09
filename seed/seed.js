import mongoose from 'mongoose'
// Import EarlyBird Schema
import dotenv from 'dotenv'
import Patient from '../src/models/Patient'

dotenv.config()

// Setting up Mongo database
const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST = '127.0.0.1',
  MONGODB_PORT = 27017,
  MONGODB_DATABASE = 'pulsemonitoring',
} = process.env

// Setting up Mongo database
const mongoUrl =
  process.env.MONGO_URL ||
  `mongodb://${MONGODB_USERNAME}:${encodeURIComponent(
    MONGODB_PASSWORD,
  )}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose
  .connect(mongoUrl)
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connected'))
  // eslint-disable-next-line no-console
  .catch(err => console.log('ERR', err.message))

// Initialize registration codes
const db = mongoose.connection
db.dropDatabase(() => {
  // eslint-disable-next-line no-console
  console.log('Dropped Database')
})
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  try {
    const testPatient = new Patient({
      firstName: 'Tung',
      lastName: 'Pham',
      DOB: 'Sept 28th',
    })
    await testPatient.save()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    // eslint-disable-next-line no-console
    console.log('Mongoose disconnected on app termination')
    process.exit(0)
  })
})
