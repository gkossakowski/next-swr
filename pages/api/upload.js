import multer from "multer"

export const config = {
  api: {
    bodyParser: false,
  },
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

var upload = multer({ storage: storage, onError : function(err, next) {
    console.log('error', err);
    next(err);
  } })

export default (req, res) => {
    // console.log(req)
  upload.single("img")(req, {}, err => {
    // do error handling here
    console.log(req.img) // do something with the files here
  })
  res.status(200).send({})
}
