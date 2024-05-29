require("dotenv").config();

function getDatabaseUri(){
    return (process.env.NODE_ENV === "test")
        ? 'musicbeats_test'
        : 'musicbeats'
}


const BASE_URL = 'https://api.music.apple.com/v1';
const PORT = 3001

const SECRET_JWT_KEY = "FlamingoParty!"

const BCRYPT_WORK_FACTOR = 12;

const CHAT_KEY = process.env.CHAT_KEY
const APPLE_PRIVATE_KEY = process.env.APPLE_PRIVATE_KEY
const KID = process.env.KID
const TEAM_ID = process.env.TEAM_ID

module.exports = {PORT, BASE_URL, SECRET_JWT_KEY, BCRYPT_WORK_FACTOR, getDatabaseUri, CHAT_KEY, APPLE_PRIVATE_KEY, KID, TEAM_ID}