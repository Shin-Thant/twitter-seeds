import dotenv from "dotenv";
dotenv.config();

import { Db, MongoClient } from "mongodb";
import { DB_URL } from "./config";
import { createPostTweets, createShareTweets } from "./services/tweetServices";
import { createUsers } from "./services/userServices";

async function connectDB() {
	try {
		const client = new MongoClient(DB_URL);
		const conn = await client.connect();

		const db = conn.db("Twitter");
		return db;
	} catch (err) {
		console.log({ connection_error: err });
		process.exit(0);
	}
}

async function deleteAll(db: Db) {
	console.log("deleting all...");

	await db.collection("users").deleteMany({});
	await db.collection("tweets").deleteMany({});
	await db.collection("comments").deleteMany({});
}

connectDB().then(async (db) => {
	try {
		console.log("Successfully Connected to DB!");

		await deleteAll(db);
		await createUsers(db);
		await createPostTweets(db);
		await createShareTweets(db);

		process.exit();
	} catch (err) {
		console.log(err);
		process.exit();
	}
});
