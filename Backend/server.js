const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = require("./src/app");
const connectDB = require("./src/db/db");

(async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("PulseBeat backend is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
})();