import { createClient, print } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
});

/**
 * Sets a new school value in Redis and displays a confirmation using
 * redis.print
 *
 * @param {string} schoolName - the name of the school to set the value for
 * @param {string} value - the value to set for the school
 * @return {void}
 */
async function setNewSchool(schoolName, value) {
    const reply = await redisClient.set(schoolName, value);
    print(`Reply: ${reply}`);
}

/**
 * Displays the value of a given school name from Redis.
 *
 * @param {string} schoolName - The name of the school to retrieve from Redis.
 * @return {undefined} This function does not return a value.
 */
async function displaySchoolValue(schoolName) {
    const reply = await redisClient.get(schoolName, (err, reply) => {});
    console.log(reply);
}

await displaySchoolValue('Holberton');
await setNewSchool('HolbertonSanFrancisco', '100');
await displaySchoolValue('HolbertonSanFrancisco');
