import cron from 'cron';
import https from 'https';
import { API_URL } from '../../../mobile/constants/api';

const job = new cron.CronJob('*/14 * * * *', function () {
  https
    .get(API_URL, (res) => {
      if (res.statusCode === 200) console.log('GET request sent successfully');
      else console.log('GET request failed', res.statusCode);
    })
    .on('error', (e) => console.error('Error while sending request', e));
});

export default job;

// CRON 작업 설명:
// 크론 작업은 일정한 간격으로 주기적으로 실행되는 예약된 작업입니다
// 14분마다 1개의 GET 요청을 보내고 싶습니다

// "일정"을 정의하는 방법은 무엇입니까?
// 크론식을 사용하여 일정을 정의하는데, 이는 다음을 나타내는 5개의 필드로 구성됩니다:

//! 분, 시간, 요일, 요일, 월, 요일

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour
