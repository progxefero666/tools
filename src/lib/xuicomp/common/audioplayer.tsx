import React, { useState, useRef } from "react";
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { AudioPlayerProps } from "../basecomp";



// Componente principal
export const AudioPlayer = ({ src, disabled, onPlayPause }: AudioPlayerProps) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressBarContainerRef = useRef<HTMLDivElement | null>(null);

    // Manejar la reproducción
    const togglePlayPause = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
            onPlayPause?.();
        }
    };

    // Actualizar el tiempo actual del audio
    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    // Cambiar el volumen
    const handleVolumeChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newValue = parseFloat(target.value);
        if (audioRef.current) {
            audioRef.current.volume = newValue;
            setVolume(newValue);
        }
    };

    // Manejar clics en el contenedor de la progress bar
    const handleProgressBarClick = (e: MouseEvent) => {
        if (!audioRef.current || !progressBarContainerRef.current) return;
        if (disabled) {
            return;
        }
        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = percentage * (audioRef.current.duration || 0);
        setCurrentTime(audioRef.current.currentTime);
    };

    return (

        <div className="h-11 flex items-center border py-2 px-1 w-full">
        
            <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />

            <button disabled={disabled}
                className={`btn btn-sm ${isPlaying ? "btn-accent" : "btn-accent"}`}
                onClick={togglePlayPause} >
                {isPlaying ? (<PauseIcon className="h-6 w-6" />) : (<PlayIcon className="h-6 w-6" />)}
            </button>

            {/* progress bar */}
            <div
                ref={progressBarContainerRef}
                className="flex-grow relative h-full mx-2"
                onClick={(e) => handleProgressBarClick(e as unknown as MouseEvent)}>
                <div className="w-full h-full bg-red-500 rounded relative overflow-hidden">

                    <div className="absolute top-0 left-0 h-full bg-blue-500"
                        style={{width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%`}} />
                </div>
            </div>
            
            <div className="relative">

                {/* Botón de volumen */}
                <button disabled={disabled}
                    className="btn btn-sm"
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

};