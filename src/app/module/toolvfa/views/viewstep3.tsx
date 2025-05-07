
import React, { useEffect, useState } from 'react';
import { useClientReady } from '@/style/appui';
import { CmOperation } from '@/application/appcommon';
import { HtmlProgressBar } from '@/components/common/progressbar';
import { ESMessage } from '@/common/api/esmessage';
import { FrontData, FrontProcess } from '@/application/toolvfa/vfactrbase';

import { testVideoGen } from '@/app/api/toolvfa/test/testservice';
import ReactJsonPretty from 'react-json-pretty';
import '@/css/monikai.css';

/*
    product: ToolProduct;
*/
export interface IfcToolVfaPageStep3 {
    userId: number;
    callendgeneration: () => void;
}

let videoGenerator: EventSource | null = null;
let viewDoc: boolean = false;

export default function ToolVfaPageStep3({ userId, callendgeneration }: IfcToolVfaPageStep3) {
    const [progBarCiValue, setProgBarCiValue] = useState<string>("0");
    const [progBarSvValue, setProgBarSvValue] = useState<string>("0");
    const [sseError, setSseError] = useState<string | null>(null);

    useEffect(() => {    

        if (videoGenerator) {
            //videoGenerator.close();
        }
    }, []);

    const start = () => {
        //videoGenerator = new EventSource(`/api/toolvfa/videogenerator?userId=${userId}`);
        videoGenerator = new EventSource( FrontData.getUserVideoGenPath(userId));
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
            if (filelogDataObj.process === FrontProcess.PROCID_CREATEINPUTS) {
                setProgBarCiValue(filelogDataObj.value);
                if (filelogDataObj.value == "100") {
                    videoGenerator?.close();
                    //callendgeneration?.(); // ← Notifica que el proceso terminó
                }
            }
        } 
        catch (parseError) {
            setSseError("Invalid server response");
            videoGenerator?.close();
        }
    }

    const onVideoGenerationError = (err: Event) => {
        const error = err instanceof ErrorEvent 
            ? `Server error: ${err.message}` 
            : "Connection lost with the server.";
        setSseError(error);        
        if (videoGenerator) {
            videoGenerator.close();
        }
    };

    
    async function startTest () {
        alert("start Test");
        const result:boolean = await testVideoGen(91254);
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <>
            {viewDoc ? <div className="bg-gray-900 p-4 rounded-lg overflow-auto max-w-full">
                <ReactJsonPretty 
                    className="text-sm font-mono" />
            </div> : null}

            {sseError && <p className="text-red-500">{sseError}</p>}
            <div className="w-full flex flex-col">
                <HtmlProgressBar label="Frames Generation" value={progBarCiValue} />
                <hr />
                <HtmlProgressBar label="Video Save" value={progBarSvValue} />

            </div>
            <div className="w-full flex justify-center mt-3">

                <button
                    className="btn btn-accent"
                    onClick={start} >
                    {CmOperation.OPID_GENERATE}
                </button>

            </div>
        </>
    );
}