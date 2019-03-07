const app = getApp()
const util = require('../../../../utils/util.js')

Page({
  data: {
    groupArr: []
  },
  onLoad () {
    const bills = app.globalData.bills
    const billIndex = app.globalData.billIndex
    const group = bills[billIndex].group
    const groupArr = Object.keys(group).map((val) => {
      return group[val]
    })
    
    this.setData({
      groupArr: groupArr
    })
  }
})