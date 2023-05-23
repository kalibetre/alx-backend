import { createClient, print } from 'redis';
import { promisify } from 'util';

const redisClient = createClient();
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

/**
 * Sets a new school value in Redis and displays a confirmation using
 * redis.print
 *
 * @param {string} schoolName - the name of the school to set the value for
 * @param {string} value - the value to set for the school
 * @return {void}
 */
async function setNewSchool(schoolName, value) {
    const reply = await setAsync(schoolName, value);
    print(`Reply: ${reply}`);
}

/**
 * Displays the value of a given school name from Redis.
 *
 * @param {string} schoolName - The name of the school to retrieve from Redis.
 * @return {undefined} This function does not return a value.
 */
async function displaySchoolValue(schoolName) {
    const reply = await getAsync(schoolName);
    console.log(reply);
}

async function main() {
    await displaySchoolValue('Holberton');
    await setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
}

redisClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
    main();
});
