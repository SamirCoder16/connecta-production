import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream User Upserted ", userData.name);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream User:", error);
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("Stream User Deleted ", userId);
    } catch (error) {
        console.error("Error deleting Stream User:", error);
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.error("Error generating Stream Token:", error);
        return null;
    }
}