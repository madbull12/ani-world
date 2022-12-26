import React from "react";
import { Bar } from "react-chartjs-2";
import { AiFillEye, AiFillSchedule } from "react-icons/ai";
import { IoPauseCircleSharp } from "react-icons/io5";
import { MdCancel, MdOutlineIncompleteCircle } from "react-icons/md";
import {  Stats } from "../interface";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { useRouter } from "next/router";
Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );
  

const StatsComponent = ({ stats }: { stats: Stats }) => {
    const router = useRouter()
  return (
    <>
      <div
        className={`grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-center  `}
      >
        <div
          className={`text-blue-500 max-w-[200px] bg-blue-100  p-4 xs:p-2 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce `}
        >
          <AiFillEye className={`text-5xl `} />
          <p className="text-sm  font-semibold text-center">
            {router.pathname.includes("/manga") ? `Reading:${stats.reading.toLocaleString()}`:`Watching: ${stats.watching.toLocaleString()}`}
             
          </p>
        </div>
        <div
          className={`text-blue-500 max-w-[200px]  bg-blue-100  p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce`}
        >
          <MdOutlineIncompleteCircle className="text-5xl " />
          <p className="text-sm  font-semibold text-center">
            Completed: {stats.completed.toLocaleString()}
          </p>
        </div>
        <div
          className={`text-blue-500 max-w-[200px]  bg-blue-100  p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce`}
        >
          <IoPauseCircleSharp className="text-5xl " />
          <p className="text-sm  font-semibold text-center">
            On hold: {stats.on_hold.toLocaleString()}
          </p>
        </div>
        <div
          className={`text-blue-500 max-w-[200px]  bg-blue-100  p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce`}
        >
          <MdCancel className="text-5xl " />
          <p className="text-sm  font-semibold text-center">
            Dropped: {stats.dropped.toLocaleString()}
          </p>
        </div>
        <div
          className={`text-blue-500  max-w-[200px] text-center bg-blue-100  p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce`}
        >
          <AiFillSchedule className="text-5xl " />
          <p className="text-sm  font-semibold text-center">
            Plan to read: {stats.plan_to_read.toLocaleString()}
          </p>
        </div>
      </div>
      <Bar
        data={{
          labels: stats?.scores.map((score) => score.score),
          datasets: [
            {
              label: "Number of user's voted rating",
              data: stats?.scores.map((score) => score.votes),
              backgroundColor: "rgba(59, 130 ,246,0.2)",
            },
          ],
        }}
      />
    </>
  );
};

export default StatsComponent;
