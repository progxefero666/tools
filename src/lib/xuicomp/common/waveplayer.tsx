"use client";

import { useState, useEffect, useRef } from 'react';
import WaveSurfer from "wavesurfer.js";
import { AudioPlayerProps } from '../basecomp';
import { TimeUtil } from '@/lib/common/util/timeutil';
import { PauseIcon, PlayIcon, SpeakerWaveIcon } from '@heroicons/react/16/solid';


/*
<WavePlayer src="/audio/sample.mp3" />
export interface AudioPlayerProps {
    src: string;
    disabled?:boolean;
    onPlayPause?: () => void; 
}
*/

// Componente principal
export const WavePlayer = ({ src,disabled, onPlayPause }: AudioPlayerProps) => {

    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);


    useEffect(() => {

        if (!containerRef.current) return;
        // Inicializa WaveSurfer
        waveSurferRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: "#ccc",
            progressColor: "#4caf50",
            barWidth: 2,
            normalize: true,
            height: 30
        });
        waveSurferRef.current.load(src);        
        return () => {
            // unmount and clear
            if (waveSurferRef.current) {
                waveSurferRef.current.unAll();
                waveSurferRef.current.destroy();
            }
        };

    }, []);

    const togglePlayPause = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.playPause();
            setIsPlaying((prev) => !prev);
        }
    };

    // Escucha el evento "audioprocess"
    const handleAudioProcess = (currentTime: number) => {
        setCurrentTime(currentTime);
    };

    if (waveSurferRef.current) {
        waveSurferRef.current.on("audioprocess", handleAudioProcess);
    }

    const handleVolumeChange = (e: Event) => {
    }

    return (
        <div className="h-11 flex items-center border py-2 px-1 w-full">

            <button disabled={disabled}
                className={`btn btn-sm ${isPlaying ? "btn-primary" : "btn-secondary"}`}
                onClick={togglePlayPause} >
                {isPlaying ? (<PauseIcon className="h-6 w-6" />) 
                           : (<PlayIcon className="h-6 w-6" />)}
            </button>

            <div className="flex-grow relative h-full mx-2">
                <div ref={containerRef} className="w-full" />
            </div>


            <div className="relative">

                {/* Botón de volumen */}
                <button disabled={disabled}
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                    <SpeakerWaveIcon className="h-6 w-6" />
                </button>

                {/* Slider de volumen */}
                {showVolumeSlider && (
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg">
                    <input disabled={disabled}
                        type="range"
                        className="w-24"
                        value={volume} min={0} max={1} step={0.01}
                        onChange={(e) => handleVolumeChange(e as unknown as Event)} />
                </div> )}

            </div>            

        </div>

    );

}//end comp

/**
 * 
            <button onClick={togglePlayPause}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {isPlaying ? "Pausar" : "Reproducir"}
            </button>

             <div>
                Time: {TimeUtil.formatTime(currentTime)}
            </div>

 */