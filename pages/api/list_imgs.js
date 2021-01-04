// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const glob = require("glob")

export default (req, res) => {
    const imgs = glob.sync('./public/uploads/*.png')
    const imgsPublic = imgs.map(s => s.replace('./public', ''))
    res.statusCode = 200
    res.json({ name: 'John Doe', imgs: imgsPublic })
  }
  