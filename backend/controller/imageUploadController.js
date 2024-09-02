import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const file = req.file; 
    console.log('Uploaded file details:', file);

    const fileName = file.originalname;
    const fileContent = file.buffer; 

    const filePath = path.join(__dirname, '../uploads', fileName);

    try {
        if (!fileContent) {
            return res.status(400).send('File content is undefined.');
        }

        fs.writeFileSync(filePath, fileContent);


        res.json({
            message: 'File uploaded successfully.',
            fileName: fileName,
            fileUrl: `http://localhost:5000/api/upload/uploads/${fileName}`,
        });
    } catch (error) {
        console.error('Error writing file:', error);
        res.status(500).send('Failed to upload file.');
    }
};
