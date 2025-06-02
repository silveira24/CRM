import express from 'express';
import { addEvent, freeBusy, listEvents } from '../controllers/calendarController.js';

const router = express.Router();

// ➕ Rota para adicionar um evento
router.post('/event', addEvent);
router.get('/events/:calendarId', listEvents);
router.get('/events/busy/:calendarId', freeBusy);

export default router;
