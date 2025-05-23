import { useState } from "react";
import { AppUIButtons } from "@/style/appui";
import { ButtonsColors, ThemeColors } from "@/style/apptheme";
import { AppIcons } from "../appheroicons";
import { SpeakerWaveIcon, SpeakerXMarkIcon, WifiIcon } from "@heroicons/react/16/solid";


export interface ControlVolumenIf {
    defvalue: number;
    state: string;
    onchangevalue: (result: number) => void;
    //onchangestate: (active: boolean) => void;
}

const buttonsSize: string = "sm";
const buttonsColor: string = ButtonsColors.PRIMARY_CONTENT;
const iconsSize: number = 8;
const iconsColor: string = "black";

export default function ControlVolumen({ state, defvalue, onchangevalue }: ControlVolumenIf) {

    const [controlState, setControlState] = useState<string>(state);

    const [volume, setVolume] = useState<number>(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const [disabledVoMute,   setDisabledVoMute] = useState<boolean>(false);
    const [disabledVoUnmute, setDisabledVoUnmute] = useState<boolean>(false);
    const [disabledVoSlider, setDisabledVoSlider] = useState<boolean>(false);

    const [visibleVoUnmute, setvisibleVoUnmute] = useState<boolean>(false);
    const [visibleVoMute,   setVisibleVoMute] = useState<boolean>(true);

    const button_class: string = AppUIButtons.getButtonClass(buttonsColor, buttonsSize);
    const icon_class: string = AppIcons.getIconClass(iconsSize, iconsColor);


    const chargeState = () => {

        if(controlState=="disabled"){

        }        
        else if(controlState=="enabled"){

        }        
    }

    chargeState();

    const exeCommand = (operation: string) => {
        if (operation == "mute") {
            setVisibleVoMute(false);
            setvisibleVoUnmute(true);
        }
        else if (operation == "unmute") {
            setvisibleVoUnmute(false);
            setVisibleVoMute(true);            
        }
    }

    const onVolumeChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setVolume(parseFloat(target.value));
        onchangevalue(parseFloat(target.value));
        //audioRef.current.volume = parseFloat(target.value);
    };

    return (
        <div className="w-full flex">

            {visibleVoMute ? 
                <button disabled={disabledVoMute} className={button_class}>
                    <SpeakerWaveIcon className={icon_class}
                                 onClick={() => exeCommand("mute")} />                    
                </button>            
            :null}

            {visibleVoUnmute ? 
                <button disabled={disabledVoUnmute} className={button_class}>
                    <SpeakerXMarkIcon className={icon_class}
                                    onClick={() => exeCommand("unmute")} />
                </button>
            :null}

            <div className="relative">
                <button disabled={disabledVoSlider} className={button_class}>
                    <WifiIcon className={icon_class}
                              onClick={() => setShowVolumeSlider(!showVolumeSlider)} />
                </button>

                {showVolumeSlider && (
                    <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg">
                        <input 
                            type="range"
                            className="w-24"
                            value={volume} min={0} max={1} step={0.01}
                            onChange={(e) => onVolumeChange(e as unknown as Event)} />
                    </div>)}

            </div>
        </div>
    );

}//end comp