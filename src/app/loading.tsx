import React from "react";

export default function loading() {
  const arr = Array(5).fill(0);

  return (
    <div>
      {arr.map((data) => (
        <div key={data} className="">
          <div className="flex">
            <div className="relative isolate h-10 w-10 overflow-hidden rounded-full shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent"></div>

            <div className="ms-4 flex flex-col space-y-2">
              <div className="space-y-1">
                <div className="relative isolate h-3 w-36 overflow-hidden rounded-md shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent"></div>
                <div className="relative isolate h-2 w-20 overflow-hidden rounded-md shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent"></div>
              </div>
              <div className="relative isolate h-7 w-64 overflow-hidden rounded-md shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
