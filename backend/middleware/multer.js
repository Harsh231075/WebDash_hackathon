// middleware/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // you can also use diskStorage or cloudinary later
const upload = multer({ storage });

export default upload;
