import express from "express";
import { Client, middleware } from "@line/bot-sdk";

import text from "./message/text.js";

const config = {
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);

const router = express.Router();

router.post("/webhook", middleware(config), async (req, res) => {
	const events = req.body.events;

	await Promise.all(
		events.map(async (event) => {
			console.log(event);

			if (event.type === "message" && event.message.type === "text") {
				const response = await text(event);
				client.replyMessage(event.replyToken, response);
			}
		}),
	);

	res.end();
});

export default router;
