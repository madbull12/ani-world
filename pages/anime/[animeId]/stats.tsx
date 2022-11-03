import { Jelly } from "@uiball/loaders";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import { AiFillEye, AiFillSchedule } from "react-icons/ai";
import { MdOutlineIncompleteCircle, MdCancel } from "react-icons/md";
import { IoPauseCircleSharp } from "react-icons/io5";

import { Bar, Doughnut } from "react-chartjs-2";
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
import { Stats } from "../../../interface";
import { useTheme } from "../../../lib/zustand";
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Stats = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}`,
    fetcher
  );

  const { data: animeStats } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/statistics`,
    fetcher
  );

  const { data: anime } = data || {};
  const { data: stats }: { data: Stats } = animeStats || {};
  console.log(data);

  const { theme } = useTheme();

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      {stats ? (
        <div className="px-4 pb-4 space-y-4">
          <div
            className={`flex gap-x-2 justify-center [&>*]:text-${theme}-500 [&>*]:bg-${theme}-100`}
          >
            <div className="bg-blue-100 p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce ">
              <AiFillEye className={`text-5xl `} />
              <p className="text-sm  font-semibold">
                Watching: {stats.watching.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce">
              <MdOutlineIncompleteCircle className="text-5xl " />
              <p className="text-sm  font-semibold">
                Completed: {stats.completed.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce">
              <IoPauseCircleSharp className="text-5xl " />
              <p className="text-sm  font-semibold">
                On hold: {stats.on_hold.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce">
              <MdCancel className="text-5xl " />
              <p className="text-sm  font-semibold">
                Dropped: {stats.dropped.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg cursor-pointer flex flex-col items-center hover:animate-bounce">
              <AiFillSchedule className="text-5xl " />
              <p className="text-sm  font-semibold">
                Plan to watch: {stats.plan_to_watch.toLocaleString()}
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
        </div>
      ) : (
        <div className="h-full w-full grid place-items-center">
          <Jelly color="#007CEF" />
        </div>
      )}
    </div>
  );
};

export default Stats;
