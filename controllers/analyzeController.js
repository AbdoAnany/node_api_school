const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.getAllEmployeesCountState = async (req, res) => {
    console.log("SSSS");
    try {
  
        const allUserCount = await db.execute('SELECT Count(*) FROM user_details');
        const allUserStudentActive = await db.execute('SELECT Count(*) FROM user_details  WHERE roles = ? and state = ?', ["student","active"]);
        const allUserTeacherActive= await db.execute('SELECT Count(*) FROM user_details  WHERE roles = ? and state = ?', ["teacher","active"]);
        const allUserStudentNotActive = await db.execute('SELECT Count(*) FROM user_details  WHERE roles = ? and state = ?', ["student","not active"]);
        const allUserTeacherNotActive= await db.execute('SELECT Count(*) FROM user_details  WHERE roles = ? and state = ?', ["teacher","not active"]);
        const allUserAdminActive = await db.execute('SELECT Count(*) FROM user_details  WHERE roles = ?', ["admin"]);
    
        res.status(200).json({
          allUser:allUserCount[0][0]['Count(*)'] ,
          AdminCount:allUserAdminActive[0][0]['Count(*)'] ,

           StudentActiveCount:allUserStudentActive[0][0]['Count(*)'] ,
           TeacherActiveCount:allUserTeacherActive[0][0]['Count(*)'] ,
           StudentNotActiveCount:allUserStudentNotActive[0][0]['Count(*)'] ,
           TeacherNotActiveCount:allUserTeacherNotActive[0][0]['Count(*)'] ,
         }); // Return all rows
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
};

