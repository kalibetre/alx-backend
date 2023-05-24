/**
 * Creates push notification jobs for the provided job data array using the given queue.
 *
 * @param {Array} jobs - An array of job data to create push notification jobs for.
 * @param {Object} queue - The queue object used to create the jobs.
 * @throws {Error} If jobs is not an array.
 */
function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) throw Error('Jobs is not an array');

    jobs.forEach((jobData) => {
        const job = queue.createJob('push_notification_code_3', jobData);

        job.on('enqueue', () => {
            console.log(`Notification job created: #${job.id}`);
        });

        job.on('complete', () => {
            console.log(`Notification job #${job.id} completed`);
        });

        job.on('failed', (error) => {
            console.log(`Notification job #${job.id} failed: ${error}`);
        });

        job.on('progress', (progress, _data) => {
            console.log(`Notification job #${job.id} ${progress}% complete`);
        });

        job.save();
    });
}

export default createPushNotificationsJobs;
