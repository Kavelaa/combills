const app = getApp()
const util = require('../../utils/util.js')

Component({
  properties: {
    detail: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data: {
    id: null,
    masterInfo: Object
  },
  lifetimes: {
    attached() {
      const id = app.globalData.id
      const billIndex = app.globalData.billIndex
      const group = app.globalData.bills[billIndex].group
      const detail = this.properties.detail

      this.setData({
        masterInfo: group[detail.master],
        id: id
      })
    }
  },
  methods: {
    toDetailOpinion() {
      app.globalData.detailIndex = this.properties.index
      wx.navigateTo({
        url: 'detail-opinion/detail-opinion'
      })
    },
    update(bill) {
      wx.request({
        url: 'https://res.kavelaa.work',
        method: 'POST',
        data: {
          bill: bill
        }
      })
    },
    agree() {
      const id = app.globalData.id
      const billIndex = app.globalData.billIndex
      const bill = app.globalData.bills[billIndex]
      const detailIndex = this.properties.index
      const opinion = bill.details[detailIndex].opinion

      opinion[id] = {
        state: 1,
        time: util.formatTime(new Date())
      }
      if (2 * Object.keys(opinion).filter(val => {
          if (opinion[val].state === 1) return val
        }).length > Object.keys(opinion).length) {
        bill.details[detailIndex].state = 1
        bill.details[detailIndex].endTime = util.formatTime(new Date())
        bill.allCost += bill.details[detailIndex].amount
      }
      this.update(bill)
      getCurrentPages()[1].onShow()
    },
    reject() {
      const id = app.globalData.id
      const billIndex = app.globalData.billIndex
      const bill = app.globalData.bills[billIndex]
      const detailIndex = this.properties.index
      const opinion = bill.details[detailIndex].opinion

      opinion[id] = {
        state: -1,
        time: util.formatTime(new Date())
      }
      if (2 * Object.keys(opinion).filter(val => {
          if (opinion[val].state === -1) return val
        }).length >= Object.keys(opinion).length) {
        bill.details[detailIndex].state = -1
        bill.details[detailIndex].endTime = util.formatTime(new Date())
      }
      this.update(bill)
      getCurrentPages()[1].onShow()
    }
  }
})