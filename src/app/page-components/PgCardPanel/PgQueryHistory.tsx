import { IQueryHistory } from '../../types';

import './PgQueryHistory.scss';

import React, { useEffect, useState } from 'react';
import { format, isToday, isYesterday, differenceInCalendarDays, parseISO } from 'date-fns';
import ModalPopup from '../../components/ModalPopup';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { BrowserCache } from '@/app/utils/browser-cache';
import { USER_ID_KEY } from '@/app/utils/browser-cache';
import { clearQueryHistory, getAllQueryHistory } from '@/app/utils/query-history';
import TooltipIcon from '@/app/components/TooltipIcon';


interface PgQueryHistoryProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IGroupQueryHistory {
    [key: string]: IQueryHistory[];
}

let modalWidthInPx = 650;
let modalHeightInPx = 350;
let itemPaddingInPx = 32;

const pageData = {
    noDataLbl: 'No query history found.',
    headerTitle: 'Query History',
}

const getGroupLabel = (dateStr?: string) => {
    let retStr = "";
    if (dateStr) {
        const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;

        if (isToday(date)) {
            retStr = 'Today';
        }
        else if (isYesterday(date)) {
            retStr = 'Yesterday';
        }
        else {
            const daysAgo = differenceInCalendarDays(new Date(), date);
            if (daysAgo < 7) {
                retStr = `${daysAgo} days ago`;
            }
            else {
                retStr = format(date, 'MMMM d, yyyy');
            }
        }
    }
    return retStr;
}

const groupByDate = (history: IQueryHistory[]): IGroupQueryHistory => {
    let groups: IGroupQueryHistory = {};
    groups = history.reduce<IGroupQueryHistory>((groups, item) => {
        const label = getGroupLabel(item.createdOn);

        if (!groups[label]) {
            groups[label] = [];
        }
        groups[label].push(item);
        return groups;
    }, {});
    return groups;
}


const PgQueryHistory = ({ isOpen, onClose }: PgQueryHistoryProps) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const [queryHistory, setQueryHistory] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchLatestQueryHistory();
        }
    }, [isOpen]);

    const fetchLatestQueryHistory = async () => {
        const result = await getAllQueryHistory();
        if (result.data) {
            setQueryHistory(result.data);
        }
        else {
            setQueryHistory([]);
        }
    };

    const handleHistoryItemClick = (item: IQueryHistory) => {

        if (item) {
            const inputUserId = BrowserCache.getItem(USER_ID_KEY);
            let queryStr = `?hId=${item.hId}`;
            if (inputUserId) {
                queryStr += `&userId=${inputUserId}`;
            }
            const loadUrl = `${window.location.origin}${basePath}${queryStr}`;
            window.location.href = loadUrl;
        }

        if (onClose) {
            onClose();
        }
    };

    const handleClearHistory = async () => {
        await clearQueryHistory();
        await fetchLatestQueryHistory();
    };

    const groupedHistory = groupByDate(queryHistory);

    return (
        <ModalPopup
            isOpen={isOpen}
            onClose={onClose}
            styles={{ width: modalWidthInPx + 'px', height: modalHeightInPx + 'px', closeIconWidth: 15, closeIconHeight: 15 }}
        >
            <div className="pg-query-history">
                <div className="history-header ">

                    <div className="history-header-title font-medium">{pageData.headerTitle}</div>

                    <TooltipIcon
                        imgSrc={basePath + "/icons/delete.svg"}
                        imgWidth="1.25rem"
                        imgHeight="1.25rem"
                        title="Clear History"
                        onClick={handleClearHistory}
                    />
                </div>
                {queryHistory.length > 0 &&
                    <div className="history-list-container">
                        {Object.entries(groupedHistory).map(([label, items]) => (
                            <div key={label} className="history-group">
                                <div className="group-label">{label}</div>
                                {items.map(item => (
                                    <div className="history-list-item" key={item.hId}
                                        style={{ width: (modalWidthInPx - itemPaddingInPx) + 'px' }}
                                        onClick={() => handleHistoryItemClick(item)}
                                    >
                                        <CodeMirrorEditor initialValue={item.customQuery || item.query} mode={CodeMirrorMode.redis} disabled={true} />

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                }
                {queryHistory.length === 0 &&
                    <div className="no-history-data">{pageData.noDataLbl}</div>
                }
            </div>
        </ModalPopup >
    );
};

export default PgQueryHistory; 