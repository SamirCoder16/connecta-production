import { generateStreamToken } from "../config/stream.config.js";

export const getStreamToken = async (req,res) => {
    try {
        const userId = req.auth().userId;
        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        } 
        const token = generateStreamToken(userId);
        if(!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
         res.status(200).json({ token });
    } catch (error) {
        console.error("Error generating stream token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}