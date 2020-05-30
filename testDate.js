var moment = require('moment')
var now = moment()
var tgl = '1991-11-26'
var bday = moment(tgl, 'YYYY-MM-DD', true);

console.log(now)
console.log(bday)
console.log(bday.isValid())

var x = moment('2020-12-01')
var y = moment('2020-12-05')
var duration = Math.abs(moment.duration(x.diff(y)).as('days'))
console.log(duration)

console.log(x > y)
console.log(y > x)

console.log(parseInt('2020-12-11'.split('-')[0]))

