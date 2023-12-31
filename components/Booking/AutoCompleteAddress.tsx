"use client";
import React, { useEffect, useState } from "react";

function AutoCompleteAddress() {
  const [source, SetSource] = useState<any>();
  const [addressList, SetAddressList] = useState<any>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source]);

  const getAddressList = async () => {
    const res = await fetch("/api/search-address?q=" + source, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    SetAddressList(result);
  };

  return (
    <div className="mt-5">
      <div className="relative">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md
           outline-none focus:border-yellow-300"
          value={source}
          onChange={(e) => SetSource(e.target.value)}
        />
        {addressList?.suggestions ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  SetSource(item.full_address);
                  SetAddressList([]);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md
           outline-none focus:border-yellow-300"
        />
      </div>
    </div>
  );
}

export default AutoCompleteAddress;
