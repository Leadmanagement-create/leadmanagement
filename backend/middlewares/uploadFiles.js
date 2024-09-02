import multer from 'multer';

const storage = multer.memoryStorage();
const uploadFile = multer({ storage: storage });

export default uploadFile;
