
import { AppSvgIcons } from "@/style/appsvgicons";


interface IconoSvgProps {
    iconName: string; 
    className?: string;
}
export const IconoSvg = ({ iconName, className }: IconoSvgProps) => {
    
    const svgContent: string = AppSvgIcons.getIconRaw(iconName);    
    const processedSvg = svgContent
        .replace(/<svg([^>]*)>/,'<svg$1 fill="currentColor">');

    return (
        <div className={`inline-block ${className}`}
            dangerouslySetInnerHTML={{ __html: processedSvg }} />
    );

};

