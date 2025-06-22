import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import File from '../models/imageModel.js'; 

export const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    const { originalname, filename, size, mimetype, path: filePath } = req.file;

    try {
        const fileDoc = new File({
            originalName: originalname,
            storedName: filename,
            size: size,
            mimeType: mimetype,
            path: filePath,
            uploadedby: req.user._id 
        });

        await fileDoc.save();  // 💾 Save to MongoDB

        res.status(201).send('File uploaded and saved to DB successfully.');
    } catch (error) {
        console.error('Error saving to DB:', error);
        res.status(500).send('Error saving file info to database.');
    }
};


// Download handler
export const downloadImage = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', fileName);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found.');
    }
};

// Delete handler
export const deleteImage = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', fileName);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.send('File deleted successfully.');
        } else {
            res.status(404).send('File not found.');
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Internal server error.');
    }
};
