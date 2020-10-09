import mongoose from 'mongoose'

const { Schema } = mongoose

const UserModel = new Schema(
  {
    email: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: String,
    isDoctor: Boolean,
    patients: [{ type: Schema.ObjectId, ref: 'Patient' }],
  },
  { timestamps: true },
)

export default mongoose.model('User', UserModel)
