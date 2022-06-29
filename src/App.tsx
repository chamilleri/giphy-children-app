import React, { useState } from "react";
import "./App.scss";
import animals from "./Animals.json";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import ResizeObserver from "react-resize-observer";

const gf = new GiphyFetch("D31L73ySufmBJ3YBDkmbVnH9TuWXuvMa");

const GiphyGrid = ({ animal }: { animal: string }) => {
  const fetchGifs = (offset: number) =>
    gf.search(animal, { offset, limit: 10, rating: "y" });
  const [width, setWidth] = useState(window.innerWidth);

  const noOfColumns = (width: number) => {
    if (width > 1000) {
      return 5;
    } else if (width > 800) {
      return 4;
    } else if (width > 600) {
      return 3;
    } else if (width > 400) {
      return 2;
    }
    return 1;
  };

  return (
    <>
      <Grid
        key={animal}
        fetchGifs={fetchGifs}
        width={width}
        columns={noOfColumns(width)}
        gutter={8}
        noLink
        hideAttribution
        borderRadius={8}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </>
  );
};

export const App = () => {
  const [selectedAnimal, setSelectedAnimal] = useState("");

  return (
    <div className="App">
      <h1>Choose an animal</h1>
      <ul>
        {animals.map((a: string, i: number) => (
          <li
            key={"animal" + i}
            className={a === selectedAnimal ? "active" : ""}
            onClick={() => setSelectedAnimal(a)}
          >
            {a}
          </li>
        ))}
      </ul>
      <div className="results">
        <GiphyGrid animal={selectedAnimal} />
      </div>
    </div>
  );
};

export default App;
