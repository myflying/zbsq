//home.js

const app = getApp();
var dotsFirst = true;
var list;
var types;
var banners;
var page =1;
Page({
  data: {
    array: [],
    typedata:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    is_load_more:false,
    showModal:false,
  },

  getHomeData: function (that){
    page = 1;
    list = null;
    var Page$this = this;
    wx.request({
      url: 'https://nz.qqtn.com/zbsq/index.php?m=Home&c=zbsq&a=client&version=3.5',
      method: 'GET',
      data: {
        'page': page
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        list = res.data.data;
        types = res.data.channel;
        console.log('home data');
        if(types != null && types.length == 4){
          types[0]['name'] = "搞怪";
          types[3]['name'] ="GIF制图";
          //types[3]['ico'] = "/image/";
        }

        banners = res.data.banner;
        
        that.setData({
          array: list,
          typedata: types,
          banner: banners
        });
      },
      fail:function(res){
        wx.stopPullDownRefresh()
      }
    })
  },

  onLoad: function () {
    page = 1;
    list = null;
    var Page$this = this;
    this.getHomeData(Page$this);
    wx.setNavigationBarTitle({
      title: '腾牛生成神器'
    })
  },

  onPullDownRefresh:function(){
    var Page$this = this;
    this.getHomeData(Page$this);
  },

  onReachBottom:function(){
    
    var Page$this = this;
    page++;
    wx.request({
      url: 'https://nz.qqtn.com/zbsq/index.php?m=Home&c=zbsq&a=client&version=3.5',
      method: 'GET',
      data: {
        'page': page
      },
      success: function (res) {
        list = list.concat(res.data.data);
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail:function(res){
        Page$this.setData({
          is_load_more: false
        })
      }
    })
    this.setData({
      is_load_more:true
    })
  },
  create:function(event){
    var data = event.currentTarget.dataset.itmedata;
    //加锁
    // if (data.is_vip == 1){
    //   this.setData({
    //     showModal: true
    //   });
    //   return;
    // }
    
    wx.navigateTo({
      //url: '../createbefore/createbefore?itemdata=' + encodeURIComponent(JSON.stringify(data))
      url: '../createbefore/createbefore?id=' + data.id
    })
  },

  banner:function(event) {
    var banner_item = event.currentTarget.dataset.item;
    console.log(banner_item);
    var obj;
    if (typeof banner_item === "string") {
      obj = JSON.parse(banner_item)
    } else {
      obj = banner_item;
    }

    wx.navigateTo({
      url: '../category/category?banner_id=' + obj.id + '&type_name=' + obj.title +'&type=2'
    })
  },

  category:function(event){
    var index = event.currentTarget.dataset.index;
    console.log(index);
    if(index == 3){
      // this.setData({
      //   showModal: true
      // });

      wx.navigateTo({
        url: '../collection/collection'
      })

      return;
    }

    var type_item = event.currentTarget.dataset.item;
    
    var obj;
    if (typeof type_item === "string") {
      obj = JSON.parse(type_item)
    }else{
      obj = type_item;
    }
    console.log('cid--->'+obj.id + '---name' + obj.name)
    wx.navigateTo({
      url: '../category/category?type_id=' + obj.id + '&type_name=' + obj.name + '&type=1' 
    })
  },

   /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    console.log("hide");
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})


