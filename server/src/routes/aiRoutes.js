import { Router } from 'express';
import { generateIdea } from '../controllers/aiController.js';

const router = Router();

router.post('/generate', generateIdea);

export default router;


