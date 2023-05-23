import { createClient, print } from 'redis';

/**
 * Sets a new school value in Redis and displays a confirmation using
 * redis.print
 *
 * @param {string} schoolName - the name of the school to set the value for
 * @param {string} value - the value to set for the school
 * @return {void}
 */
function setNewSchool(schoolName, value) {
    redisClient.set(schoolName, value, (err, reply) => {
        print(`Reply: ${reply}`);
    });
}

/**
 * Displays the value of a given school name from Redis.
 *
 * @param {string} schoolName - The name of the school to retrieve from Redis.
 * @return {undefined} This function does not return a value.
 */
function displaySchoolValue(schoolName) {
    redisClient.get(schoolName, (err, reply) => {
        console.log(reply);
    });
}

/**
 * Executes the main function, which displays the value of 'Holberton' school,
 * sets a new school called 'HolbertonSanFrancisco' with a value of 100, and
 * displays the value of 'HolbertonSanFrancisco' school.
 *
 * @return {undefined} This function does not return anything
 */
function main() {
    displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    displaySchoolValue('HolbertonSanFrancisco');
}

const redisClient = createClient();

redisClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
    main();
});
