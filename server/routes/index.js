const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const tripRouter = require('./tripRoutes')
const expenseRouter = require('./expenseRoutes')
const savingRouter = require('./savingRoutes')
const exchangeRateRouter = require('./exchangerateRoute')
const ImageKit = require("imagekit-javascript")

const imagekit = new ImageKit({
  publicKey: "public_HL3Uq87BzYBcLDvVDtBGIStRXCg=",
  urlEndpoint: "https://ik.imagekit.io/yivpvk7dwbx/",
});    

router.use('/users', userRouter)
router.use('/trips', tripRouter)
router.use('/expenses', expenseRouter)
router.use('/savings', savingRouter)
router.use('/exchangerate', exchangeRateRouter)

router.post('/postImages', async (req,res,next)=> {
  try {
    let imageURL = await imagekit.url({
      path: "../../Gambar.jpg",
      transformation: [{
        "height": "300",
        "width": "400"
      }]
    })

    function upload(data) {
      let file = document.getElementById("file1");
      imageURL.upload({
        file: file.files[0],
        fileName: "testUpload.jpg",
        tags: ["tags"]
      },{
        function(err,result) {
          console.log(arguments);
          console.log(imagekit.url({
            src: result.url,
            transformation : [{ height: 300, width: 400}]
          }));
        }
      })
    }
    await upload(imageURL)
    req.status(200).json({
      message: "ok"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

module.exports = router