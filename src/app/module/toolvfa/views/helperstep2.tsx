
import React from 'react';

import { RowCommandButtons } from '@/components/xbuttons/xrowbuttons';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

import { UICommand } from '@/common/model/base/command';
import { XImage } from '@/multimedia/model/ximage';
import { ButtonsColors } from '@/style/apptheme';
import { CollCommands } from '@/application/collection/appcollection';

export const UiVfaElemsRowCrudCommands:UICommand[]= [
    new UICommand(CollCommands.UPDATE,ButtonsColors.PRIMARY,null,"ArrowsPointingOutIcon"),
    new UICommand(CollCommands.REPLACE,ButtonsColors.PRIMARY,null,"PhotoIcon"),
    new UICommand(CollCommands.DELETE,ButtonsColors.PRIMARY,null,"ChevArchiveBoxXMarkIconronUpIcon"),
 ];
 
// Props necesarias para renderElement
interface RenderElementProps {
    mmImage: XImage;
    className: string;
    rowIndex: number;
    selectElement: (index: number) => void;
    executeOpElement: (id: string, operation: string) => void;
}

// Función para renderizar un solo elemento <li>
export const renderElement = ({
    mmImage,
    className,
    rowIndex,
    selectElement,
    executeOpElement,
}: RenderElementProps) => {
    return (
        <li className={className} key={mmImage.id}>
            {/* Columna 1: Selector */}
            <div className="w-[10%] flex items-center justify-center p-2">
                <div
                    className="rowselector w-full py-1 px-2 text-xl cursor-pointer"
                    onClick={() => selectElement(mmImage.id)}
                >
                    {mmImage.orden + 1}
                </div>
            </div>

            {/* Columna 2: Imagen */}
            <div className="w-20 h-14 flex items-center justify-center pl-2 pt-2">
                <img
                    src={mmImage.urlobjmini}
                    alt="Thumbnail"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => selectElement(mmImage.id)}
                />
            </div>

            {/* Columna 3: Detalles */}
            <div className="grow flex flex-col justify-start p-2">
                <div className="w-full p_base flex justify-start pb-2">
                    <p>{mmImage.fname}</p>
                </div>
                <div className="w-full">
                    <RowCommandButtons
                        barclassname="flex space-x-1"
                        iconclass="h-6 w-6"
                        commands={UiVfaElemsRowCrudCommands}
                        rowid={mmImage.id.toString() ?? ""}
                        onclick={(id, operation) => executeOpElement(id, operation)}
                    />
                </div>
            </div>

            {/* Columna 4: Botones de movimiento */}
            <div className="flex flex-col w-auto pt-1">
                <button className="btn btn-xs bg-transparent hover:bg-transparent">
                    <ChevronUpIcon className="h-6 w-6 text-gray-800" />
                </button>
                <button className="btn btn-xs bg-transparent hover:bg-transparent">
                    <ChevronDownIcon className="h-6 w-6" />
                </button>
            </div>
        </li>
    );
};

// Props necesarias para renderCollection
interface RenderCollectionProps {
    pageElements: XImage[];
    rowIndex: number;
    selectElement: (index: number) => void;
    executeOpElement: (id: string, operation: string) => void;
}

// Función para renderizar toda la lista
export const renderCollection = ({
    pageElements,
    rowIndex,
    selectElement,
    executeOpElement,
}: RenderCollectionProps) => {
    return (
        <ul className="list w-full flex flex-col space-y-2">
            {pageElements.map((mmImage, index) => {
                if (rowIndex === index) {
                    return renderElement({
                        mmImage,
                        className: 'w-full h-15 pl-3 pr-1 flex bg-sky-400 border-y border-base-300',
                        rowIndex,
                        selectElement,
                        executeOpElement,
                    });
                }
                if (rowIndex !== index) {
                    return renderElement({
                        mmImage,
                        className: 'w-full h-15 pl-3 pr-1 flex bg-white border-y border-base-300',
                        rowIndex,
                        selectElement,
                        executeOpElement,
                    });
                }
            })}
        </ul>
    );
};


//const mockFileList = createMockFileList();
//const mockFileList:File[] = [];

export const createMockFileList = (): FileList => {
    const files: File[] = [];
    const basePath = "/imagen/"; // Ruta base dentro de la carpeta public
    const totalImages = 8; // Número de imágenes a simular

    for (let i = 0; i < totalImages; i++) {
        const fileName = `imagen${i}.jpg`;
        const file = new File([], fileName, { type: "image/jpeg" });
        files.push(file);
    }

    // Crear un objeto FileList simulado
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
};
