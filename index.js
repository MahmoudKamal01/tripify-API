// index.js
require("dotenv/config");
const app = require("./app.js");

// Load environment variables from .env file

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
