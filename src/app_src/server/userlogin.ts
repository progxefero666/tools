"use server";

import path from "path";
import AppServerConfig from "@/app_src/server/appsrvconfig";
import { SystemFileUtil } from "../../lib/server/systemfileutil";

function getRandomInt(): number {
  const min = 1;
  const max = 100000; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function userlogin(): Promise<number> {

  const userId = getRandomInt();
  const userRootFolder:string= AppServerConfig.gerUsersRootFolder(process.env.NODE_ENV );
  const userFolder:string = path.join(userRootFolder,userId.toString());
  const dirCreated: boolean = await SystemFileUtil.createDir(userFolder); 
  if (dirCreated) {
    return userId;
  } 
  return -1;
}//end