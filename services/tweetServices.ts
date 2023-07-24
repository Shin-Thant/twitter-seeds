import { faker } from "@faker-js/faker";
import { Db } from "mongodb";
import { SHARES_COUNT, USERS_COUNT } from "../config";
import { PostTweet, ShareTweet } from "../types/types";

export async function createPostTweets(db: Db) {
	const users = await db
		.collection("users")
		.find()
		.limit(USERS_COUNT)
		.toArray();
	const data: PostTweet[] = [];

	users.forEach((user) => {
		const temp: PostTweet = {
			type: "post",
			body: faker.lorem.lines({ min: 3, max: 5 }),
			owner: user._id,
			likes: [],
			shares: [],
		};
		data.push(temp);
	});

	const result = await db.collection("tweets").insertMany(data);
	console.log({ tweet_creation: result });
}

export async function createShareTweets(db: Db) {
	const users = await db
		.collection("users")
		.find()
		.limit(SHARES_COUNT)
		.toArray();
	const tweets = await db
		.collection("tweets")
		.find({
			_id: {
				$nin: users.map((user) => user._id),
			},
		})
		.limit(SHARES_COUNT)
		.toArray();

	const data: ShareTweet[] = [];

	for (let i = 0; i < SHARES_COUNT; i++) {
		const temp: ShareTweet = {
			type: "share",
			body: faker.lorem.lines({ min: 3, max: 5 }),
			owner: users[i]._id,
			origin: tweets[i]._id,
			likes: [],
			shares: [],
		};
		data.push(temp);
	}

	const result = await db.collection("tweets").insertMany(data);
	console.log({ shares_creation: result });
}
