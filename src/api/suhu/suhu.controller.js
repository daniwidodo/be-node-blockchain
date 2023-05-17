require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Suhu = require("../../models/Suhu"); // import user model
const { isLoggedIn } = require("../../utilities/middleware"); // import isLoggedIn custom middleware
const sendToQueue = require(".././../utilities/producer");
const suhuRouter = Router(); // create router to create route bundle
const suhuQueue = "create-Suhu"
// Index Route with isLoggedIn middleware
suhuRouter.get("/", isLoggedIn, async (req, res) => {
  //send all Suhus with that user
  res.json(
    await Suhu.find().catch((error) => res.status(400).json({ error }))
  );
});

// Show Route with isLoggedIn middleware
suhuRouter.get("/:id", isLoggedIn, async (req, res) => {
  const _id = req.params.id; // get id from params
  //send target Suhu
  res.json(
    await Suhu.findOne({ _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// create Route with isLoggedIn middleware
suhuRouter.post("/", async (req, res) => {
  await sendToQueue(suhuQueue, req.body);
  //create new Suhu and send it in response
  res.json(req.body);
});

// update Route with isLoggedIn middleware
suhuRouter.put("/:id", isLoggedIn, async (req, res) => {
  const _id = req.params.id;
  //update Suhu with same id if belongs to logged in User
  res.json(
    await Suhu.updateOne({ _id }, req.body, { new: true }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// update Route with isLoggedIn middleware
suhuRouter.delete("/:id", isLoggedIn, async (req, res) => {
  const _id = req.params.id;
  //remove Suhu with same id if belongs to logged in User
  res.json(
    await Suhu.deleteOne({ _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

module.exports = {suhuRouter, suhuQueue};
