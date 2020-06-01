const express = require("express");
const app = express();

const campaigns = require("./api/campaigns");

app.use("/campaigns", campaigns);

app.listen(5000);

console.log("Server running on port 5000");
