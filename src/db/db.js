import dotenv from 'dotenv'

dotenv.config()

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST = '127.0.0.1',
  MONGODB_PORT = 27017,
  MONGODB_DATABASE = 'pulsemonitoring',
} = process.env

const mongoUrl =
  process.env.MONGO_URL ||
  `mongodb://${MONGODB_USERNAME}:${encodeURIComponent(
    MONGODB_PASSWORD,
  )}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`

const MONGO_CONFIG = {
  MONGO_URL: mongoUrl,
  MONGODB_OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
}

export default MONGO_CONFIG
