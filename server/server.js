require("dotenv").config();
const express = require('express')
const app = express()

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to sdflsjkf application." });
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});