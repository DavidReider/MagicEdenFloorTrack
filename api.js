import { CronJob } from "cron";
import { createTransport } from "nodemailer";
import fetch from "node-fetch";

const apiUrl =
  "https://api-mainnet.magiceden.io/rpc/getAggregatedCollectionMetrics";

async function fetchData(url) {
  const response = await fetch(url);
  let data = await response.json();
  return data;
}

async function startTracking() {
  const collections = fetchData(apiUrl);

  let job = new CronJob(
    "* */30 * * * *", // fetch every 30 minutes
    function () {
      collections.then(function (data) {
        data.results.forEach((x) => {
          const nftName = x.name;
          const currentFloor = x.floorPrice.value1d.toFixed(2);
          const previous1d = x.floorPrice.prev1d.toFixed(2);

          if (currentFloor > previous1d) {
            console.log("buy " + nftName);
            //sendNotification(nftName);
          }
        });
      });
    },
    null,
    true,
    null,
    null,
    true
  );
  job.start();
}

async function sendNotification(collection) {
  let transporter = createTransport({
    service: "gmail",
    auth: {
      user: "*****@gmail.com",
      pass: "*****",
    },
  });

  let textToSend = `The collection ${collection} has significantly risen in price in the last hour.`;
  let info = await transporter.sendMail({
    from: '"Solana Floor Tracker" <*****@gmail.com>',
    to: "*****@gmail.com",
    subject: "Solana Floor Tracker Update",
    text: textToSend,
  });

  console.log("Message sent: %s", info.messageId);
}

startTracking();
