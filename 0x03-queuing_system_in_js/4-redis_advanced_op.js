import { createClient, print } from 'redis';
import { promisify } from 'util';

const HASH_KEY = 'HolbertonSchools';
const redisClient = createClient();
const hsetAsync = promisify(redisClient.hset).bind(redisClient);
const hgetallAsync = promisify(redisClient.hgetall).bind(redisClient);

/**
 * Asynchronously adds a key-value pair to a hash table.
 *
 * @param {any} key - the key to be added
 * @param {any} value - the value to be associated with the key
 * @return {Promise<string>} - a promise resolving to a string representation of the reply
 */
async function addToHashTable(key, value) {
    const reply = await hsetAsync(HASH_KEY, key, value);
    print(`Reply: ${reply}`);
}

/**
 * Asynchronously retrieves all the values of the hash stored at the specified
 * key and logs them to the console.
 *
 * @return {Promise<Object>} A promise that resolves to an object containing
 * all the field-value pairs of the hash.
 */
async function displayHashTable() {
    const reply = await hgetallAsync(HASH_KEY);
    console.log(reply);
}

/**
 * Executes the main function which adds various key-value pairs to a hash table
 * and displays the current state of the hash table.
 *
 * @return {Promise<void>} Does not return anything.
 */
async function main() {
    await addToHashTable('Portland', 50);
    await addToHashTable('Seattle', 80);
    await addToHashTable('New York', 20);
    await addToHashTable('Bogota', 20);
    await addToHashTable('Cali', 40);
    await addToHashTable('Paris', 2);
    await displayHashTable();
}

redisClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
    main();
});
