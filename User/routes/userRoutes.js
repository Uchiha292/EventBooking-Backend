import express from 'express';
import {
    userRegistration,
    getDetail,
    updateEventCount,
} from '../controllers/userController.js';

const router = express.Router();
router.post('/', userRegistration);
router.get('/:userId', getDetail);
router.put('/:userId', updateEventCount);
export default router;