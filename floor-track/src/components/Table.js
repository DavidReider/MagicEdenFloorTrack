import React from "react";
import { supabase } from "../lib/supabase-api";

export default function Table() {
  const test = async () => {
    let { data, error } = await supabase.rpc("test1");
    if (error) {
      console.error(error);
    }
    console.log(data);
  };

  test();

  return (
    <div className="container">
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
    </div>
  );
}
