import express from 'express';
import {
    createEvent,
    getDetail,
    categorizeEvent,
    getAllEvents,
} from '../controllers/eventController.js';

const router = express.Router();
router.post('/', createEvent);
router.get('/:eventId', getDetail);
router.put('/:eventId', categorizeEvent);
router.get('/getEvents', getAllEvents);
export default router;