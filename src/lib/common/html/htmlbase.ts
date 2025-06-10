

export interface HtmlElement {
    name: string; 
    code: string; 
}


export class HtmlBase {

       static readonly HTMLTEXTELEMS: HtmlElement[] = [
        { name: "<p>", code: "<p>Este es un párrafo de ejemplo.</p>" },
        { name: "<h1>", code: "<h1>Título principal</h1>" },
        { name: "<h2>", code: "<h2>Subtítulo</h2>" },
        { name: "<h3>", code: "<h3>Título secundario</h3>" },
        { name: "<h4>", code: "<h4>Título menor</h4>" },
        { name: "<h5>", code: "<h5>Título muy pequeño</h5>" },
        { name: "<h6>", code: "<h6>Título más pequeño</h6>" },
        { name: "<strong>", code: "<strong>Esto es importante</strong>" },
        { name: "<em>", code: "<em>Esto tiene énfasis</em>" },
        { name: "<mark>", code: "<mark>Texto resaltado</mark>" },
        { name: "<small>", code: "<small>Texto pequeño</small>" },
        { name: "<del>", code: "<del>Texto eliminado</del>" },
        { name: "<ins>", code: "<ins>Texto insertado</ins>" },
        { name: "<sub>", code: "<sub>Texto en subíndice</sub>" },
        { name: "<sup>", code: "<sup>Texto en superíndice</sup>" },
        { name: "<blockquote>", code: "<blockquote>Esta es una cita famosa.</blockquote>" },
        { name: "<q>", code: "<q>Esta es una cita corta.</q>" },
        { name: "<cite>", code: "<cite>Título de la obra</cite>" },
        { name: "<code>", code: '<code>console.log("Hola mundo");</code>' },
        { name: "<pre>", code: '<pre>\nfunction saludar() {\n    console.log("Hola");\n}\n</pre>' },
        { name: "<address>", code: "<address>Correo: ejemplo@dominio.com</address>" },
        { name: "<time>", code: '<time datetime="2023-10-20">20 de octubre de 2023</time>' },
        { name: "<dfn>", code: "<dfn>Término</dfn>: Explicación del término." },
        { name: "<b>", code: "<b>Texto en negrita</b>" },
        { name: "<i>", code: "<i>Texto en cursiva</i>" },
        { name: "<u>", code: "<u>Texto subrayado</u>" },
        { name: "<abbr>", code: '<abbr title="Organización de las Naciones Unidas">ONU</abbr>' },
        { name: "<kbd>", code: "<kbd>Ctrl + S</kbd>" },
        { name: "<samp>", code: "<samp>Error: archivo no encontrado</samp>" },
        { name: "<var>", code: "<var>x</var> = 10;" }        
       ];

}//end class
