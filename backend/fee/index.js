const dbUtils = require(`${__base}/database/mysql`)


async function payFee(req, res ) {
  let {studentId, amount} = req.body
  let statement = `insert into payment(student_id, amount) values (?, ?)`
  let values=[studentId, amount]
  let feePaymentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values)
  return feePaymentResp
}