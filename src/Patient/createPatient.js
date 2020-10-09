import Patient from '../models/Patient'

const createPatient = async (req, res) => {
  try {
    const { firstName, lastName, DOB } = req.body
    let patient = await Patient.findOne({ firstName, lastName })
    let newPatient
    if (!patient) {
      newPatient = new Patient({
        firstName,
        lastName,
        DOB,
      })
      patient = await newPatient.save()
    }
    res.status(200).json({ patient })
  } catch (e) {
    res.status(400).json({ error: e, message: 'BAD REQUEST' })
  }
}

export default createPatient
