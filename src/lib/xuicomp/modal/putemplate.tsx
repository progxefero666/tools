
import { CmOperation } from '@/lib/arquitect/app/appcommon';
import { CheckIcon,XMarkIcon} from '@heroicons/react/24/solid';



interface UiPopupTemplateProps {
  value: any;
  onClose: (accept: boolean) => void; 
  isOpen: boolean; 
}
export const UiPopupTemplate = ({ value, onClose, isOpen }: UiPopupTemplateProps) => {

  // return control
    const handleReturn = (confirmed: boolean) => {
      onClose(confirmed); 
  };

  return (
    <dialog open={isOpen} className="modal modal-middle">
        <div className="modal-box">
        
            {/* form inputs */}      


            {/* close commands */}
            <div className="modal-action flex justify-center mt-4">
              <form method="dialog">
                  <button className="btn btn-primary mr-2" onClick={() => handleReturn(true)} >
                      <CheckIcon className="h-6 w-6 mr-2" />
                      {CmOperation.OPID_CONFIRM}
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleReturn(false)} >
                      <XMarkIcon className="h-6 w-6 mr-2" />
                      {CmOperation.OPID_CANCEL}
                  </button>
              </form>
            </div>
            
        </div>
    </dialog>
  );
};