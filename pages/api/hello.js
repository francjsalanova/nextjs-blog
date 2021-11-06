export default function handler(req, res) {
    res.status(200).json({ text: 'Hello', branch: 'Switching branches'})
  }