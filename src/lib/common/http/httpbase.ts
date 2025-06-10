

/**
 * class HttpBase.
 */
export class HttpBase {

    public static readonly MODE_READ:string= "r";

    public static readonly RESPCODE_SERVEROK:number = 200;
    public static readonly RESPCODE_BADREQUEST:number = 400;
    public static readonly RESPCODE_NOTFOUND:number = 404;
    public static readonly RESPCODE_SERVERERROR:number = 500;

    public static readonly RESPMSG_SERVERERROR:string = "Server process failed";
    public static readonly RESPMSG_BADPARAMETERS:string = "Bad request parameters.";
    public static readonly RESPMSG_NOTFOUND:string = "Video file not found.";
    
    public static readonly MSG_SERVERCONN_LOST:string = "Connection lost with the server.";
    public static readonly MSG_SERVERRESPONSE_INVALID:string = "Invalid server response.";
  

}//end class