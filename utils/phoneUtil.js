function printSysmTime() {
  console.log('当前时间：'+new Date())
}
function formateNumber(num) {
  console.log('格式化号码： ${num} !')
}
module.exports.printSysmTime = printSysmTime
exports.formateNumber = formateNumber