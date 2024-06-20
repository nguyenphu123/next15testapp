"use client";

import Summon from "@/components/ui/button/summon";
import { useEffect, useState } from "react";
// import { ProgressLoader } from "nextjs-progressloader";
// Set the probabilities for each rarity level
const probabilities: any = {
  "5": 0.01,
  "4": 0.03,
  "3": 0.4,
  "2": 0.6,
  "1": 0.8,
};
export default function Gacha() {
  const [gachaPool, setGachaPool]: any = useState([]);
  const [isLoading, setIsLoading]: any = useState(true);
  const [gachaResult, setGachaResult]: any = useState([]);
  // console.log(gachaPool)
  useEffect(() => {
    async function getData() {
      await fetch("https://api.atlasacademy.io/export/NA/nice_servant.json")
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            let newItem = {
              name: data[i].name,
              rarity: data[i].rarity,
            };
            setGachaPool((prevState: any) => [...prevState, newItem]);
          }
        });
      await fetch("https://api.atlasacademy.io/export/NA/nice_equip.json")
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            let newItem = {
              name: data[i].name,
              rarity: data[i].rarity,
            };
            setGachaPool((prevState: any) => [...prevState, newItem]);
          }
        });
      setIsLoading(false);
    }
    getData();
  }, []);
  // Define the gacha pool

  // Function to perform a single gacha roll
  function gachaRoll() {
    const roll = Math.random();
    let accumulatedProbability = 0;

    for (let rarity in probabilities) {
      accumulatedProbability += probabilities[rarity];
      if (roll < accumulatedProbability) {
        const items: any = gachaPool.filter(
          (item: { rarity: string }) => item.rarity == rarity
        );

        const randomItem = items[Math.floor(Math.random() * items.length)];

        return { rarity, name: randomItem.name };
      }
    }
  }
  //somethings
  // Function to perform multiple gacha rolls
  function multiRoll(times = 11) {
    const results: any = [];
    let guaranteed4StarOrAbove = false;

    for (let i = 0; i < times; i++) {
      const result: any = gachaRoll();
      //   console.log(result);
      results.push(result);

      if (result.rarity === "4" || result.rarity === "5") {
        guaranteed4StarOrAbove = true;
      }

      if (i === times - 1 && !guaranteed4StarOrAbove) {
        const forced4Star = {
          rarity: "4",
          name: gachaPool.filter(
            (item: { rarity: string }) => item.rarity == "4"
          )[
            Math.floor(
              Math.random() *
                gachaPool.filter(
                  (item: { rarity: string }) => item.rarity == "4"
                ).length
            )
          ].name,
        };
        results[results.length - 1] = forced4Star;
      }
    }
    setGachaResult([...results]);
  }

  return isLoading ? (
    // <ProgressLoader />
    <></>
  ) : (
    <div>
      <div className="grid grid-cols-6 gap-3">
        {gachaResult.map((item: any, index: any) => {
          return (
            <div className="inline-flex" key={index}>
              {item.name}
              <br />
              {[...Array(parseInt(item.rarity))].map((key) => {
                return (
                  <svg
                    key={key}
                    height="12px"
                    width="12px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.94 47.94"
                  >
                    <path
                      style={{ fill: "#ED8A19" }}
                      d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
                    />
                  </svg>
                );
              })}
            </div>
          );
        })}
      </div>

      <Summon
        sqAmount="3"
        summonCount="1"
        backgroundColor="#8E44AD"
        onSummon={() => multiRoll(1)}
      />
      <Summon
        sqAmount="30"
        summonCount="10"
        backgroundColor="#F1C40F"
        onSummon={() => multiRoll()}
      />
    </div>
  );
}
