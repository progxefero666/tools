
import { GoogleVoiceInfo } from "../../gcvoices/model/gcvoiceinfo";
import AppAssets from "@/application/appassets";


/**
 * class TtsLocalDocs
 *  desc:read data from assets (public folder)
 */
export class TtsLocalDocs {

    public static readonly DOC_VOICES_ES: string = "gclistvoices_es.json";

    static async readListVoicesES(): Promise<GoogleVoiceInfo[]> {
        const jsonData: string = await AppAssets.readJsonDoc(TtsLocalDocs.DOC_VOICES_ES);
        const voices: GoogleVoiceInfo[] = JSON.parse(jsonData)
            .map((item: any) => new GoogleVoiceInfo(item.name, item.rate));
        return voices;
    }


}//end class