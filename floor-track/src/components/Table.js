import React from "react";
import { supabase } from "../lib/supabase-api";

export default function Table() {
  const test = async () => {
    let { data, error } = await supabase.from("SolanaFloorTracker").select("*");
    if (error) {
      console.error(error);
    }
    console.log(data);
  };

  test();

  return <div>Table Goes Here</div>;
}
