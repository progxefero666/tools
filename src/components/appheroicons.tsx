
import { JSX } from 'react';
import { DeviceUtil } from '@/common/util/devicehelper';



import {
    ChevronDoubleLeftIcon, ChevronLeftIcon, VideoCameraIcon,
    PlayIcon, PauseIcon, ChevronRightIcon, StopIcon,
    ArchiveBoxXMarkIcon, ArrowsPointingOutIcon,SpeakerWaveIcon,
    ChevronDownIcon, PhotoIcon, PlusIcon, MinusIcon,PlusCircleIcon,ServerIcon,ArrowUturnLeftIcon,
    ChevronUpIcon, CheckIcon, XMarkIcon, TrashIcon,
    ArrowPathIcon, PencilSquareIcon, EyeIcon, EyeSlashIcon,PencilIcon ,
    Bars3Icon, MagnifyingGlassIcon, XCircleIcon,
    ExclamationTriangleIcon, InformationCircleIcon,Cog8ToothIcon ,
    UserIcon, Cog6ToothIcon, GlobeAltIcon,Bars3BottomLeftIcon,Bars3BottomRightIcon ,PaintBrushIcon  }
from '@heroicons/react/16/solid';


export const RenderIcon = (name: string, iconclass: string): JSX.Element => {

    let iconProps = { className: iconclass };

    switch (name) {
        case "ArrowUturnLeftIcon": return <ArrowUturnLeftIcon {...iconProps} />;
        case "ServerIcon": return <ServerIcon {...iconProps} />;
        case "PlusCircleIcon": return <PlusCircleIcon {...iconProps} />;
        case "Cog8ToothIcon": return <Cog8ToothIcon {...iconProps} />;
        case "PencilIcon": return <PencilIcon {...iconProps} />;
        case "Bars3BottomLeftIcon": return <Bars3BottomLeftIcon {...iconProps} />;
        case "Bars3BottomRightIcon": return <Bars3BottomRightIcon {...iconProps} />;
        case "PaintBrushIcon": return <PaintBrushIcon {...iconProps} />;
        case "PlayIcon": return <PlayIcon {...iconProps} />;
        case "PauseIcon": return <PauseIcon {...iconProps} />;
        case "StopIcon": return <StopIcon {...iconProps} />;
        case "ChevronRightIcon": return <ChevronRightIcon {...iconProps} />;
        case "VideoCameraIcon": return <VideoCameraIcon {...iconProps} />;
        case "ChevronLeftIcon": return <ChevronLeftIcon {...iconProps} />;
        case "ChevronDoubleLeftIcon": return <ChevronDoubleLeftIcon {...iconProps} />;
        case "PhotoIcon": return <PhotoIcon {...iconProps} />;
        case "ArchiveBoxXMarkIcon": return <ArchiveBoxXMarkIcon {...iconProps} />;
        case "ArrowsPointingOutIcon": return <ArrowsPointingOutIcon {...iconProps} />;
        case "ChevronDownIcon": return <ChevronDownIcon {...iconProps} />;
        case "ChevronUpIcon": return <ChevronUpIcon {...iconProps} />;
        case "PhotoIcon": return <PhotoIcon {...iconProps} />;
        case "XMarkIcon": return <XMarkIcon {...iconProps} />;
        case "TrashIcon": return <TrashIcon {...iconProps} />;
        case "ArrowPathIcon": return <ArrowPathIcon {...iconProps} />;
        case "PlusIcon": return <PlusIcon {...iconProps} />;
        case "MinusIcon": return <MinusIcon {...iconProps} />;
        case "PencilSquareIcon": return <PencilSquareIcon {...iconProps} />;
        case "EyeIcon": return <EyeIcon {...iconProps} />;
        case "EyeSlashIcon": return <EyeSlashIcon {...iconProps} />;
        case "Bars3Icon": return <Bars3Icon {...iconProps} />;
        case "MagnifyingGlassIcon": return <MagnifyingGlassIcon {...iconProps} />;
        case "XCircleIcon": return <XCircleIcon {...iconProps} />;
        case "ExclamationTriangleIcon": return <ExclamationTriangleIcon {...iconProps} />;
        case "InformationCircleIcon": return <InformationCircleIcon {...iconProps} />;
        case "UserIcon": return <UserIcon {...iconProps} />;
        case "Cog6ToothIcon": return <Cog6ToothIcon {...iconProps} />;
        case "GlobeAltIcon": return <GlobeAltIcon {...iconProps} />;
        default: return <CheckIcon {...iconProps} />;
    }
};

/**
 * class AppIcons.getIconClass
 */
export class AppIcons {

    public static readonly DEF_ICON_SIZE: string = "h-10 w-10";
    public static readonly DEF_ICON_COLOR : string= "text-black";

    public static getIconSizeClass(): string {
        const deviceSize: number = DeviceUtil.detectWSize();
        let className: string = "h-10 w-10";
        return className;
    }

    public static getSizeClass(size:number): string {
        const value_w:string = "w-".concat(size.toString());
        const value_h:string = "h-".concat(size.toString());
        return value_w.concat(" ").concat(value_h);
    }

    public static getColorClassName(color: string): string {
        return "text-".concat(color);
    }

    public static getIconClass(iconSize:number,iconColor:string): string {        
        const colorClass: string = AppIcons.getColorClassName(iconColor);
        const sizeClass: string  = AppIcons.getSizeClass(iconSize);
        return colorClass.concat(" ").concat(sizeClass);
    }

} //end class


