const { UpdateSystemInfo } = require("./UpdateSystemInfoJob")

class Schedule {
    static run() {
        (new UpdateSystemInfo()).everyFiveSeconds();
    }
}
module.exports = {
    Schedule
}