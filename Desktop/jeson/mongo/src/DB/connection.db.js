import { MongoClient } from 'mongodb';
import { DB_URI } from '../../config/config.service.js';
const client = new MongoClient(DB_URI);
export const dbConnection = async () => {
    try {
        await client.connect(); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
export const db = client.db('saturday_blog_app')
