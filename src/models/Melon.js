const { Schema, model } = require("../utilities/db"); // import Schema & model

// Melon Schema
const MelonSchema = new Schema({
  varietas: { type: String, required: true },
  waktuTanam: { type: Date, required: true },
  waktuPanen: { type: Date, required: true },
  jenisTanaman: { type: String, required: true },
  jenisPupuk: { type: String, required: true },
  gradeBuah: { type: String, required: true },
  kuantitas: { type: Number, required: true },
});

// Melon model
const Melon = model("Melon", MelonSchema);

module.exports = Melon;

// •	Varietas
// 	•	Waktu tanam
// 	•	Waktu panen
// 	•	Jenis tanaman
// 	•	Jenis pupuk
// 	•	Grade buah
// 	•	Kuantitas
