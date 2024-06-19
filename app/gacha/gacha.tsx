"use client";

import Summon from "@/components/ui/button/summon";
import { useEffect, useState } from "react";

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
  const [gachaResult, setGachaResult]: any = useState([]);
  console.log(gachaPool)
  useEffect(() => {
    async function getData() {
      await fetch("https://api.atlasacademy.io/export/NA/nice_servant.json")
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
  
  return (
    <div>
      {gachaResult.map((item: any, index: any) => {
        return (
          <div key={index}>
            {item.name} {item.rarity}
          </div>
        );
      })}
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
