
/**
 * class AppButtons
 */
export class AppButtons {

    public static getButtonClass(color:string):string {
      let btnclass = "btn border-0 shadow-sm hover:shadow-md hover:shadow-gray-400";
      if (color) {
          btnclass += " ".concat(color);
      }
      return btnclass;
    }
  
  } //end class
  