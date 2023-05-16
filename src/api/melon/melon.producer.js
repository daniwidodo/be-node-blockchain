const amqplib = require("amqplib");

const { RABBITMQ_URL } = process.env;
// const queue = "melon-queue";

const sendToQueue = async (queue, data) => {
  try {
    let connection = await amqplib.connect(RABBITMQ_URL);
    let channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendToQueue;
