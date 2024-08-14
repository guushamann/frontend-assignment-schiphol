import { readFile } from "fs/promises";
import express from "express";
import cors from "cors";
const data = JSON.parse(await readFile("mocks/flights.json", "utf8"));

const app = express();
app.use(cors());
const port = 3000;

app.get("/", async (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Hosting flight information on ${port}`);
});
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
