
export const protectedRoute = (req,res,next) => {
    try {
        if(!req.auth().isAuthenticated) {
            res.status(401).json({ message: "Unauthorized - You must be login" });
            return;
        }
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}