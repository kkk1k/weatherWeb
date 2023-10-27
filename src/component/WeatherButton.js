import React from "react";

export default function WeatherButton({ cities,setCity }) {
  
  return (
    <div>
      <button
      onClick={()=> setCity("")}
        type="button"
        class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
      >current location</button>
      {cities.map((item,index) => (
        <button
          type="button"
          key={index}
          onClick={() => setCity(item)}
          class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
