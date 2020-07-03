import axios from "axios";
import { dir } from "tmp-promise";
import * as download from "download";
import { BingResponse } from "./types";
import { set } from "wallpaper";
import { join } from "path";

const setWallpaper = async () => {
  // 1 - Get wallpaper info from bing
  console.log("Fetching wallpaper info ...");
  const { data: wallaPaperInfo } = await axios.get<BingResponse>(
    "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
    {
      responseType: "json",
    },
  );

  // 2 - Create temporarily directory
  console.log("Creating temporary directory ...");
  const { path, cleanup } = await dir({ unsafeCleanup: true }); // Create temporary file

  // 3 - Download and save image temporarily
  console.log("Downloading wallpaper ...");
  await download("https://www.bing.com" + wallaPaperInfo.images[0].url, path, {
    filename: "bing-wallpaper.jpg",
  });

  // 3 - Set image as desktop wallpaper
  console.log("Applying wallpaper ...");
  await set(join(path, "bing-wallpaper.jpg"));

  // 4 - cleanup
  console.log("Cleaning up ...");
  await cleanup();
};

// Run the whole shit
setWallpaper();
