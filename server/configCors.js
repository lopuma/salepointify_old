import { PORT as _PORT } from "./config.js";

const PORT = _PORT;

const CORS_ALLOWED_ORIGINS = [];

const baseOrigin = ["http://localhost", "http://127.0.0.1", "http://0.0.0.0", "http://0.0.0.0", "localhost"];

for (const origin of baseOrigin) {
    CORS_ALLOWED_ORIGINS.push(`${origin}:${PORT}`);
    CORS_ALLOWED_ORIGINS.push(origin);
}

const configCors = {
    cors: {
        server: CORS_ALLOWED_ORIGINS.map((origin) => ({
            origin,
            credentials: true,
        })),
    },
};

export default configCors;