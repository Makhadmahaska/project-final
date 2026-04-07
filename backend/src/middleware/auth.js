import { verifyFirebaseToken } from "../firebase/firebaseAdmin.js";
export async function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Missing or invalid authorization header.",
        });
        return;
    }
    try {
        const decoded = await verifyFirebaseToken(header.replace("Bearer ", ""));
        req.user = decoded.email
            ? { uid: decoded.uid, email: decoded.email }
            : { uid: decoded.uid };
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Could not verify user token.",
        });
    }
}
//# sourceMappingURL=auth.js.map