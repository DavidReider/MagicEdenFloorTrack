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
        //filtering the results that only have 'business' in the name
        //so that we have less data to test and work with which is easier
        //TODO: Replace this text search with pagination
        .textSearch("CollectionName", "business")

        //I am unable to make this work I am basically tryinhg to only get
        //last 2 options for each project
        //.rangeAdjacent("created_at", ["2021-12-25", "2021-12-28"])

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
            setRows(data);
            setFetchState("SUCCESS");
            return;
          }
          // if we dont get any results
          setFetchState("No results");
          return;
        })
        .catch((error) => {
          setFetchState(error.message);
          return;
        }),
    []
  );


  const test = async () => {
    let { data, error } = await supabase.rpc("fetch_data");
    if (error) {
      console.error(error);
    }
    console.log(data);

  };

  test();
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
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length &&
              rows.map((row, index) => (
                <tr key={index}>
                  {/* this is just place holder to put all the data we have so far */}
                  {/* we still need to calculate the previous floor and remove te rows before that */}
                  <td>{row.CollectionName}</td>
                  <td>{row.FloorPrice}</td>
                  <td>{row.FloorPrice}</td>
                  <td>{row.Volume}</td>
                  <td>{row.created_at}</td>
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
