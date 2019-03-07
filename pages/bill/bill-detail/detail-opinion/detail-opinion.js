const app = getApp()

Page({
  data: {
    detail: null,
    group: null,
    idArr: null
  },
  onShow() {
    const bills = app.globalData.bills
    const billIndex = app.globalData.billIndex
    const detailIndex = app.globalData.detailIndex
    const detail = bills[billIndex].details[detailIndex]
    const idArr = Object.keys(detail.opinion)

    this.setData({
      detail: detail,
      group: bills[billIndex].group,
      idArr: idArr
    })
  }
})