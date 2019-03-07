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
    confirm: true
  },
  observers: {
    'bill': function (bill) {
      const id = app.globalData.id
      for (let i = 0; i < bill.details.length; i++) {
        if (bill.details[i].state === 0) {
          if (bill.details[i].opinion[id].state === 0) {
            this.setData({
              confirm: false
            })
            return
          }
        }
      }
      this.setData({
        confirm: true
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