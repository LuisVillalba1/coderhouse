import { config } from "dotenv"

config()

//toda nuestra configuracion de nuestro archivo .env
export const dotenvValues = {
    MongoConnect : process.env.MONGO_CONNECT,
    MongoSecret : process.env.MONGO_SECRET,
    GithubClientID : process.env.GITHUB_CLIENTID,
    GithubClientSecret : process.env.GITHUB_CLIENT_SECRET,
    HashValue : process.env.HASH_VALUE,
    FrontEndPath : process.env.FRONT_URL,
}
