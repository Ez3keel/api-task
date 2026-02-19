import express from 'express';

import { 
    getusers, 
    addUser,
    deleteUser, 
    updateUser,
    updateDataUser
} from '../controller/taskController.js';

const router = express.Router();

router.get('/users', getusers);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.patch('/users/:id', updateDataUser);


export default router;