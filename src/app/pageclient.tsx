"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Device } from "@/common/tech/tech";
import { AppStorageService } from "@/common/storage/appstrclient";
import { userlogin } from "@/application/server/userlogin";
import { AppUI, useClientReady } from "@/style/appui";
import "@/css/allwidths.css";

const modeTest:boolean = true;

export default function PageClient() {

    const router = useRouter(); 
    useEffect(() => {
        if (modeTest) {
            router.push("/module/toolvfa"); 
        }
    }, [router]);

    return (

        <div id="cont_root" className="w-full h-auto" >

            <div className="grid grid-cols-4 gap-4 place-items-center">

                <a href="/module/toolvfa" className="w-full h-full">
                    <div id="module1"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option1.jpg)]"></div>
                </a>

                <a href="/reports/style/daisyui" className="w-full h-full">
                    <div id="module2"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option2.jpg)]"></div>
                </a>

                <a href="/reports/style/tailwind" className="w-full h-full">
                    <div id="module3"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option3.jpg)]"></div>
                </a>

                <a href="/test/canvas" className="w-full h-full">
                    <div id="module4"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option4.jpg)]"></div>
                </a>

                <a href="/quantum" className="w-full h-full">
                    <div id="module5"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option1.jpg)]"></div>
                </a>

                <a href="/tool/toolvfa" className="w-full h-full">
                    <div id="module6"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option2.jpg)]"></div>
                </a>

                <a href="/tool/toolvfa" className="w-full h-full">
                    <div id="module7"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option3.jpg)]"></div>
                </a>

                <a href="/tool/toolvfa" className="w-full h-full">
                    <div id="module8"
                        className="gridCellPerfect square bg-[url(/cssimages/home/option4.jpg)]"></div>
                </a>

            </div>

        </div>

    );

}//end
