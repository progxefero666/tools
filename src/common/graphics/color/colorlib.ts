import { XColor } from "./xcolor";

//"rgb(0 0 0 / 1.0)",
export enum GColors { 
    BLACK = "rgb(0 0 0)",
    WHITE = "rgb(255 255 255)",
    RED = "rgb(255 0 0)",
    BLUE = "rgb(0 0 255)",
    GREEN = "rgb(0 255 0)",
    YELLOW = "rgb(255 255 0)",
    PINK = "rgb(255 0 255)",
    CYAN = "rgb(0 255 255)",
    GREY = "rgb(127 127 127)",
    GREY_DARK = "rgb(50 50 50)",
    TRANSP = "rgb(0 0 0 / 0.0)",
 }
 
 export const XColors = { 
    TRANSP: new XColor(0, 0, 0, 0),
    BLACK: new XColor(0, 0, 0, 1),
    WHITE: new XColor(255, 255, 255, 1),
    RED: new XColor(255, 0, 0, 1),
    BLUE: new XColor(0, 0, 255, 1),
    GREEN: new XColor(0, 255, 0, 1),
    YELLOW: new XColor(255, 255, 0, 1),
    PINK: new XColor(255, 0, 255, 1),
    CYAN: new XColor(0, 255, 255, 1),
    GREY: new XColor(127, 127, 127, 1),
    GREY_DARK: new XColor(50, 50, 50, 1),
    GREY_LIGHT: new XColor(200, 200, 200, 1),
    ORANGE: new XColor(255, 127, 0, 1),
    PURPLE: new XColor(128, 0, 128, 1),
    BROWN: new XColor(165, 42, 42, 1),
    BLUE_LIGHT: new XColor(173, 216, 230, 1),
    GREEN_LIGHT: new XColor(144, 238, 144, 1),
    RED_LIGHT: new XColor(255, 182, 193, 1),
    
 } as const;
 

 