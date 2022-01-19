import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase-api";

export default function Table() {
  //setting the state for data fetching: Loading, Success or the Error message
  const [fetchState, setFetchState] = useState("LOADING");
  //the rows to display on the table
  const [rows, setRows] = useState([]);

  useEffect(
    () =>
      supabase
        .rpc("fetch_data")
        //only selecting the given columns
        .select("FloorPrice, CollectionName, Volume, created_at")
        //TODO: add pagination to reduce the number of results shown each time
        .order("CollectionName", { ascending: true })
        .order("created_at", { ascending: true })
        .then(({ error, data, count, status, statusText }) => {
          if (error) {
            //you can test this by adding a letter to 'SolanaFloorTracker' to see error.message
            //by adding a letter to 'FloorPrice' you can see error.message and error.hint
            setFetchState(`${error.message}. ${error.hint || ""}`);
            return;
          }
          //if we have data to show print here
          if (data && data.length) {
            setRows(combineRows(data));
            setFetchState("SUCCESS");
            return;
          }
          // if we dont get any results
          setFetchState("No results");
          return;
        })
        .catch((error) => {
          // set the error message here
          // this was especially useful when writing the
          // combine rows function as icould see the errors
          setFetchState(error.message);
          return;
        }),
    []
  );

  const combineRows = (data) => {
    // empty array to keep the new combined objects
    const newArray = [];
    // looping through the results
    data.forEach((current, index) => {
      // if the current row number is divisable by 2
      // means the next row will be the matching pair of the current row
      // we rely on the data being structured here structure
      // which is not the best solution as now if the order gets shuffled
      // this wont work
      if (index % 2 === 0) {
        // adding a new key value pair to the object
        // the next obejects floor price, which is the
        // latest floor price
        current["latestPrice"] = data[index + 1].FloorPrice;
        // push the result to the empty array
        newArray.push(current);
      }
    });

    return newArray;
  };

  return (
    <div className="container">
      {fetchState === "LOADING" && <h2>Loading</h2>}
      {fetchState === "SUCCESS" && (
        <table id="floorResults">
          <thead>
            <tr>
              <th>Collection Name</th>
              <th>Current Floor Price</th>
              <th>Previous Floor Price (1-day)</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {rows.length &&
              rows.map((row, index) => (
                <tr key={index}>
                  {/* this is just place holder to put all the data we have so far */}
                  {/* we still need to calculate the previous floor and remove te rows before that */}
                  <td>{row.CollectionName}</td>
                  <td>{row.latestPrice}</td>
                  <td>{row.FloorPrice}</td>
                  <td>{row.Volume}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {fetchState !== "LOADING" && fetchState !== "SUCCESS" && (
        <div>
          <h2>Oops, can not fetch data.</h2>
          <p>{fetchState}</p>
        </div>
      )}
    </div>
  );
}
