import { forwardRef, RefObject, useImperativeHandle } from "react";
import { HtmlCompTypes, HtmlFileProps, HtmlGenProp } from "@/lib/common/html/html";
import { Render_INPUT_TEXT, Render_INPUT_NUMBER, Render_INPUT_CHECK, 
         Render_SELECT, Render_INPUT_RANGE, Render_INPUT_COLOR, 
         Render_FILE} from "./htmlcomprender";


export type HtmlGenElement = HTMLInputElement | HTMLSelectElement | HTMLDivElement;

export const XHtmlComponent = forwardRef<HtmlGenElement, HtmlGenProp>( (props, ref) => {
    let { type, name, defaultvalue, classname, label, onchange, value } = props;
   
    /*
    const handleOnChange = (value: unknown) => {
      if (onchange) {
      }
    }
*/
    // render: esp component
    const renderComponent = () => {

      const commonProps = { name: name, ...("onchange" in props && { onchange: onchange }) };

      switch (type) {

        case HtmlCompTypes.INPUT_TEXT:
          const inputProps = {
            ...commonProps,
            defaultvalue: defaultvalue as string,
            ...("placeholder" in props && { placeholder: props.placeholder }),
            ...("maxlen" in props && { maxlen: props.maxlen })
          };
          return Render_INPUT_TEXT(ref as RefObject<HTMLInputElement>, inputProps);

        case HtmlCompTypes.INPUT_CHECK:
          const checkProps = {
            ...commonProps,
            defaultvalue: defaultvalue as boolean,
          };
          return Render_INPUT_CHECK(ref as RefObject<HTMLInputElement>, checkProps);

        case HtmlCompTypes.INPUT_NUMBER:
          const numberProps = {
            ...commonProps,
            defaultvalue: defaultvalue as number,
            step: "step" in props ? props.step : undefined
          };
          return Render_INPUT_NUMBER(ref as RefObject<HTMLInputElement>, numberProps);

        case HtmlCompTypes.SELECT:
          const selectProps = {
            ...commonProps,
            defaultvalue: defaultvalue as string,
            collection: "collection" in props ? props.collection : [],
          };
          return Render_SELECT(ref as RefObject<HTMLSelectElement>, selectProps);

        case HtmlCompTypes.INPUT_RANGE:
          const rangeProps = {
            ...commonProps,
            defaultvalue: defaultvalue as number,
            onchange: onchange,
            ...("min" in props && { min: props.min }),
            ...("max" in props && { max: props.max }),
          };
          return Render_INPUT_RANGE(ref as RefObject<HTMLInputElement>, rangeProps);

        //XHtml.HTML_INPUT_COLOR
        case HtmlCompTypes.INPUT_COLOR:
          const colorProps = {
            ...commonProps,
            defaultvalue: defaultvalue as string,
          };
          return Render_INPUT_COLOR(ref as RefObject<HTMLInputElement>, colorProps);

        //XHtml.HTML_FILE
        case HtmlCompTypes.FILE:
            const fileProps = {
              ...commonProps,
              onchange: onchange,
              defaultvalue: defaultvalue as string,   
              ...("multiple" in props && { multiple: props.multiple as boolean }),
            };          
            return Render_FILE(ref as RefObject<HTMLInputElement>, fileProps );

        case HtmlCompTypes.INPUT_DATE:
          return;

        //XHtml.INPUT_DATE
        //XHtml.INPUT_PASSWORD
        //XHtml.INPUT_SEARCH
        //XHtml.INPUT_TEXTAREA  
        //XHtml.RADIO
        //XHtml.INPUT_PHONE        
        //XHtml.INPUT_EMAIL
        //XHtml.INPUT_URL
        //XHtml.INPUT_TIME

      }

    };

    // render: common
    const renderContent = () => (
      <>
        {label && <label className="w-full">{label}</label>}
        {renderComponent()}
      </>
    );

    // render: main
    return classname ? (
      <div className={classname}>{
        renderContent()}
      </div>
    ) : (
      renderContent()
    );
  }
);

