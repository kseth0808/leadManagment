import express from 'express';
import { addUser, deleteUser, updateUser } from '../controller/user/user.js';
import { getAllUsers, getUserDetails } from '../controller/app.js';


const router = express.Router();

router.post("/addUser", addUser)
router.get("/getAllUsers", getAllUsers)
router.post("/postUpdateEventDetials/:userId", updateUser)
router.get("/getUserDetail/:userId", getUserDetails)
router.delete("/deleteUser/:userId", deleteUser)

export default router;