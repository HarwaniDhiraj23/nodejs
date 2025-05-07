import cron from 'node-cron';
import { findNonVerifiedUsers } from '../repositories/userRepositories';

const hourlyJob = () => {
  cron.schedule('0 * * * *', () => {
    (async () => {
      try {
        const result = await findNonVerifiedUsers();
        console.log('hourlyJob =>', result);
      } catch (error) {
        console.error('Error in hourlyJob:', error);
      }
    })();
  });
};


export default hourlyJob;
