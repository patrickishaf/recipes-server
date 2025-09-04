import { CronJob } from "cron";

const job = CronJob.from({
  cronTime: '*/10 * * * *',
  onTick: () => {
    console.log('keeping server alive');
  },
  start: false,
})

export const keepServerAlive = () => {
  job.start();
}

export const stopKeepingServerAlive = () => {
  job.stop();
  console.log('job stopped');
}