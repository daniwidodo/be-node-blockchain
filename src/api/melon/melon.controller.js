require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Melon = require("../../models/Melon"); // import user model
const { isLoggedIn } = require("../../utilities/middleware"); // import isLoggedIn custom middleware
const sendToQueue = require(".././../utilities/producer");
const melonRouter = Router(); // create router to create route bundle
const melonQueue = "create-melon"
// Index Route with isLoggedIn middleware
melonRouter.get("/", isLoggedIn, async (req, res) => {
  //send all Melons with that user
  res.json(
    await Melon.find().catch((error) => res.status(400).json({ error }))
  );
});

// Show Route with isLoggedIn middleware
melonRouter.get("/:id", isLoggedIn, async (req, res) => {
  const _id = req.params.id; // get id from params
  //send target Melon
  res.json(
    await Melon.findOne({ _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// create Route with isLoggedIn middleware
melonRouter.post("/", async (req, res) => {
  await sendToQueue(melonQueue, req.body);
  //create new Melon and send it in response
  res.json(req.body);
});

// update Route with isLoggedIn middleware
melonRouter.put("/:id", isLoggedIn, async (req, res) => {
  const _id = req.params.id;
  //update Melon with same id if belongs to logged in User
  res.json(
    await Melon.updateOne({ _id }, req.body, { new: true }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// update Route with isLoggedIn middleware
melonRouter.delete("/:id", isLoggedIn, async (req, res) => {
  const _id = req.params.id;
  //remove Melon with same id if belongs to logged in User
  res.json(
    await Melon.deleteOne({ _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

module.exports = {melonRouter, melonQueue};
