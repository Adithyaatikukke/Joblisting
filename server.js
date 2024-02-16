const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth"); 
const jobRoutes=require("./routes/job")   
const cors=require("cors");

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Db got connected"))
  .catch((error) => console.log("Failed to coonect", error));

app.get("/health", (req, res) => {
  res.json({
    service: "job listing server",
    status: "active",
    time: new Date(), 
  });
});
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/job",jobRoutes)
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});