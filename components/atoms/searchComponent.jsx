import React from "react";

export default function SearchComponent() {
    return (
        <form className="max-w-sm flex ">
            <div className="relative border border-indigo-600 rounded-md">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0  bottom-0  w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="lightblue"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search..."
                    className="xl:w-[500px] placeholder-primary 2xl:w-[550px] h-10 py-3 pl-12 pr-4 text-primary border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>

            <button className="px-4 relative -ms-8 text-white bg-primary border-l rounded ">
                SEARCH
            </button>

        </form>
    );
}