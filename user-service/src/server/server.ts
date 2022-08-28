import * as http from "http";
import { initApp } from "./app";

(async () => {
    try {
        const { app, config } = await initApp();
        const server: http.Server = http.createServer(app);
        server.listen(config.port);

        console.log(`Server Running on Port ${config.port}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();