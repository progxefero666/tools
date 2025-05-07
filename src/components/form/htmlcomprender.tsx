import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { showColorPickerModal } from "@/components/modal/puselectcolor";
import {
    HtmlFileProps, HtmlInputCheckProps, HtmlInputColorProps, HtmlInputNumberProps,
    HtmlInputPasswordProps, HtmlInputRangeProps, HtmlInputTextProps, HtmlSelectProps
} from "@/common/html/html";
import { ChangeEvent, useState } from "react";
import { MMObjectHelper } from "@/multimedia/helper/objecthelp";


//INPUT_TEXT = "input_text"
type RenderInputTextProps = Omit<HtmlInputTextProps, "type" | "ref">;
export const Render_INPUT_TEXT = (
    ref: React.RefObject<HTMLInputElement>, props: RenderInputTextProps) => {

    const { name, defaultvalue, label, onchange, placeholder, maxlen } = props;

    let hasPlaceHolder: boolean = false;
    if (placeholder) { hasPlaceHolder = true; }
    return (
        <>
            <input
                type="text"
                className="input w-full"
                name={name}
                ref={ref}
                placeholder={placeholder || undefined}
                defaultValue={placeholder ? undefined : defaultvalue}
                maxLength={maxlen}
                onChange={(e) => onchange?.(name, e.target.value)}
            />
        </>
    );
};

//INPUT_CHECK = "input_check"
type RenderInputCheckProps = Omit<HtmlInputCheckProps, "type" | "ref">;
export const Render_INPUT_CHECK = (
    ref: React.RefObject<HTMLInputElement>,
    props: RenderInputCheckProps
) => {
    const {
        name,
        defaultvalue,
        onchange,
        label
    } = props;

    const defaultValue = defaultvalue as boolean;
    return (
        <input
            type="checkbox"
            className="toggle ml-4"
            name={name}
            ref={ref}
            defaultChecked={defaultValue}
            onChange={(e) => onchange?.(name, e.target.checked)} // Usar `checked` en lugar de `value`
        />
    );
};

type RenderInputNumberProps = Omit<HtmlInputNumberProps, "type" | "ref">;

export const Render_INPUT_NUMBER = (
    ref: React.RefObject<HTMLInputElement>,
    props: RenderInputNumberProps
) => {
    const {
        name,
        defaultvalue,
        onchange,
        step = 1
    } = props;

    const defaultValue = defaultvalue as number;
    const handleStep = (direction: 'up' | 'down') => {
        if (ref.current) {
            direction === 'up' ? ref.current.stepUp() : ref.current.stepDown();
            // Dispara el onChange manualmente
            onchange?.(name, ref.current.valueAsNumber);
        }
    };
    return (

        <div className="flex items-center gap-1">
            <input
                name={name}
                ref={ref}
                type="number"
                step={step}
                defaultValue={defaultValue}
                onChange={(e) => onchange?.(name, e.target.valueAsNumber)}
                className="input w-full"/>

            {/*
            <div className="flex gap-1">
                <button
                    type="button"
                    onClick={() => handleStep('up')}
                    className="btn btn-sm h-10 w-10" >
                    <ChevronUpIcon className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => handleStep('down')}
                    className="btn btn-sm h-10 w-10" >
                    <ChevronDownIcon className="h-4 w-4" />
                </button>
            </div>             
             */}

        </div>

    );
};

//SELECT = "select"
type RenderSelectProps = Omit<HtmlSelectProps, "type" | "ref">;
export const Render_SELECT = (
    ref: React.RefObject<HTMLSelectElement>,
    props: RenderSelectProps
) => {
    const {
        name,
        defaultvalue,
        onchange,
        collection
    } = props;

    const defaultValue = defaultvalue as string;
    return (
        <select
            name={name}
            ref={ref}
            className="select w-full"
            defaultValue={defaultValue}
            onChange={(e) => onchange?.(name, e.target.value)}
        >
            {collection.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

//INPUT_RANGE = "input_range"
type RenderInputRangeProps = Omit<HtmlInputRangeProps, "type" | "ref">;

export const Render_INPUT_RANGE = (
    ref: React.RefObject<HTMLInputElement>,
    props: RenderInputRangeProps
) => {
    const {
        name,
        defaultvalue,
        onchange,
        label,
        min = 0,
        max = 100
    } = props;

    const defaultValue = defaultvalue as number;

    return (
        <input
            name={name}
            ref={ref}
            type="range"
            min={min}
            max={max}
            defaultValue={defaultValue}
            onChange={(e) => onchange?.(name, Number(e.target.value))}
            className="range w-full"
        />
    );
};

//INPUT_COLOR = "input_color"
type RenderInputColorProps = Omit<HtmlInputColorProps, "type" | "ref">;
export const Render_INPUT_COLOR = (
    ref: React.RefObject<HTMLInputElement>,
    props: RenderInputColorProps
) => {
    const {
        name,
        defaultvalue,
        onchange
    } = props;

    const [color, setColor] = useState<string>(defaultvalue as string);

    const handleColorChange = () => {
        showColorPickerModal(color).then(({ confirmed, color: newColor }) => {
            if (confirmed) {
                setColor(newColor);
                onchange?.(name, newColor);
            }
        });
    };

    return (
        <>
            <div className="inputcolor flex flex-row w-full"
                 style={{ backgroundColor: color }}
                 ref={ref}  >
                    <p>{color}</p>
                <button className="btnDiv ml-auto w-3/6"
                        onClick={handleColorChange}/>
            </div>
        </>
    );
};

//INPUT_PASSWORD = "input_password" HTMLInputElement
type RenderInputPasswordProps = Omit<HtmlInputPasswordProps, "type" | "ref">;
export const Render_INPUT_PASSWORD = (
    ref: React.RefObject<HTMLInputElement>, props: RenderInputTextProps) => {

    const { name, defaultvalue, label, onchange, placeholder, maxlen } = props;

    let hasPlaceHolder: boolean = false;
    if (placeholder) { hasPlaceHolder = true; }
    return (
        <>
            <input
                type="text"
                className="input w-full"
                name={name}
                ref={ref}
                placeholder={placeholder || undefined}
                defaultValue={placeholder ? undefined : defaultvalue}
                maxLength={maxlen}
                onChange={(e) => onchange?.(name, e.target.value)}
            />
        </>
    );
};

//FILE = "file" HTMLInputElement
type RenderFileProps = Omit<HtmlFileProps, "type" | "ref">;
export const Render_FILE = (ref: React.RefObject<HTMLInputElement>, props: RenderFileProps) => {

    const {name,defaultvalue,onchange,multiple} = props;

    const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            //const mmAudio = await MMObjectHelp.processAudio(1, file, 1);
            if(onchange){
                onchange!(name,file);
            }            
        }                    
    };

    return (
        <input
            name={name}
            ref={ref}
            type="file"
            className="file-input w-full"
            multiple={multiple}
            accept={defaultvalue}   
            onChange={handleOnChange} />
    );
};

//INPUT_SEARCH = "input_search"
//INPUT_TEXTAREA = "input_textarea"
//INPUT_DATE = "input_date"
//RADIO = "radio"
//INPUT_PHONE = "input_phone"
//INPUT_EMAIL = "input_email"
//INPUT_URL = "input_url"
//LIST = "list"
//INPUT_TIME = "input_time