import kue from 'kue';

const jobs = [
    {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
    },
    {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
    },
    {
        phoneNumber: '4153518743',
        message: 'This is the code 4321 to verify your account',
    },
    {
        phoneNumber: '4153538781',
        message: 'This is the code 4562 to verify your account',
    },
    {
        phoneNumber: '4153118782',
        message: 'This is the code 4321 to verify your account',
    },
    {
        phoneNumber: '4153718781',
        message: 'This is the code 4562 to verify your account',
    },
    {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account',
    },
    {
        phoneNumber: '4158718781',
        message: 'This is the code 4562 to verify your account',
    },
    {
        phoneNumber: '4153818782',
        message: 'This is the code 4321 to verify your account',
    },
    {
        phoneNumber: '4154318781',
        message: 'This is the code 4562 to verify your account',
    },
    {
        phoneNumber: '4151218782',
        message: 'This is the code 4321 to verify your account',
    },
];

const queue = kue.createQueue();

queue.on('job enqueue', (id, _job) => {
    console.log(`Notification job created: #${id}`);
});

queue.on('job complete', (id, _job) => {
    console.log(`Notification job #${id} completed`);
});

queue.on('job failed', (id, error) => {
    console.log(`Notification job #${id} failed: ${error}`);
});

jobs.forEach((jobData) => {
    const job = queue.createJob('push_notification_code_2', jobData);

    job.on('progress', (progress, _data) => {
        console.log(`Notification job #${job.id} ${progress}% complete`);
    });

    job.save();
});
