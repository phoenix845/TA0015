const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");
const fs = require("fs");

dotenv.config();

// Fix MongoDB SRV DNS issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
    .connect(process.env.MONGO_URI, {
        family: 4,
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
        fs.writeFileSync("mongo_out.txt", "✅ MongoDB Connected Successfully");
        process.exit(0);
    })
    .catch((err) => {
        fs.writeFileSync("mongo_out.txt", err.toString());
        process.exit(1);
    });
