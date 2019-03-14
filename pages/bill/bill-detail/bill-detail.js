const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    bill: Object,
    initInfo: Object
  },
  onShow() {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh() {
    const billIndex = app.globalData.billIndex
    const bill = app.globalData.bills[billIndex]
    const initId = bill.initId
    const initTime = bill.initTime

    wx.request({
      url: 'https://res.kavelaa.work/billfresh',
      method: 'POST',
      data: {
        initId: initId,
        initTime: initTime,
        billHash: bill.billHash
      },
      success: res => {
        if (res.data.bill) {
          app.globalData.bills[billIndex] = res.data.bill
          console.log('fls')
        }
        wx.setStorageSync('bills', app.globalData.bills) //备份账单到本地缓存
        this.setData({
          bill: app.globalData.bills[billIndex],
          initInfo: app.globalData.bills[billIndex].group[initId]
        }, () => {
          wx.stopPullDownRefresh()
        })
        console.log(app.globalData)
      }
    })
  },
  onShareAppMessage(res) {
    const index = app.globalData.billIndex
    const initId = app.globalData.bills[index].initId
    const initTime = app.globalData.bills[index].initTime
    const initInfo = app.globalData.bills[index].group[initId]
    return {
      title: `加入${initInfo.name}的账单`,
      path: `/pages/index/index?initId=${initId}&initTime=${initTime}&name=${initInfo.name}&avatar=${initInfo.avatar}`
    }
  }
})