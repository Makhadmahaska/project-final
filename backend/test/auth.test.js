import { jest } from "@jest/globals";
import { requireAuth } from "../src/middleware/auth.js";
describe("requireAuth middleware", () => {
    it("returns 401 when the authorization header is missing", async () => {
        const req = {
            headers: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        await requireAuth(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });
    it("returns 401 when token verification fails", async () => {
        const req = {
            headers: {
                authorization: "Bearer fake-token",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        await requireAuth(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=auth.test.js.map