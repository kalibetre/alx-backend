import kue from 'kue';

const queue = kue.createQueue();

queue.on('job enqueue', (id, job) => {
    console.log(`Notification job created: ${id}`);
});

queue.on('job complete', (id, job) => {
    console.log(`Notification job completed: ${id}`);
});

queue.on('job failed', (id, job) => {
    console.log(`Notification job failed: ${id}`);
});

const jobData = {
    phoneNumber: '+1-202-555-0123',
    message: 'Hello World!',
};

const job = queue.create('push_notification_code', jobData);
job.save();
