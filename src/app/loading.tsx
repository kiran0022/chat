import React from "react";

export default function loading() {
  return (
    <div>
      <div className="flex animate-pulse">
        <div className="flex-shrink-0">
          <span className="w-16 h-16 block bg-gray-200 rounded-full"></span>
        </div>
        <div className="ms-4 mt-2 w-full">
          <h3 className="w-48 h-4 bg-gray-200 rounded-full"></h3>
          <ul className="mt-5 space-y-3">
            <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full"></li>
          </ul>
        </div>
      </div>

      {/* 


      <div class="flex h-screen w-screen items-center justify-center bg-slate-600">
        <div class="h-64 w-96 border">
          <div class="flex">
            <div class="h-10 w-10 rounded-full bg-white"></div>
            <div class="bg-gradient-to-r from-transparent -translate-x-full animate-[shimmer_2s_infinite] via-violet-300 to-transparent">
              {" "}
            </div>
            <div class="ms-4 flex flex-col space-y-2">
              <div class="space-y-1">
                <div class="h-3 w-36 rounded-md bg-slate-200"></div>
                <div class="h-2 w-20 rounded-md bg-slate-200"></div>
              </div>
              <div class="h-7 w-64 rounded-md bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* ------ */}
    </div>
  );
}
