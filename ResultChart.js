import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

const getColor = scaleOrdinal(schemeCategory10);

function ResultChart({ data }) {
  if (!data.length) {
    return null;
  }

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const percent = ((arc.data.value / total) * 100).toFixed(1);

              return (
                <g key={`arc-${index}`}>
                  <path d={pie.path(arc)} fill={getColor(index)} />
                  <text
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={10}
                    textAnchor="middle"
                    fill="white"
                  >
                    {percent}%
                  </text>
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}

export default ResultChart;
