const app = getApp()

Page({
  data: {
    blackList: null
  },
  onShow() {
    const blackList = wx.getStorageSync('blackList')
    
    this.setData({
      blackList: blackList
    })
  }
})