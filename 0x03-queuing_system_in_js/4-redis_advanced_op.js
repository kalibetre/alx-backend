import { createClient, print } from 'redis';
import { promisify } from 'util';

const HASH_KEY = 'HolbertonSchools';
const redisClient = createClient();
const hsetAsync = promisify(redisClient.hset).bind(redisClient);
const hgetallAsync = promisify(redisClient.hgetall).bind(redisClient);

async function addToHashTable(key, value) {
    const reply = await hsetAsync(HASH_KEY, key, value);
    print(`Reply: ${reply}`);
}

async function displayHashTable() {
    const reply = await hgetallAsync(HASH_KEY);
    console.log(reply);
}

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
