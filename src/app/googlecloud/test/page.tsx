
"use client";

import { useEffect, useRef, useState } from "react";
import { AppUI, useClientReady } from "@/style/appui";
import { getListAllVoices } from "../../../google/motor/tts/service/getallvoices";

// view:css
import "@/css/allwidths.css";

import { GoogleVoiceInfo } from "../../../google/gcvoices/model/gcvoiceinfo";
import { TtsLocalService } from "@/google/motor/tts/ttslocal";

import { AppLang } from "@/application/language/applang";
import { InputSelect } from "@/components/form/inputselect";
import { TtsLocalDocs } from "@/google/motor/tts/ttslocaldocs";
import { CmOperation } from "@/application/appcommon";
import { XButtonIcon } from "@/components/buttons/iconbutton";
import { ButtonsColors, ThemeColors } from "@/style/apptheme";
import { showUiPopupViewJson } from "@/components/modal/puviewjson";
import { TextHelper } from "@/common/text/texthelper";
import { AudioPlayer } from "@/components/common/audioplayer";
import { TextFormatter } from "@/common/text/textformatter";
import { GoogleVoices } from "@/google/gcvoices/gcvoices";
import { XAudio } from "@/multimedia/model/xaudio";
import { InputNumber } from "@/components/form/inputnumber";
import { DigitalTimeDisplay } from "@/components/common/displaytime";
import { GoogleVoAnalizer } from "@/google/gcvoices/gcanalizer";
import { GoogleTextVo } from "@/google/motor/gctext";

//import { GoogleTtsTimeHelper } from "@/google/motor/tts/gtexttospeech";

const OP_SYNTESIS:string = "generate";
const OP_ANALIZE:string = "analize";

const showFilterGeners:boolean = false;
let listVoicesDef: GoogleVoiceInfo[] = [];

const chargeLocalVoices:boolean = true;

export default function PageGoogleCloudTest() {
    
    const [audioSrc, setAudioSrc] = useState<string>("/audios/sample.mp3");
    const [audioDisabled, setAudioDisabled] = useState<boolean>(true);

    const [prevDuration, setPrevDuration] = useState<number>(0);

    const [listVoices,setListVoices] = useState<string[]>([]);

    const selectVoiceRef = useRef<HTMLSelectElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const textoPrueba:string = `Hola, esto es una prueba del sistema de texto a voz.
    Estoy muy emocionado de escuchar cómo suena mi voz generada.
    
    Gracias a la inteligencia artificial, podemos convertir palabras en sonido.
    ¡Es el comienzo de algo increíble!`;

    const chargeAssetsVoices = async () => {  
        listVoicesDef = await TtsLocalDocs.readListVoicesES();  
        setListVoices(TtsLocalService.getListVoiceNames(listVoicesDef));  
    }

    const chargeListVoices = async () => {    
        listVoicesDef  = await TtsLocalService.chargeListVoices(
            AppLang.LNG_CODE_ES,
            GoogleVoices.VO_QUAL_NEURAL2,
            TtsLocalService.VO_GENDER_MALE);
        showUiPopupViewJson(JSON.stringify(listVoicesDef,null,4)).then(() => {});       
    };

    useEffect(() => {
        if  (!chargeLocalVoices){chargeListVoices();}
        else{chargeAssetsVoices();}
                
    }, []);

    const executeActionBar = async (operation: string) => {

        if(operation === OP_SYNTESIS){

            if(!selectVoiceRef.current){alert("not proc voice");return;}
            if(!textareaRef.current){alert("not textareaRef");return;}
            if(!TextHelper.check(textareaRef.current.value)){alert("text incorrect");return;}        
            
            const proc_text:string  = TextFormatter.cleanText(textareaRef.current.value);
            const proc_voice:string = selectVoiceRef.current.value;
            const xaudio:XAudio|null = await TtsLocalService
                .syntTextAudioMp3(AppLang.LNG_CODE_ES,proc_voice,proc_text);      
            alert("end generate"); 

            if(xaudio!=null)    {
                showUiPopupViewJson(xaudio.getJsonString()).then(() => {});   
                const audioUrl = xaudio?.getAudioUrl();     
                alert("setAudioSrc");            
                if(audioUrl){
                    setAudioSrc(audioUrl);
                    setAudioDisabled(false); 
                }                
            }
    
        }
        else if(operation === OP_ANALIZE){
            if(!textareaRef.current){alert("not textareaRef");return;}
            if(!TextHelper.check(textareaRef.current.value)){alert("text incorrect");return;}    
        
            const proc_text:string = TextFormatter.cleanText(textareaRef.current.value);
            const timeAnalizer:GoogleVoAnalizer = GoogleTextVo.DEF_VO_ANALIZER;
            setPrevDuration(timeAnalizer.estimateTextDuration(proc_text));
        }

    }//end 

    const handlePlayPause = () => {
        //console.log("Reproducción/Pausa activada");
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    const process = () => {
        alert();
    }

    return (
        <div id="cont_root" className={AppUI.getRootClassName()}>

            <div className="w-full min-h-[566px] max-h-[566px] grid grid-cols-[30%_1%_69%]  ">

                {/* left colum  */}
                <div className="w-full h-auto">

                    <div className="h-auto mb-[8px] w-full grid grid-cols-2 p-1 border">

                        <div className="flex gap-1">             
                            <XButtonIcon 
                                callback={executeActionBar} operation="analize"
                                btncolor={ButtonsColors.INFO_CONTENT}
                                btnsize="md"
                                iconname="timer"                                
                                iconsize="md"
                                iconcolor="black" />

                            <DigitalTimeDisplay seconds={prevDuration}    
                                                showHours={false}
                                                classname="w-auto items-center" />
                        </div>            

                        <InputSelect name="voices" classname="w-full "
                                     ref={selectVoiceRef}
                                     defaultvalue={listVoices[0]}
                                     collection={listVoices} />

                    </div>

                    <div className="min-h-[500px] w-full items-center justify-center border">
                        <p>left colum</p>
                    </div>
                </div>

                <div></div>

                {/* right colum  */}
                <div className="w-full h-auto">
                    <div className="flex h-auto mb-[8px] w-full items-center gap-1 p-1 border ">
                        <XButtonIcon 
                            callback={executeActionBar} operation="generate"
                            btncolor={ButtonsColors.INFO_CONTENT}
                            btnsize="md"
                            iconname="pulse"                            
                            iconsize={"md"}
                            iconcolor="black" btntext="generate"/>


                        <AudioPlayer src={audioSrc}
                                     disabled={audioDisabled}
                                     onPlayPause={handlePlayPause} />                                
                    </div>
 
                    <div className="min-h-[500px] w-full p-3 items-center justify-center border">
                        <textarea ref={textareaRef}
                                  className="textarea w-full bg-black min-h-[400px] text-white text-lg" 
                                  placeholder="default"
                                  defaultValue={textoPrueba}>
           
                        </textarea>
                    </div>

                </div>

            </div>

        </div>
    );

}//end function