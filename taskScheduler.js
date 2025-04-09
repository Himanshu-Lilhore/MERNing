class TaskScheduler {
    constructor(conc) {
        this.concurrency = Number(conc);
        this.runningTasks = 0;
        this.__waitingQ = [];
    }

    getNextTask() {
        if(this.runningTasks < this.concurrency && this.__waitingQ.length > 0) {
            const nextTask = this.__waitingQ.shift();
            nextTask();
        }
    }

    addTask(task) {
        return new Promise((resolve, reject) => {
            // async function __taskRunner() {
            const __taskRunner = async () => {
                this.runningTasks += 1;
                try {
                    const result = await task();
                    console.log("Result", result);
                    resolve(result);
                } catch (err) {
                    console.log('Task failed', err);
                    reject(err)
                } finally {
                    this.runningTasks -= 1;
                    this.getNextTask();
                }
            }

            if(this.runningTasks < this.concurrency) {
                __taskRunner.call(this)
                // __taskRunner()
            }
            else {
                this.__waitingQ.push(__taskRunner.bind(this))
                // this.__waitingQ.push(__taskRunner)
            }
        })
    }
}

const scheduler1 = new TaskScheduler(2);

scheduler1.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 1'), 3 * 1000))
)
scheduler1.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 2'), 3 * 1000))
)
scheduler1.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 3'), 3 * 1000))
)