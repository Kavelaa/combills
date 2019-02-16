const app = getApp()
const util = require('../../utils/util')

Component({
  properties: {
    bill: {
      type: Object
    }
  },
  methods: {
    toBillDetail: function() {
      app.globalData.billDetail = this.properties.bill
    }
  }
})