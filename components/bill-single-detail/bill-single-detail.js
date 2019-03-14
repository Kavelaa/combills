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
    agree() {
      let opinion = {
        state: 1,
        time: util.formatTime(new Date())
      }

      this.update(opinion)
    },
    reject() {
      let opinion = {
        state: -1,
        time: util.formatTime(new Date())
      }

      this.update(opinion)
    },
    update(op) {
      const id = app.globalData.id
      const bill = app.globalData.bills[app.globalData.billIndex]
      const detailIndex = this.properties.index
      const initId = bill.initId
      const initTime = bill.initTime
      const master = this.properties.detail.master
      const startTime = this.properties.detail.startTime

      wx.showLoading({
        title: '正在同步至蜂巢',
      })
      wx.request({
        url: 'https://res.kavelaa.work',
        method: 'POST',
        data: {
          id: id,
          initId: initId,
          initTime: initTime,
          master: master,
          startTime: startTime,
          opinion: op
        },
        success: () => {
          wx.startPullDownRefresh()
          wx.hideLoading()
        }
      })
    }
  }
})