"use client";

import { useEffect, useState } from 'react';
import { Dimension } from "../common/model/base/dimension";
import { DeviceUtil } from '@/common/util/devicehelper';
import { ThemeColors } from './apptheme';
import { TechBase } from '@/common/tech/tech';


export function useClientReady() {
    const [clientReady, setClientReady] = useState(false);
    useEffect(() => {
      setClientReady(true);
    }, []); 
    return clientReady;
  }
  
/**
 * AppUI.getModalCompWidthClass
 */
export class AppUI {

  public static readonly audioInputFormats = ".wav,.mp3,.aac"
  public static readonly imageInputFormats: string = ".jpg,.png,.jpeg";
    public static readonly videoOutputformats: string[] = ["mp4", "avi", "mov"];
    public static readonly  videoInputformats = ".mp4,.avi";  

    
    static DEFAULT_IMGTHUMS_SIZE = [200,200];
    
    static getImgThumsSize = (): Dimension => {
        return new Dimension( 
          AppUI.DEFAULT_IMGTHUMS_SIZE[0],
          AppUI.DEFAULT_IMGTHUMS_SIZE[1]);
    };
    
    //const device = window.screen;
    public static getBrowserDimension(): Dimension {
      if(!window.innerWidth || !window.innerHeight){
        return new Dimension(0,0);
      }
      return new Dimension(window.innerWidth,window.innerHeight);
    }

    /* othe client code:
         //const device = AppStorageService.readUserDevice();
         //const device =DeviceUtil.getDevice(); */          
    public static getRootContainerWidthClass(deviceWidth: number): string {
      const widthreduced = Math.floor((deviceWidth /100) * 65) ;
      const closestWidth = Math.min(1536, Math.floor(widthreduced / 10) * 10);
      return `w${Math.max(640, closestWidth)}`;
    }

    public static getRootClassName = () => {
      const device = AppUI.getBrowserDimension();
      return AppUI.getRootContainerWidthClass(device.width);
    }   

    public static getModalCompWidthClass(): string {
        const deviceSize: number = DeviceUtil.detectWSize()
        let modalSize: number  = 0;
        if(deviceSize <TechBase.SIZE_MD_WIDTH) {
          modalSize = TechBase.SIZE_MD_WIDTH
        }
        else{
          modalSize = deviceSize;
        }
        let className = "modal "
            .concat(modalSize.toString())
            .concat(" ").concat(ThemeColors.PRIMARY_CONTENT);
        return className;
    }

} //end class

/*
    //let btnclass = "btn border-0 shadow-sm hover:shadow-md hover:shadow-gray-400";
*/
/**
 * class AppUIButtons.DEF_SIZE
 */
export class AppUIButtons {

  public static readonly DEF_SIZE:string = "md";

  public static getSizeClassName(size: string): string {
    return "btn-".concat(size);
}

  public static getButtonClass(color:string,size: string): string {

    let btnsize: string = AppUIButtons.DEF_SIZE;
    if (size) {btnsize = size;}
    
    let btnSizeClass: string = AppUIButtons.getSizeClassName(size);

    let btnclass = "btn ".concat(btnSizeClass);
    if (color) {
        btnclass += " ".concat(color);
    }
    btnclass += " gap-2";

    return btnclass;
}

} //end class