import { Db, ObjectId } from "mongodb";
import { Comment, BasicTweet } from "../types/types";
import { faker } from "@faker-js/faker";
import { COMMENTS_COUNT } from "../config";
import { getRandomTweets } from "./tweetServices";
import { getRandomUsers } from "./userServices";

export async function createComments(db: Db) {
	const commentData: Comment[] = [];

	const tweets = await db
		.collection("tweets")
		.find()
		.sort({ createdAt: -1 })
		.limit(5)
		.toArray();

	for (let i = 0; i < tweets.length; i++) {
		for (let index = 0; index < COMMENTS_COUNT; index++) {
			const likeCount = Math.floor(Math.random() * 10) + 1;
			const likedUsers = await getRandomUsers({ db, count: likeCount });
			const owners = await getRandomUsers({ db, count: 1 });

			commentData.push({
				body: faker.helpers.arrayElement([
					faker.lorem.paragraph({ min: 3, max: 5 }),
					faker.lorem.sentence({ min: 3, max: 5 }),
				]),
				type: "comment",
				likes: likedUsers.map((user) => user._id),
				owner: owners[0]._id,
				tweet: tweets[i]._id,
			});
		}
	}

	const comments = await db
		.collection<Comment>("comments")
		.insertMany(commentData);

	console.log({ comments });

	for (let i = 0; i < tweets.length; i++) {
		const res = await db
			.collection("tweets")
			.updateOne(
				{ _id: tweets[i]._id },
				{ $inc: { commentCount: COMMENTS_COUNT } }
			);
		console.log(`tweet ${tweets[i]._id.toString()}: `, res);
	}
}

export async function createReplies(db: Db) {
	const level = Math.floor(Math.random() * 4) + 1;
}
