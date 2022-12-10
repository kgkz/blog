import axios from 'axios'
import FormData from 'form-data'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  if (req.method === 'POST') {
    const formData = new FormData()
    formData.append(process.env.GF_EMAIL, body.email)
    formData.append(process.env.GF_NAME, body.name)
    formData.append(process.env.GF_INQUIRY, body.inquiry)

    await axios
      .post(process.env.GF_END_POINT, formData)
      .then(() => {
        res.status(200).json({ message: 'ok' })
      })
      .catch(error => {
        res.status(500).json({ message: 'ng' })
      })
  }
}
