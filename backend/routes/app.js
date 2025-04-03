import express from 'express';
import { createSubAdmin, deleteSubAdmin, editSubAdmin, login, signup } from '../controller/user/user.js';
import { getLoggedInUser, getSubAdmins } from '../controller/app.js';



const router = express.Router();

router.post("/signUp", signup)
router.post("/userData", getLoggedInUser)
router.post("/login", login)
router.post("/getSubAdmin", getSubAdmins)
router.post("/createSubAdmin", createSubAdmin)
router.post("/editSubAdmin", editSubAdmin)
router.post("/deleteSubAdmin/:id", deleteSubAdmin)

export default router;