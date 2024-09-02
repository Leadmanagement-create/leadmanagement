import express from 'express';
import * as leadController from '../controller/leadController.js';
import { auth } from '../middlewares/authMiddleware.js'

const router = express.Router();
const role = ['admin', 'user'];

router.post('/create', leadController.createLead);

router.get('/getLeadById/:id', auth(role), leadController.getLead);

router.put('/updateLead/:id', auth(role), leadController.updateLead);
router.put('/update', leadController.updateLeadByEmail);
router.put('/updateLeadwithassigneeId/:id', auth(role), leadController.updateLeadwithassigneeId);

router.delete('/deleteLead/:id', auth(role), leadController.deleteLead);

router.get('/getAllLeads', leadController.getAllLeads);

export default router;
