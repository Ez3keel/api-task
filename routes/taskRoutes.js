import express from 'express';

import { getusers } from '../controller/taskController.js';

const router = express.Router();

router.get('/users', getusers);

export default router;