import {config} from "dotenv";
import {TwitterApi} from "twitter-api-v2"

config();


const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

export async function createPost(status) {
    const newPost= await twitterClient.v2.tweets(status)
    return {
        content:[
            {
                text: `Tweeted: ${status}`,
                type: "text"
            }
        ]
    }
}