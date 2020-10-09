import mongoose from 'mongoose'

const { Schema } = mongoose

const AuthModel = new Schema(
  {
    email: { type: String, required: true, index: true },
    confirmationCode: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model('Auth', AuthModel)
