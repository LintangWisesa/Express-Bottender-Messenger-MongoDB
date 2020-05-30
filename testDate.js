var moment = require('moment')
var now = moment().format('YYYY-MM-DD')
var tgl = '1991-05-31'
var bday = moment(tgl, 'YYYY-MM-DD', true).format('YYYY-MM-DD')

// console.log(now)
// console.log(bday)

bdayNow = bday.split('-')
bdayNow = `${now.split('-')[0]}-${bdayNow[1]}-${bdayNow[2]}`
bdayNow = moment(bdayNow).format('YYYY-MM-DD')
// console.log(bdayNow)
// console.log(now)
// console.log(bdayNow > now)
// console.log(bdayNow < now)
// var x = moment(bdayNow).diff(moment(now), 'days')
// console.log(x)

a = `${parseInt(bdayNow.split('-')[0]) + 1}-01-01`
a = moment(a).format('YYYY-MM-DD')
console.log(moment(a).diff(moment(now), 'days'))
a = moment(a).add(1, 'year').format('YYYY-MM-DD')
console.log(a)
// console.log(bday.isValid())

// var x = moment('12-01').format('MM-DD')
// var y = moment('12-05').format('MM-DD')
// var duration = Math.abs(moment.duration(x.diff(y)).as('days'))
// console.log(duration)

// console.log(x > y)
// console.log(y > x)

// console.log(parseInt('2020-12-11'.split('-')[0]))

