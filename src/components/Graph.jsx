import React from "react";

const Graph = ({ data, currentIndices, sortingAlgo }) => {
    return (
        <div className="graph-container w-full flex flex-col bg-[#3c3c3b] rounded-xl shadow-lg flex-1/2">
            <p className="flex justify-center px-3 py-1 text-lg text-white font-bold">
                {sortingAlgo.charAt(0).toUpperCase() + sortingAlgo.slice(1)}{" "}
                Sort
            </p>
            <div className="graph p-4 rounded-lg text-white flex justify-center items-end shadow-md min-h-48 sm:min-h-64 md:min-h-96 w-full lg:w-[100%] flex-1/2 scroll-auto">
                {data.map((value, index) => {
                    const maxValue = Math.max(...data);
                    const heightPercentage = (value / maxValue) * 100;
                    const isCurrent = currentIndices.includes(index);
                    return (
                        <div
                            key={index}
                            style={{
                                height: `${heightPercentage}%`,
                                width: "clamp(2%, 3%, 4%)", // Responsive width
                                margin: "0 0.5%",
                                backgroundColor: isCurrent
                                    ? "#FF4500" // OrangeRed color for current
                                    : "#1E90FF", // DodgerBlue for others
                                borderRadius: "10px 10px 0 0",
                                transition:
                                    "height 0.5s ease-in-out, background-color 0.5s ease-in-out, transform 0.5s ease-in-out",
                                transform: isCurrent
                                    ? "scale(1.1)"
                                    : "scale(1)",
                                boxShadow: isCurrent
                                    ? "0 0 20px 5px rgba(255, 69, 0, 0.7)" // OrangeRed shadow for current
                                    : "0 0 10px 3px rgba(30, 144, 255, 0.5)", // DodgerBlue shadow for others
                            }}
                            className="flex justify-center items-end relative "
                            aria-label={`Bar ${index + 1} with value ${value}`}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-20px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: "clamp(0.6rem, 2vw, 0.8rem)", // Responsive font size
                                    textShadow:
                                        "1px 1px 2px rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                {value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Graph;
