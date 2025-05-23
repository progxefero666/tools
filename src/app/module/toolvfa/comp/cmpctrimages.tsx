
import { AppUI, useClientReady } from "@/style/appui";
import { FrontProcess } from "@/application/toolvfa/vfactrbase";
import { ViControlGrImages } from "@/application/toolvfa/vfactrimages";

import { RectColor } from "@/common/graphics/model/rectcolor";
import { PaginatorData } from "@/common/util/paginatordata";
import { showUiPuAddImagesBase } from "@/components/modal/puaddimages";
import { showUiPopupConfirm } from "@/components/modal/puconfirm";
import { XImage } from "@/multimedia/model/ximage";
import { useEffect, useRef, useState } from "react";
import { renderCollection } from "../views/helperstep2";
import { UiPaginator } from "@/components/common/paginator";
import { BarCommandButtons } from "@/components/xbuttons/xbarbuttons";
import { InputMMFile } from "@/components/form/inputmmfile";
import { ThemeColors } from "@/style/apptheme";
import { XButtonIcon } from "@/components/buttons/iconbutton";
import { cu } from "@/common/util/consolehelper";
import { showUiPopupViewJson } from "@/components/modal/puviewjson";
import { CollCommandsIds, UiBarCrudCommands } from "@/application/collection/appcollection";
import { CmOperation } from "@/application/appcommon";


let ctrlColl: ViControlGrImages;

export interface CmpIfControlImages {
    virectcolor: RectColor;
    cntimages: number[]; //range mix - max
    selectImage: (rowIndex: number) => void;
    updateImages: (elements: XImage[], rowindex: number) => void;
    processImages: (elements: XImage[]) => void;
}
export default function CmpControlImages({ virectcolor, cntimages, updateImages, selectImage, processImages }: CmpIfControlImages) {

    const imagesInputRef = useRef<HTMLInputElement>(null);

    const [collectionEmpty, setCollectionEmpty] = useState<boolean>(true);
    const [pageElements, setPageElements] = useState<Array<XImage>>([]);
    const [paginatorData, setPaginatorData] = useState<PaginatorData | null>(null);
    const [rowIndex, setRowIndex] = useState<number>(-1);

    useEffect(() => {
        if (!ctrlColl) { ctrlColl = new ViControlGrImages(); }
    }, []);

    const onImagesSelected = async (name: string, result: unknown) => {
        const files: FileList = result as FileList;
        if (files.length > 0) {

            const newElements = await FrontProcess.getListFileImages(virectcolor, files, ctrlColl.futureNewExpanded);
            if (ctrlColl.opCollectionId == CollCommandsIds.OPID_ADD) {
                ctrlColl.execOperation(CollCommandsIds.OPID_ADD, newElements!);
            }
            if (ctrlColl.opCollectionId == CollCommandsIds.OPID_INSERT) {
                ctrlColl.execOperation(CollCommandsIds.OPID_INSERT, newElements!, ctrlColl.futureInsertIndex);
            }
            ctrlColl.clearOperations();
            updateStateUiCollection();
        }
    }

    const executeOpCollection = (pr_operationId: string, id?: number) => {
        ctrlColl.opCollectionId = pr_operationId;

        if (ctrlColl.opCollectionId == CollCommandsIds.OPID_DELETEALL) {
            showUiPopupConfirm("¿confirm opereration?").then(({ confirmed }) => {
                if (confirmed) {
                    ctrlColl.execOperation(CollCommandsIds.OPID_DELETEALL);
                    ctrlColl.clearOperations();
                    updateStateUiCollection();
                }
            });
        }
        else if (ctrlColl.opCollectionId == CollCommandsIds.OPID_DELETE) {
            showUiPopupConfirm("¿confirm opereration?").then(({ confirmed }) => {
                if (confirmed) {
                    const elemIndex = ctrlColl.getIndexById(id!);
                    ctrlColl.execOperation(CollCommandsIds.OPID_DELETE, null, elemIndex);
                }
            });
        }
        else if (ctrlColl.opCollectionId == CollCommandsIds.OPID_ADD) {

            /*
            showUiPuAddImagesBase(CollCommandsIds.OPID_ADD, 0).then(({ confirmed, applyExpanded, index }) => {
                if (confirmed) {
                    ctrlColl.futureNewExpanded = applyExpanded;
                    imagesInputRef.current?.click();
                }
                else { ctrlColl.clearOperations(); }
            });
            */
            ctrlColl.futureNewExpanded = false;
            imagesInputRef.current?.click();
        }
        else if (ctrlColl.opCollectionId == CollCommandsIds.OPID_INSERT) {
            const maxIndex = ctrlColl.ctrlPaginator.countRows - 1;
            showUiPuAddImagesBase(CollCommandsIds.OPID_INSERT, maxIndex).then(({ confirmed, applyExpanded, index }) => {
                if (confirmed) {
                    ctrlColl.futureNewExpanded = applyExpanded;
                    ctrlColl.futureInsertIndex = index;
                    imagesInputRef.current?.click();
                }
                else { ctrlColl.clearOperations(); }
            });
        }

    }

    const executeOpElement = (id: string, operation: string): void => {
        let result = ctrlColl.executeOpElement(id, operation);
        if (result) { updateStateUiCollection(); }
    }

    const executeFilterUICollection = (opQueryId: string) => {
        ctrlColl.execCommonFilterUICollection(opQueryId);
        updateStateUiCollection();
    }

    const selectElement = (id: number): void => {
        //const pageRowIndex = ctrlColl.getCollectionRowIndex(pageElements, id);
        ctrlColl.setRowIndex(id);
        setRowIndex(ctrlColl.rowIndex);
        selectImage(ctrlColl.rowIndex);
    }

    const updateStateUiCollection = () => {
        const coll: XImage[] = ctrlColl.getCollection();
        setCollectionEmpty(ctrlColl.isEmpty());
        setPageElements(coll);
        setPaginatorData(ctrlColl.getPaginatorData());
        updateImages(ctrlColl.elements, ctrlColl.rowIndex);
    }

    const showVideoJsonMtdata = () => {
        /*
        cu.cs("showVideoJsonMtdata");
        showUiPopupViewJson(tvideo.getJsonString()).then(() => {
            cu.cs("showVideoJsonMtdata close");
        });
          */
    }
    const next = () => {
        processImages(ctrlColl.elements);
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <div className="w-full h-auto flex flex-col">

            <div className="w-full h-auto border min-h-[300px]">
                {pageElements.length > 0 &&
                    renderCollection({ pageElements, rowIndex, selectElement, executeOpElement })}

                {pageElements.length === 0 && (
                    <div className="w-full mt-2">
                        <p className="text-center text-gray-500">No hay elementos en esta página.</p>
                    </div>
                )}
            </div>

            <div className="w-full h-auto mt-2 pb-2 border">
                {pageElements.length > 0 && (
                    <div className="w-full flex   justify-center mt-3">
                        <hr className="mt-4" />
                        <UiPaginator
                            data={paginatorData}
                            onPagePrevious={() => executeFilterUICollection(CollCommandsIds.OPID_LOADPREVPAGE)}
                            onPageNext={() => executeFilterUICollection(CollCommandsIds.OPID_LOADNEXTPAGE)} />
                    </div>
                )}
                <BarCommandButtons
                    commands={UiBarCrudCommands}
                    onclick={executeOpCollection}
                    barclassname="w-full mt-2 flex justify-center space-x-2"
                    iconclass="h-8 w-8"
                    disabled={[collectionEmpty, false, collectionEmpty]} />
            </div>

            <InputMMFile name="imagesfile"
                ref={imagesInputRef}
                classname="hidden"
                formats={AppUI.imageInputFormats}
                multiple={true}
                onchange={onImagesSelected} />

            <div className="w-full flex justify-center mt-3">
                <button
                    className="btn btn-accent"
                    onClick={next} >
                    {CmOperation.OPID_NEXT}
                </button>
            </div>
        </div>
    )

}//end comp