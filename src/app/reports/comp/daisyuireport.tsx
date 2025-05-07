import { DaisyUI } from "@/style/daisyui";
import { HtmlBase } from "@/common/html/htmlbase";



export function DaisyUiReportColors() {

    const colors = DaisyUI.getAllColors();

    return (
        <div className="grid grid-cols-2 gap-6">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="flex items-center border-2 px-2 py-2"
                    style={{ borderColor: `var(${color.cssclass})` }} >
                    <div className="flex-grow flex flex-col justify-center items-center text-center">
                        <h2 className="font-semibold mb-1">{color.name}</h2>
                        <p>{color.desc}</p>
                    </div>
                    <div
                        className="w-16 h-16 rounded-full shadow-inner flex-shrink-0"
                        style={{ backgroundColor: `var(${color.cssclass})` }}
                    ></div>
                </div>
            ))}
        </div>
    );
            
}

export function DaisyUiReportHtmltext() {

    const htmElems = HtmlBase.HTMLTEXTELEMS;

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Iteramos sobre cada elemento del array */}
            {htmElems.map((elem, index) => (
                <div key={index} className="grid grid-cols-[10%_auto] gap-4 p-4 border rounded-lg">
                    {/* Primera columna: name */}
                    <div className="font-mono text-sm">
                        {elem.name}
                    </div>
                    
                    {/* Segunda columna: code (resultado visual real) */}
                    <div className="flex items-center">
                        {/* Renderizamos el HTML real en lugar de mostrarlo como texto */}
                        <div dangerouslySetInnerHTML={{ __html: elem.code }} />
                    </div>
                </div>
            ))}
        </div>
    );
            
}

