import { CronJob } from "cron";
import axios from 'axios';

const job = CronJob.from({
  cronTime: '*/10 * * * *',
  onTick: async () => {
    try {
      const { data: recipes } = await axios.get(`127.0.0.1:${process.env.PORT ?? 3000}/recipes`);
      console.dir({ recipes }, { depth: null });
    } catch (err) {
      console.log('internal err', err);
    }
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