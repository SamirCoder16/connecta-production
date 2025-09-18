import mongoose from 'mongoose';
import 'dotenv/config';
import { ENV } from './env.js';


if (!ENV.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
}

const connectDB = async () => {
    try {
        const cnn = await mongoose.connect(ENV.MONGO_URI);
        console.log('MongoDB connected : ' , cnn.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;