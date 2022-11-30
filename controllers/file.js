import express from 'express'
import Video from '../models/video'
import { io } from '../index'
import Axios from 'axios'
import Fs from 'fs'
import Path from 'path'
import ProgressBar from 'progress'
import common from '../common/common'


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({},{_id:1,name:1, sourceUrl:1, size:1, localUrl:1, uploadedBy:1, isDeleted:1, createdAt:1, updatedAt:1})
    common.send(res,"200","List",{videos:videos})
   // res.send(videos)
  } catch (error) {
    res.send(error)
  }
})

// router.get('/getall', async (req, res) => {
//   try {
//     const videos = await Video.find({ isDeleted: false }).lean()
//     res.send(videos)
//   } catch (error) {
//     res.send(error)
//   }
// })
// router.get('/getown', async (req, res) => {
//   try {
//     const videos = await Video.find({ uploadedBy: req.body.uid }).lean()
//     res.send(videos)
//   } catch (error) {
//     res.send(error)
//   }
// })
// router.get('/get', async (req, res) => {
//   try {
//     // const videos = await Video.find({_id:req.body.}).lean()
//     res.send('')
//   } catch (error) {
//     res.send(error)
//   }
// })

router.post('/', async (req, res) => {
  try {
    const sourceUrl = req.body.url
    const name = req.body.name
    const uploadedBy = req.body.uid
    const isDeleted = false
    console.log('Connecting …'+ sourceUrl)
    const { data, headers } = await Axios({
      url:sourceUrl,
      method: 'GET',
      responseType: 'stream'
    })
    const totalLength = headers['content-length']
    io.emit('progress-started', totalLength);
    
    console.log('Starting download')
    const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
      width: 40,
      complete: '=',
      incomplete: ' ',
      renderThrottle: 1,
      total: parseInt(totalLength)
    })
    let  localUrl = `${Date.now()}.${fileExtension || 'mp4'}`
    
    const [videourl, fileExtension] = sourceUrl.split(/\.(?=[^\.]+$)/);
    console.log(fileExtension);
    const writer = Fs.createWriteStream(
      Path.resolve(__dirname+'/..', 'videos', localUrl)
    )
    let fullUrl = req.protocol + '://' + req.get('host') + '/' + localUrl;
   // localUrl =  Path.resolve(__dirname+'/..', 'videos', localUrl)
    data.on('data', (chunk) => {
      progressBar.tick(chunk.length);
      // console.log(totalLength,progressBar.curr);
       io.emit('progress-update', progressBar.curr);
    })
    data.pipe(writer)
    const video = new Video({
      name,
      sourceUrl,
      size:totalLength,
      localUrl:fullUrl,
      uploadedBy,
      isDeleted
    })
    await video.save()
    console.log(video.name)
    const videos  = await Video.find()
    io.emit('order-added', videos)
    // res.status(201).send("uploading")
    common.send(res,"200","uploading",{})

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default router