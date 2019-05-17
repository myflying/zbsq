
var sid
var page = 1
var list = ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg', 'g5.jpg', 'g6.jpg']

Page({
  data:{
    is_load_more: false,
    top_img: '../image/def_top_gif.jpg',
    isUse: true
  },
  onLoad:function(e){
    wx.setNavigationBarTitle({
      title: 'gif热门图'
    })
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
    })


    if (list.length % 3 > 0) {
      for (var i = 0; i < list.length; i++) {
        if (i == list.length - 1) {
          list[i].fixStyles = 'margin-right : auto;'
        }
      }
    }

    this.setData({
      array: list
    });
  },
  

  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },

  newApp: function (e) {
    var aid = 'wxe4519c687bd8430c'
    if (aid) {
      wx.navigateToMiniProgram({
        appId: aid
      })
    }
  },

  imagedetail: function (e) {
    var index = e.currentTarget.dataset.index

    wx.navigateTo({
      url: '../gifgenerate/gifgenerate?index=' + index
    })
  }
})