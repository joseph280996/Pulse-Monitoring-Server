import mongoose from 'mongoose'

const { Schema } = mongoose

const PatientModel = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: String,
    weight: Number,
    email: { type: String, required: true, index: true },
    data: [String],
    doctor: Schema.ObjectId,
  },
  { timestamps: true },
)

export default mongoose.model('Patient', PatientModel)
