const app = getApp()

Component({
  properties: {
    bill: Object,
    index: Number
  },
  methods: {
    recover() {
      const blackList = wx.getStorageSync('blackList')

      blackList.splice(this.properties.index, 1)
      wx.setStorageSync('blackList', blackList)
      getCurrentPages()[1].onShow()
    }
  }
})
