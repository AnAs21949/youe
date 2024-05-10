import React, { useEffect, useState } from "react";
import "./App.css";
import { VscDebugStart } from "react-icons/vsc";
import { FaStop } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import aeroLogo from "../public/aeroclub.png";
import ComLogo from "../public/logo competition.png";

function App() {
  const [chal, setChal] = useState({
    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
  });
  const [fail, setFail] = useState({
    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
  });
  const [seconds, setSeconds] = useState(360);
  const [counting, setCounting] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentGr, setCurrentGr] = useState({
    name: "",
    score: 0,
    time: 0,
  });

  const startCounting = () => {
    setCounting(true);
  };

  const stopCounting = () => {
    setCounting(false);
  };

  const resetCounting = () => {
    setSeconds(360);
    setCounting(false);
    // console.log("sssssssssssssssss");
  };

  const save = () => {
    const newGroup = {
      name: currentGr.name,
      score: currentGr.score,
      time: seconds,
    };

    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const updatedGroups = [...storedGroups, newGroup];
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setCurrentGr({ name: "", score: 0, time: 0 });
    stopCounting();

    setChal({
      D1: false,
      D2: false,
      D3: false,
      D4: false,
      D5: false,
    });
    setFail({
      D1: false,
      D2: false,
      D3: false,
      D4: false,
      D5: false,
    });
  };

  const orderingTable = (groups) => {
    const sortedGroups = [...groups].sort((a, b) => b.score - a.score);
    setGroups(sortedGroups);
  };

  const clearStorage = () => {
    localStorage.removeItem("groups");
    setGroups([]);
  };

  useEffect(() => {
    let intervalId;

    if (counting && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [counting, seconds]);

  useEffect(() => {
    orderingTable(groups);
  }, [groups]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, [groups]);
  return (
    <>
      <section className="bg-slate-600 p-14 flex flex-col items-center relative">
        <img src={aeroLogo} className="absolute w-[23%] left-0 top-0" alt="" />
        <img
          src={ComLogo}
          className="absolute w-[48%] -right-36 -top-[12.6rem]"
          alt=""
        />
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-5 justify-center items-center w-full">
            {/* <label htmlFor="groupName">Group Name:</label> */}
            <h1 className="font-semibold max-w-[55vw] pl-4 text-2xl text-blue-950 z-40 ">
              The first edition of the AIRC Competition Under the theme "Line
              following and directing robot"
            </h1>
            <input
              onChange={(e) => {
                setCurrentGr((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              type="text"
              id="groupName"
              className="outline-none rounded-full px-16 py-9 text-slate-500 font-bold text-center"
            />
          </div>
          {/* <p>Score: {currentGr.score}</p>

          {counting && (
            <button onClick={save} className="px-6 py-2 rounded-lg bg-red-500">
              Save
            </button>
          )} */}
        </div>

        <section className="mt-7 items-center flex gap-5">
          <div className="flex gap-5 justify-center items-center w-full">
            {/* <label htmlFor="time">Timer:</label> */}
            <p className="bg-white rounded-full px-24 py-5 font-semibold text-2xl text-red-500">
              {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
              {seconds % 60}
            </p>
          </div>
        </section>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={startCounting}
            className="bg-slate-400 rounded-full px-3 "
          >
            <VscDebugStart className="text-6xl" />
          </button>

          <button
            onClick={stopCounting}
            className="bg-slate-400 rounded-full px-3 py-0"
          >
            <FaStop className="text-6xl" />
          </button>

          <button
            onClick={resetCounting}
            className="bg-slate-400 rounded-full px-3"
          >
            <GrPowerReset className="text-6xl" />
          </button>
        </div>

        <div className="mt-5 flex gap-10 items-center">
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-3xl flex flex-col gap-10 p-8 pt-4">
              <h1 className="font-semibold text-5xl text-[#34345f] tracking-widest ">
                SCORE
              </h1>
              <p className="text-blue-900 text-9xl ">{currentGr.score}</p>
            </div>

            <button
              onClick={save}
              className="px-6 py-2 rounded-lg bg-[#34345f] text-white tracking-wider text-xl font-semibold"
            >
              Save
            </button>
          </div>

          <div className="h-[45vh] font-semibold text-blue-900">
            <table className="bg-white rounded-xl h-[100%] ">
              <thead>
                <tr className="relative after:absolute after:bottom-0 after:w-full after:bg-slate-600 after:h-1 after:left-0">
                  <th className="p-2 border-slate-600 border-r-4">défi</th>
                  <th className="p-2 border-slate-600 border-r-4">points</th>
                  <th className="p-2 border-slate-600 border-r-4">Valider</th>
                  <th className="p-2 border-slate-600 border-r-4">Dépasser</th>
                  <th className="p-2 ">Pénalités</th>
                </tr>
              </thead>

              <tr className="  relative after:absolute after:bottom-0 after:w-full after:bg-slate-600 after:h-1 after:left-0 ">
                <td className="border-slate-600 border-r-4 ">01</td>
                <td className="border-slate-600 border-r-4">20</td>
                <td className="border-slate-600 border-r-4 bg-green-500">
                  {" "}
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score + 20,
                      }));
                      setChal((prev) => ({ ...prev, D1: true }));
                    }}
                  >
                    {chal.D1 ? <MdDone /> : "+20"}
                  </button>
                </td>
                <td className="border-slate-600 border-r-4 bg-red-500">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 20,
                      }));
                      setFail((prev) => ({ ...prev, D1: true }));
                    }}
                  >
                    {fail.D1 ? <MdDone /> : "-20"}
                  </button>
                </td>

                <td className="border-slate-600 bg-red-400">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 10,
                      }));
                    }}
                  >
                    -10
                  </button>
                </td>
              </tr>

              <tr className="  relative after:absolute after:bottom-0 after:w-full after:bg-slate-600 after:h-1 after:left-0">
                <td className="border-slate-600 border-r-4">02</td>
                <td className="border-slate-600 border-r-4">20</td>
                <td className="border-slate-600 border-r-4 bg-green-500">
                  {" "}
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score + 20,
                      }));
                      setChal((prev) => ({ ...prev, D2: true }));
                    }}
                  >
                    {chal.D2 ? <MdDone /> : "+20"}
                  </button>
                </td>
                <td className="border-slate-600 border-r-4 bg-red-500">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 20,
                      }));
                      setFail((prev) => ({ ...prev, D2: true }));
                    }}
                  >
                    {fail.D2 ? <MdDone /> : "-20"}
                  </button>
                </td>
                <td className="border-slate-600 bg-red-400">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 10,
                      }));
                    }}
                  >
                    -10
                  </button>
                </td>
              </tr>

              <tr className="relative after:absolute after:bottom-0 after:w-full after:bg-slate-600 after:h-1 after:left-0 ">
                <td className="border-slate-600 border-r-4">03</td>
                <td className="border-slate-600 border-r-4">50</td>
                <td className="border-slate-600 border-r-4 bg-green-500">
                  {" "}
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score + 50,
                      }));
                      setChal((prev) => ({ ...prev, D3: true }));
                    }}
                  >
                    {chal.D3 ? <MdDone /> : "+50"}
                  </button>
                </td>
                <td className="border-slate-600 border-r-4 bg-red-500">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 50,
                      }));
                      setFail((prev) => ({ ...prev, D3: true }));
                    }}
                  >
                    {fail.D3 ? <MdDone /> : "-50"}
                  </button>
                </td>
                <td className="border-slate-600 bg-red-400">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 10,
                      }));
                    }}
                  >
                    -10
                  </button>
                </td>
              </tr>

              <tr className="relative after:absolute after:bottom-0 after:w-full after:bg-slate-600 after:h-1 after:left-0 ">
                <td className="border-slate-600 border-r-4">04</td>
                <td className="border-slate-600 border-r-4">40</td>
                <td className="border-slate-600 border-r-4 bg-green-500">
                  {" "}
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score + 40,
                      }));
                      setChal((prev) => ({ ...prev, D4: true }));
                    }}
                  >
                    {chal.D4 ? <MdDone /> : "+40"}
                  </button>
                </td>
                <td className="border-slate-600 border-r-4 bg-red-500">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 40,
                      }));
                      setFail((prev) => ({ ...prev, D4: true }));
                    }}
                  >
                    {fail.D4 ? <MdDone /> : "-40"}
                  </button>
                </td>
                <td className="border-slate-600 bg-red-400">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 10,
                      }));
                    }}
                  >
                    -10
                  </button>
                </td>
              </tr>

              <tr className="border-slate-600 ">
                <td className="border-slate-600 border-r-4">05</td>
                <td className="border-slate-600 border-r-4">80</td>
                <td className="border-slate-600 border-r-4 bg-green-500">
                  {" "}
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score + 80,
                      }));
                      setChal((prev) => ({ ...prev, D5: true }));
                    }}
                  >
                    {chal.D5 ? <MdDone /> : "+80"}
                  </button>
                </td>
                <td className="border-slate-600 border-r-4 bg-red-500">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 80,
                      }));
                      setFail((prev) => ({ ...prev, D5: true }));
                    }}
                  >
                    {fail.D5 ? <MdDone /> : "-80"}
                  </button>
                </td>
                <td className="border-slate-600 bg-red-400">
                  <button
                    onClick={() => {
                      setCurrentGr((prev) => ({
                        ...prev,
                        score: prev.score - 10,
                      }));
                    }}
                  >
                    -10
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <div className="h-[45vh]">
            <table
              className="bg-white rounded-2xl overflow-hidden"
              tabIndex="3"
            >
              <thead>
                <tr className="p-4">
                  <td className="p-4 border border-slate-600 overflow-hidden">
                    Groupe
                  </td>
                  <td className="p-4 border border-slate-600 overflow-hidden">
                    Order
                  </td>
                  <td className="p-4 border border-slate-600 overflow-hidden">
                    Score
                  </td>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => (
                  <tr key={index}>
                    <td className="px-2 border-2 border-slate-600 ">
                      {group.name}
                    </td>
                    <td className="px-2 border-2 border-slate-600 ">
                      {index + 1}
                    </td>
                    <td className="px-2 border-2 border-slate-600 ">
                      {group.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={clearStorage}
          className="bg-red-600 rounded-lg px-4 py-3 mt-16"
        >
          Clear Everything
        </button>
        {/* <div className="flex items-center gap-3 flex-col">
          <div className=" flex gap-4 items-center">
            <h1>Défi 1:</h1>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score + 20,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-green-400"
            >
              +20
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 10,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-500"
            >
              -10
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 20,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-700"
            >
              -20
            </button>
          </div>
          <div className=" flex gap-4 items-center">
            <h1>Défi 2:</h1>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score + 20,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-green-400"
            >
              +20
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 10,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-500"
            >
              -10
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 20,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-700"
            >
              -20
            </button>
          </div>
          <div className=" flex gap-4 items-center">
            <h1>Défi 3:</h1>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score + 50,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-green-400"
            >
              +50
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 10,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-500"
            >
              -10
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 50,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-700"
            >
              -50
            </button>
          </div>
          <div className=" flex gap-4 items-center">
            <h1>Défi 4:</h1>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score + 40,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-green-400"
            >
              +40
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 10,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-500"
            >
              -10
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 40,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-700"
            >
              -40
            </button>
          </div>
          <div className=" flex gap-4 items-center">
            <h1>Défi 5:</h1>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score + 80,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-green-400"
            >
              +80
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 10,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-500"
            >
              -10
            </button>
            <button
              onClick={() => {
                setCurrentGr((prev) => ({
                  ...prev,
                  score: prev.score - 80,
                }));
              }}
              className="px-6 py-2 rounded-lg bg-red-700"
            >
              -80
            </button>
          </div>
        </div> */}

        {/* {groups.map((item) => (
          <div
            key={item.group1}
            className="flex flex-col gap-4 mt-20 bg-gray-600 p-5 rounded-md"
          >
            <h1>Groupe Name: {item.name}</h1>
            <h1>Score: {item.score}</h1>
            <h1>time: {item.time}</h1>
          </div>
        ))} */}
      </section>

      {/* <section>
        <table className="bg-slate-200 rounded-md table-fixed">
          <thead>
            <tr>
              <td className="p-2">défi</td>
              <td className="p-2">points</td>
              <td className="p-2">Valider</td>
              <td className="p-2">Dépasser</td>
            </tr>
          </thead>

          <tr className="p-2">
            <td>01</td>
            <td>20</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score + 20,
                  }));
                }}
              >
                +20
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score - 20,
                  }));
                }}
              >
                -20
              </button>
            </td>
          </tr>

          <tr>
            <td>02</td>
            <td>20</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score + 20,
                  }));
                }}
              >
                +20
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score - 20,
                  }));
                }}
              >
                -20
              </button>
            </td>
          </tr>

          <tr>
            <td>03</td>
            <td>50</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score + 50,
                  }));
                }}
              >
                +50
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score - 50,
                  }));
                }}
              >
                -50
              </button>
            </td>
          </tr>

          <tr>
            <td>04</td>
            <td>40</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score + 40,
                  }));
                }}
              >
                +40
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score - 40,
                  }));
                }}
              >
                -40
              </button>
            </td>
          </tr>

          <tr>
            <td>05</td>
            <td>80</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score + 80,
                  }));
                }}
              >
                +80
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setCurrentGr((prev) => ({
                    ...prev,
                    score: prev.score - 80,
                  }));
                }}
              >
                -80
              </button>
            </td>
          </tr>
        </table>
      </section> */}

      {/* <section>
        <table>
          <thead>
            <tr>
              <td>Groupe</td>
              <td>Order</td>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={index}>
                <td>{group.name}</td>
                <td>{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}
    </>
  );
}

export default App;
