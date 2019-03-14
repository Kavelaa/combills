const app = getApp()
Page({
  data: {
    noBill: false,
    editMode: false,
    anime: Object,
    bills: []
  },
  onLoad() {
    wx.showLoading({
      title: '等待信息'
    })
    app.billsCallback = () => { //账单页如果在获取账单之前加载，需要设置一个回调进行操作
      if (app.globalData.bills[0]) {
        this.setData({
          noBill: false,
          bills: app.globalData.bills
        }, () => {
          wx.hideLoading()
        })
        console.log(app.globalData)
      } else {
        this.setData({
          noBill: true
        }, ()=> {
          wx.hideLoading()
        })
      }
    }
    if (app.globalData.bills && app.globalData.bills[0]) {
      this.setData({
        noBill: false,
        bills: app.globalData.bills
      }, () => {
        wx.hideLoading()
      })
      console.log(app.globalData)
    } else {
      this.setData({
        noBill: true
      }, () => {
        if (app.globalData.bills) {
          wx.hideLoading()
        }
      })
    }
  },
  onShow() {
    if (app.globalData.bills && app.globalData.bills[0]) {
      this.setData({
        noBill: false,
        bills: app.globalData.bills
      })
    } else {
      this.setData({
        noBill: true
      })
    }
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
        wx.stopPullDownRefresh()
        this.onShow()
      }
    })
  },
  tap() {
    if (!this.data.editMode) {
      wx.navigateTo({
        url: 'new/new'
      })
    } else {
      this.data.anime = this.anime.rotate(0).step().export()
      this.setData({
        editMode: false,
        anime: this.data.anime
      })
    }
  },
  longPress() {
    var anime = wx.createAnimation({
      duration: 700
    })
    this.anime = anime
    this.data.anime = anime.rotate(-135).step().export()
    this.setData({
      editMode: true,
      anime: this.data.anime
    })
  },
  bindChange(e) {
    this.finalChecked = e.detail.value
    console.log(e.detail.value)
  },
  deleteBill() {
    if (this.finalChecked && this.finalChecked[0]) {
      let blackList = []
      this.finalChecked.forEach(val => {
        blackList.push(app.globalData.bills.splice(Number(val), 1)[0])
      })
      this.finalChecked = null
      wx.setStorageSync('blackList', blackList)
      this.onShow()
    }
  }
})