

/*
<IconoSvg 
    iconName="icono-custom"  // Sin extensión .svg
    className="w-8 h-8 text-blue-500 hover:scale-110" />
 */
/**
 * public path: "/svgicons"
 */
export class AppSvgIcons {

    public static getIconRaw(iconName:string):string {
        const svgContent: string = require(`/svgicons/${iconName}.svg?raw`); 
        return svgContent;
    }

} //end class


/*
inherit
............................................
const processedSvg = svgContent.replace(
  /<svg([^>]*)>/,
  '<svg$1 fill="">'  // Usa inherit en lugar de currentColor
);
<div className="fill-blue-500"> 
    <IconoSvg className="bg-blue-500" />  
</div>
*/