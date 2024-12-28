import express from 'express';
import { addRecord, getAllRecords } from '../controller/user.js';


const router = express.Router();

router.post('/add', addRecord);
router.get('/get', getAllRecords);

export default router;