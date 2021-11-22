//const apiUrl = "https://api-mainnet.magiceden.io/all_collections";
const apiUrl =
  "https://api-mainnet.magiceden.io/rpc/getAggregatedCollectionMetrics";

async function fetchData(url) {
  const response = await fetch(url);
  let data = await response.json();
  return data;
}

const collections = fetchData(apiUrl);
collections.then(function (data) {
  data.results.forEach((x) => {
    console.log(x);
    const nftName = x.name;
    const currentFloor = x.floorPrice.value1d.toFixed(2);
    const previous1d = x.floorPrice.prev1d.toFixed(2);

    if (currentFloor > previous1d) {
      populateTable(nftName, currentFloor, previous1d);
    }
  });
});

/**
 * Rewrite to fetch data from Supabase.
 * We will want to loop through each unique collection name and then fetch all rows from that collection.
 * Then, we will populate the homepage table with the two most recent floor prices (one being the 'current', or most recent, and the other being the last floor price)
 */

function populateTable(collName, currFloor, prevFloor) {
  const table = document.getElementById("floorResults");
  const row = document.createElement("tr");
  const name = document.createElement("td");
  const floor = document.createElement("td");
  const pfloor = document.createElement("td");

  name.innerHTML = collName;
  floor.innerHTML = currFloor;
  pfloor.innerHTML = prevFloor;

  row.appendChild(name);
  row.appendChild(floor);
  row.appendChild(pfloor);

  table.appendChild(row);
}
