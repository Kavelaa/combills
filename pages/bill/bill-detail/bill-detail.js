const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    bill:Object
  },
  onShow(){
    if(app.globalData.billDetail) {
      this.setData({
        bill:app.globalData.billDetail
      })
    }
  }
})