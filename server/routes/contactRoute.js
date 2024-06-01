const express = require('express');
const contactRoutes = express.Router();

//  //function call
 const {contactus} = require("../controllers/ContactUs");
//  //api route
  contactRoutes.post("/ContactusPage", contactus);

module.exports = contactRoutes;