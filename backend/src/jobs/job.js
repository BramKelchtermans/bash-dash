class Job {

    startCron(
        second = '*',
        minute = '*',
        hour = '*',
        dayOfMonth = '*',
        month = '*',
        dayOfWeek = '*'
    ) {
        var cron = require('node-cron');
        const template = second + ' ' + minute + ' ' + hour + ' ' + dayOfMonth + ' ' + month + ' ' + dayOfWeek;
        console.log(template)
        cron.schedule(template, this.fire);
    }

    everyFiveSeconds() {
        this.startCron('*/5')
    }

    everyMinute() {

    }
    async fire() {
        throw new Error('Please implement a method');
    }
}

module.exports = {
    Job
}
