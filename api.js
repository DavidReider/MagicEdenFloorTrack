import { CronJob } from "cron";
import { createTransport } from "nodemailer";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = "https://qvvqmkgtkinkmscqabvm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    "0 3 * * *", // fetch every day at 03:00
    function () {
      collections.then(function (data) {
        console.log(data.results.length);
        data.results.forEach((x) => {
          const nftName = x.name;
          const currentFloor = x.floorPrice.value1d.toFixed(2);
          const allTimeVolume = x.txVolume.valueAT.toFixed(2);
            
          if( allTimeVolume > 10000 ) {
          //refactor to use async await
          supabase
            .from("SolanaFloorTracker")
            .insert([
              {
                CollectionName: nftName,
                FloorPrice: currentFloor,
                Volume: allTimeVolume,
              },
            ])
            .then((response) => {
              console.log(response);
            });
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

startTracking();

//for later
// async function sendNotification(collection) {
//   let transporter = createTransport({
//     service: "gmail",
//     auth: {
//       user: "*****@gmail.com",
//       pass: "*****",
//     },
//   });

//   let textToSend = `The collection ${collection} has significantly risen in price in the last hour.`;
//   let info = await transporter.sendMail({
//     from: '"Solana Floor Tracker" <*****@gmail.com>',
//     to: "*****@gmail.com",
//     subject: "Solana Floor Tracker Update",
//     text: textToSend,
//   });

//   console.log("Message sent: %s", info.messageId);
// }
