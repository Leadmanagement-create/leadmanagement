import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadFile from '../middlewares/uploadFiles.js';
import { uploadFile as uploadFileController } from '../controller/imageUploadController.js'; 



const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.post('/uploadfile', uploadFile.single('upload'), uploadFileController);

export default router;
