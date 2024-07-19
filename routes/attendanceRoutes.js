const express = require('express');
const { addPersonalInfo, getPersonalInfo, updatePersonalInfo, deletePersonalInfo, getAllPersonalInfo } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/personal-info', auth, addPersonalInfo);
router.get('/personal-info', auth, getPersonalInfo);
router.get('/all-personal-info', getAllPersonalInfo);
router.put('/personal-info', auth, updatePersonalInfo);
router.delete('/personal-info', auth, deletePersonalInfo);

module.exports = router;
