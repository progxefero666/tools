
import React, { useEffect, useState } from 'react';
import { useClientReady } from '@/style/appui';
import { CmOperation } from '@/application/appcommon';
import { HtmlProgressBar } from '@/components/common/progressbar';
import { ESMessage } from '@/common/api/esmessage';
import { FrontData, FrontProcess } from '@/application/toolvfa/vfactrbase';

import { testVideoGen } from '@/app/api/toolvfa/test/testservice';
import ReactJsonPretty from 'react-json-pretty';
import '@/css/monikai.css';
import { AppConstants } from '@/common/app/constants';
import { showUiPopupViewJson } from '@/components/modal/puviewjson';
import { VfaVideo } from '@/application/toolvfa/vfavideo';
import { HttpBase } from '@/common/http/httpbase';


export interface IfcToolVfaPageStep3 {
    userId: number;
    tvideo: VfaVideo;
    callendgeneration: () => void;
}

let videoGenerator: EventSource | null = null;
let currProcId: string = AppConstants.UNDEFINED;

export default function ToolVfaPageStep3({ userId, tvideo, callendgeneration }: IfcToolVfaPageStep3) {
    const [progBarCiValue, setProgBarCiValue] = useState<string>("0");
    const [progBarSvValue, setProgBarSvValue] = useState<string>("0");
    const [sseError, setSseError] = useState<string | null>(null);

    const [viewDownloadLink, setViewDownloadLink] = useState<boolean>(false);
    const [downloadUrl, setDownloadUrl] = useState<string>("api/toolvfa/download");

    useEffect(() => {
        setDownloadUrl(FrontData.getUserVideoDownloadPath(userId));
    }, []);

    const start = () => {
        currProcId = "started";
        videoGenerator = new EventSource(FrontData.getUserVideoGenPath(userId));
        videoGenerator.onerror = onVideoGenerationError;
        videoGenerator.onmessage = onVideoGenerationMessage;
    };

    const onVideoGenerationMessage = (event: MessageEvent) => {
        try {
            const filelogDataObj: ESMessage = JSON.parse(event.data);

            if (filelogDataObj.error) {
                setSseError(`Server error: ${filelogDataObj.error}`);
                videoGenerator?.close();
                return;
            }
            setSseError(null);
            //console.log(filelogDataObj.process);
            if (filelogDataObj.process == FrontProcess.PROCGEN_END) {
                //if (currProcId == FrontProcess.PROCID_CREATEINPUTS) {}                
                if (currProcId == FrontProcess.PROCID_SAVEVIDEO) {
                    videoGenerator?.close();
                    onVideoCreated();
                }
            }
            else {
                if (filelogDataObj.process == FrontProcess.PROCID_CREATEINPUTS) {
                    if (currProcId != FrontProcess.PROCID_CREATEINPUTS) {
                        currProcId = FrontProcess.PROCID_CREATEINPUTS
                    }
                    setProgBarCiValue(filelogDataObj.value);
                }
                if (filelogDataObj.process == FrontProcess.PROCID_SAVEVIDEO) {
                    if (currProcId != FrontProcess.PROCID_SAVEVIDEO) {
                        currProcId = FrontProcess.PROCID_SAVEVIDEO
                    }
                    setProgBarSvValue(filelogDataObj.value);
                }
            }
        }
        catch (parseError) {
            setSseError(HttpBase.MSG_SERVERRESPONSE_INVALID);
            videoGenerator?.close();
        }
    }

    const onVideoGenerationError = (err: Event) => {
        const error = err instanceof ErrorEvent
            ? `Server error: ${err.message}`
            : HttpBase.MSG_SERVERCONN_LOST;
        setSseError(error);
        if (videoGenerator) {
            videoGenerator.close();
        }
    };

    async function startTest() {
        showUiPopupViewJson(tvideo.getJsonString()).then(() => { });
        //const result:boolean = await testVideoGen(91254);
    }

    const onVideoCreated = () => {
        setViewDownloadLink(true);
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <>
            {sseError && <p className="text-red-500">{sseError}</p>}
            <div className="w-full flex flex-col">
                <HtmlProgressBar label="Frames Generation" value={progBarCiValue} />
                <hr />
                <HtmlProgressBar label="Video Save" value={progBarSvValue} />
            </div>

            <div className="w-full flex justify-center mt-3">
                {viewDownloadLink ?
                    <a href={downloadUrl} download={tvideo.xvideo.fname}>
                        {CmOperation.OPID_DOWNLOAD_VIDEO}
                    </a>
                :   <button className="btn btn-accent"  onClick={start} >
                        {CmOperation.OPID_GENERATE}
                    </button>
                }
            </div>

        </>
    );
}