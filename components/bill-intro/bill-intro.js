const app = getApp()
const util = require('../../utils/util')

Component({
  properties: {
    bill: {
      type: Object
    },
    index: Number,
    editMode: Boolean
  },
  data: {
    confirm: null,
    noStateIs0: null,
    unconfirmDetails: null
  },
  observers: {
    'bill': function(bill) {
      const id = app.globalData.id
      let flag = true
      let noStateIs0 = true
      let unconfirmDetails = []

      bill.details.forEach(detail => {
        if (detail.state === 0) {
          noStateIs0 = false
        } else {
          return
        }
        if (detail.opinion[id].state === 0) {
          unconfirmDetails.push(detail)
          flag = false
        }
      })
      this.setData({
        confirm: flag,
        noStateIs0: noStateIs0,
        unconfirmDetails: unconfirmDetails
      })
    }
  },
  methods: {
    toBillDetail: function() {
      if (!this.properties.editMode) {
        app.globalData.billIndex = this.properties.index
        wx.navigateTo({
          url: '/pages/bill/bill-detail/bill-detail',
        })
      }
    }
  }
})