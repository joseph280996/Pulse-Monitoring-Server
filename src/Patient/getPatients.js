import Patient from '../models/Patient'

const createUser = async (req, res) => {
  try {
    const patients = await Patient.find({})
    res.status(200).json({ patients })
  } catch (e) {
    // eslint-disable-next-line no-console
    res.status(400).json({ error: e, message: 'BAD REQUEST' })
  }
}

export default createUser
