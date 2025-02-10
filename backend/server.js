import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from 'dotenv';

dotenv.config({ path: "./config/config.env" });

const { CLOUDINARY_CLIENT_NAME, CLOUDINARY_CLIENT_API, CLOUDINARY_CLIENT_SECRET, PORT } = process.env;

if (!CLOUDINARY_CLIENT_NAME || !CLOUDINARY_CLIENT_API || !CLOUDINARY_CLIENT_SECRET) {
    throw new Error("Please define all required environment variables for Cloudinary.");
}

cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLIENT_NAME,
    api_key: CLOUDINARY_CLIENT_API,
    api_secret: CLOUDINARY_CLIENT_SECRET,
});

const port = PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
