import React, { useState } from "react";
import { supabase } from "../lib/supabase-api";

export default function Table() {
  const [fetchState, setFetchState] = useState("LOADING");
  const [rows, setRows] = useState([]);

  const test = async () => {
    let { data, error } = await supabase
      .from("SolanaFloorTracker")
      .select("CollectionName, FloorPrice")
      .textSearch("CollectionName", "business")
      .order("CollectionName", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      setFetchState(error.message);
      throw new error();
    }

    if (!data.length) {
      setFetchState("No Results returned");
      throw new error("No Results returned");
    }
    setFetchState("SUCCESS");
    console.log(`fetched ${data.length} rows`);
    return data;
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
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      )}
      {fetchState !== "LOADING" && fetchState !== "SUCCESS" && (
        <div>
          <h2>Failed to fetch data, please try again later.</h2>
          <p>{fetchState}</p>
        </div>
      )}
    </div>
  );
}
