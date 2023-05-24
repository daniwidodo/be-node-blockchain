const { Timestamp } = require("mongodb");
const { Schema, model } = require("../utilities/db"); // import Schema & model

// Suhu Schema
const SuhuSchema = new Schema({
  tanggal: { type: Date, required: true },
  waktu: { type: Date, required: true, default: Date.now() },
  suhu: { type: Number, required: true },
});

// Suhu model
const Suhu = model("Suhu", SuhuSchema);

module.exports = Suhu;