export class Config {
    public port = process.env.NODE_PORT || "3100";
    public mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/deall";
    public jwtSecret = process.env.JWT_SECRET || "80652e45-73a8-4ab0-a1ac-deb95e60309b";
}