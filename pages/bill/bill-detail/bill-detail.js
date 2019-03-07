const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    bill: Object,
    initInfo: Object
  },
  onShow() {
    const index = app.globalData.billIndex
    const initId = app.globalData.bills[index].initId
    this.setData({
      bill: app.globalData.bills[index],
      initInfo: app.globalData.bills[index].group[initId]
    })
  },
  onPullDownRefresh() {
    wx.request({
      url: 'https://res.kavelaa.work/fresh',
      data: {
        id: app.globalData.id
      },
      success: res => {
        const blackList = wx.getStorageSync('blackList') || []
        app.globalData.bills = res.data.bills.filter(bill => { //黑名单过滤
          let flag = 1
          for (let i = 0; i < blackList.length; i++) {
            if (bill.initTime === blackList[i].initTime) {
              flag = 0
              break
            }
          }
          if (flag) {
            return bill
          }
        })
        wx.setStorageSync('bills', app.globalData.bills) //备份账单到本地缓存
        console.log(app.globalData)
        wx.stopPullDownRefresh()
        this.onShow()
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