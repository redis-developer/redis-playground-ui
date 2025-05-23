import { IQueryHistoryItem } from '../../types';

import './PgQueryHistory.scss';

import React, { useEffect, useState } from 'react';
import ModalPopup from '../../components/ModalPopup';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { BrowserCache } from '@/app/utils/browser-cache';
import { USER_ID_KEY } from '@/app/utils/browser-cache';
import { getAllQueryHistory } from '@/app/utils/query-history';



interface PgQueryHistoryProps {
    isOpen: boolean;
    onClose: () => void;
}

let modalWidthInPx = 650;
let modalHeightInPx = 350;
let itemPaddingInPx = 32;

const pageData = {
    noDataLbl: 'No query history found.',
    headerTitle: 'Query History',
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
        setTimeout(async () => {
            const result = await getAllQueryHistory();
            if (result.data) {
                setQueryHistory(result.data);
            }
        }, 500);
    };

    const handleHistoryItemClick = (item: IQueryHistoryItem) => {

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

    return (
        <ModalPopup
            isOpen={isOpen}
            onClose={onClose}
            styles={{ width: modalWidthInPx + 'px', height: modalHeightInPx + 'px' }}
        >
            <div className="pg-query-history">
                <div className="history-header font-medium">{pageData.headerTitle}</div>
                {queryHistory.length > 0 &&
                    <div className="history-list-container">
                        {queryHistory.map((item) => (

                            <div className="history-list-item" key={item.hId}
                                style={{ width: (modalWidthInPx - itemPaddingInPx) + 'px' }}
                                onClick={() => handleHistoryItemClick(item)}
                            >
                                <CodeMirrorEditor initialValue={item.query} mode={CodeMirrorMode.redis} disabled={true} />

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