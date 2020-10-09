import User from '../models/User'

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, DOB, email, uuid } = req.body
    let patient = await User.findOne({ firstName, lastName })
    let newPatient
    if (!patient) {
      newPatient = new User({
        firstName,
        lastName,
        DOB,
        email,
        uuid,
      })
      patient = await newPatient.save()
    }
    res.status(200).json({ patient })
  } catch (e) {
    res.status(400).json({ error: e, message: 'BAD REQUEST' })
  }
}

export default createUser
