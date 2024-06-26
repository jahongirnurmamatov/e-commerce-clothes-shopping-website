import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import upload from './multer/multer.js'; // Ensure the correct path and extension
import path from 'path';
import productRouter from './routes/productRoutes.js';
import connectDb from './config/db.js';
dotenv.config();
const port = 4000;
const app = express();

connectDb()
app.use(express.json());
app.use(cors());

// Serve static files
const uploadDir = path.join(process.cwd(), 'uploads/images'); // Using process.cwd() to get the correct directory
app.use('/images', express.static(uploadDir));

// Create upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (req.file) {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } else {
        res.status(400).json({ success: 0, message: 'File upload failed' });
    }
});


//routes
app.use('/api/products',productRouter)

app.listen(port, (err) => {
    if (!err) {
        console.log('Server running on port ' + port);
    } else {
        console.log(err);
    }
});
