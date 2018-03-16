/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
var cwidth = 0
var cheight = 0

const app = getApp()
Page({
  data: {
    cropperOpt : {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - cwidth) / 2,
        y: (height - cheight) / 2,
        width: cwidth,
        height: cheight
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src)
        //wx.previewImage({
        //  current: '', // 当前显示图片的http链接
        //  urls: [src] // 需要预览的图片http链接列表
        //})
        wx.navigateBack(1)
        // wx.redirectTo({
        //   url: `../createbefore/createbefore?avatarsrc=`+src
        // })
        app.avatar = src;
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    console.log("wwww---" + width + "hhhh--" + height)
    cwidth = option.width
    cheight = option.height

    console.log("cw---" + option.width + "ch--" + option.height)

    var scale = cwidth / cheight
    if (cwidth > width) {
        cwidth = width - 80
        cheight = cwidth / scale
    }
    var nscale = cwidth / cheight
    if(cheight > height){
      cheight = height - 80
      cwidth = nscale * cheight
    }

    var cropperOpts = {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - cwidth) / 2,
        y: (height - cheight) / 2,
        width: parseInt(cwidth),
        height: parseInt(cheight)
      }
    }
    console.log(cropperOpts)
    //const { cropperOpt } = this.data
    new WeCropper(cropperOpts)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
  }
})
