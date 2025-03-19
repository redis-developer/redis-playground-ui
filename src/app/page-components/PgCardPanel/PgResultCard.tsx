import './PgResultCard.scss';

import { useEffect, useRef, useState } from 'react';
import { EditorView } from 'codemirror';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import PgResultTable from '../PgResultFormatter/PgResultTable';
import { usePlaygroundContext } from '../PlaygroundContext';
import { QueryResultFormat } from '@/app/constants';
import { HeaderIcon } from './PgCardHeader';


const pageData = {
    infoIconContent: 'Search results for your query.',
    headerTitle: 'Result',
    defaultFooterText: "NO RESULTS FOUND"
}


const PgResultCard = () => {
    const { queryResponse } = usePlaygroundContext();
    const [showSwitchViewIcon, setShowSwitchViewIcon] = useState(false);
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        //handle result 
        if (editorRef?.current) {
            let code = queryResponse?.result || "";

            if (typeof code === 'string') {
                try {
                    //if JSON string, parse it
                    code = JSON.parse(code);
                } catch (e) {
                }

            }
            if (code) {
                //beautify json
                code = JSON.stringify(code, null, 4);
            }
            updateCode(editorRef.current, code);
        }

        //handle result format (switch view icon)
        setShowSwitchViewIcon(false);
        if (queryResponse?.resultFormatType &&
            queryResponse?.resultFormatType !== QueryResultFormat.string &&
            queryResponse?.resultFormatType !== QueryResultFormat.error) {
            setShowSwitchViewIcon(true);
        }
        setTimeout(() => {
            handleSwitchViewClick(true);
        }, 10);
    }, [queryResponse]);


    const handleCopyClick = () => {
        try {

            if (queryResponse?.resultFormatType === QueryResultFormat.error) {
                navigator.clipboard.writeText(JSON.stringify(queryResponse?.error, null, 4));
            }
            else if (editorRef.current) {
                const content = editorRef.current.state.doc.toString();
                navigator.clipboard.writeText(content);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleSwitchViewClick = (isReset: boolean = false) => {
        //TODO: switch to react state style rather than DOM manipulation
        const views = document.getElementsByClassName('pg-result-card-content');
        if (views.length > 0) {
            let lastViewIndex = 0;

            //remove show-view from all views
            for (let i = 0; i < views.length; i++) {
                if (views[i].classList.contains('show-view')) {
                    views[i].classList.remove('show-view');
                    lastViewIndex = i;
                }
            }
            let nextViewIndex = (lastViewIndex + 1) % views.length;

            if (isReset) {
                nextViewIndex = views.length - 1; //default view is last available view
            }
            views[nextViewIndex].classList.add('show-view');
        }
    }

    const handleIconClick = (icon: HeaderIcon) => {
        if (icon === HeaderIcon.switchView) {
            handleSwitchViewClick();
        }
        else if (icon === HeaderIcon.copy) {
            handleCopyClick();
        }
    }

    return <div className="pg-result-card">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent}
            showSwitchViewIcon={showSwitchViewIcon} handleIconClick={handleIconClick} />

        {queryResponse?.resultFormatType !== QueryResultFormat.error &&
            <>
                {/* default view */}
                <div className={`pg-result-card-content show-view`}>
                    <CodeMirrorEditor initialValue=''
                        mode={CodeMirrorMode.javascript} disabled={true} ref={editorRef} />
                </div>


                {(queryResponse?.resultFormatType === QueryResultFormat.json ||
                    queryResponse?.resultFormatType === QueryResultFormat.hash ||
                    queryResponse?.resultFormatType === QueryResultFormat.aggregate) &&
                    <div className={`pg-result-card-content`}>
                        <PgResultTable result={queryResponse?.result} formatType={queryResponse?.resultFormatType} />
                    </div>
                }

                {/* more views */}

            </>
        }


        {queryResponse?.resultFormatType === QueryResultFormat.error &&
            <div className="pg-result-error-container">
                <div className="pg-result-error-title font-semibold">Error</div>
                <div className="pg-result-error-content">{JSON.stringify(queryResponse?.error, null, 4)}</div>
            </div>
        }

        <PgCardFooter footerText={queryResponse?.matchLabel || pageData.defaultFooterText} />

    </div>
}

export default PgResultCard;
