export default (req, res) => {
    const date = new Date()
    res.statusCode = 200
    res.json({ time: date.toString() })
}