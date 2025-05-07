
import { oh } from '@/common/util/alertutil';
import { PaginatorData } from '@/common/util/paginatordata';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


interface UiPaginatorProps {
    data: PaginatorData | null;
    onPagePrevious: () => void;
    onPageNext: () => void;
}

export const UiPaginator = ({ data, onPagePrevious, onPageNext }: UiPaginatorProps) => {
    if (!data) {return null; }
    //oh.f("data",data.pageIndex);
    //oh.f("data", String(data.uiflagPagePreEnabled));
    //oh.f("data", String(data.uiflagPageNextEnabled));
    const strPageIndex = (data.pageIndex + 1).toString();
    return (
        <div className="join">
            <button
                className="join-item btn"
                disabled={!data?.uiflagPagePreEnabled} 
                onClick={onPagePrevious} >
                <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button className="join-item btn">
                Page {strPageIndex}
            </button>
            <button
                className="join-item btn"
                disabled={!data?.uiflagPageNextEnabled} 
                onClick={onPageNext} >
                <ChevronRightIcon className="h-8 w-8" />
            </button>
        </div>
    );
};