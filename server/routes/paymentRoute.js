const express = require("express")
const paymentRoutes = express.Router();

 const { capturedPayment, verifySignature, sendPaymentSuccessEmail ,enrollStudents} = require("../controllers/payments")
 const { authmiddleware, isInstructor, isStudent, isAdmin } = require("../middlewares/authmiddleware")


paymentRoutes.post("/capturePayment", authmiddleware, isStudent, capturedPayment)
paymentRoutes.post("/verifyPayment",authmiddleware, isStudent, verifySignature)
paymentRoutes.post("/sendPaymentSuccessEmail", authmiddleware, isStudent, sendPaymentSuccessEmail);

module.exports = paymentRoutes;