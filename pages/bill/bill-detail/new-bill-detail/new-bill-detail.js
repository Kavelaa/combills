const app = getApp()
const util = require('../../../../utils/util')

Page({
  data: {
    disabled: true
  },
  bindSubmit(e) {
    const id = app.globalData.id
    const billIndex = app.globalData.billIndex
    const bills = app.globalData.bills
    const billDetail = app.globalData.bills[billIndex]
    const time = Date.now()

    if (Number(e.detail.value.amount) && e.detail.value.amount > 0) {
      const detail = {
        master: id,
        opinion: {},
        state: 0,
        amount: Number(e.detail.value.amount),
        startTime: util.formatTime(new Date(time)),
      }

      Object.keys(billDetail.group).forEach(val => {
        Object.defineProperty(detail.opinion, val, {
          value: {
            state: 0
          },
          enumerable: true,
          writable: true,
          configurable: true
        })
      })
      /*Object.defineProperty(detail.opinion, id.state, {
        value: 1,
        enumerable: true,
        writable: true,
        configurable: true
      })*/
      if (e.detail.value.textarea) {
        detail.memo = e.detail.value.textarea
      }

      wx.setStorageSync('bills', bills)
      wx.request({
        url: 'https://res.kavelaa.work/newdetail',
        method: 'POST',
        data: {
          detail: detail,
          initId: billDetail.initId,
          initTime: billDetail.initTime
        }
      })
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '请输入合理的消费额',
        icon: 'none'
      })
    }
  },
  input(e) {
    if (e.detail.value !== '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  }
})