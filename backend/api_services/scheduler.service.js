import ExampleJob from "../jobs/ExampleJob";
import InitializeHardware from "../jobs/InitializeHardware";
import UpdateSystemInfo from "../jobs/UpdateSystemInfoJob";
import QueueExecutor from "../jobs/queueExecutor";

const SchedulerService = {
    init: async () => {
        // Execute the jobs in the queue
        setInterval(() => {
            (new QueueExecutor()).executeQueuedJobs();
        }, 10000); // Execute queue every minute
        (new InitializeHardware()).once();
        (new UpdateSystemInfo()).everyFiveSeconds();
    }
}

export default SchedulerService;
