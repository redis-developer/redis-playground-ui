import './PgResultCard.css';

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

interface PgResultCardProps {
    result: any;
    error: any;
}

const pageData = {
    infoIconContent: 'A result is a collection of data that we want to search.',
    headerTitle: 'RESULT',
}


const PgResultCard = ({ result, error }: PgResultCardProps) => {
    const { queryMatchLabel, queryResultFormatType } = usePlaygroundContext();
    const [showSwitchViewIcon, setShowSwitchViewIcon] = useState(false);
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (editorRef?.current) {
            let code = result || "";

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

        handleSwitchViewClick(true);
    }, [result]);

    useEffect(() => {
        setShowSwitchViewIcon(false);
        if (queryResultFormatType !== QueryResultFormat.string && queryResultFormatType !== QueryResultFormat.error) {
            setShowSwitchViewIcon(true);
        }
    }, [queryResultFormatType]);


    const handleSwitchViewClick = (isReset: boolean = false) => {
        //TODO: switch to react state style rather than DOM manipulation
        const views = document.getElementsByClassName('pg-result-card-content');
        if (views.length > 1) {
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
                nextViewIndex = 0;
            }
            views[nextViewIndex].classList.add('show-view');
        }
    }

    const handleIconClick = (icon: HeaderIcon) => {
        if (icon === HeaderIcon.switchView) {
            handleSwitchViewClick();
        }
    }

    return <div className="pg-result-card pg-child-editor-container">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent}
            showSwitchViewIcon={showSwitchViewIcon} handleIconClick={handleIconClick} />

        {queryResultFormatType !== QueryResultFormat.error &&
            <>
                {/* default view */}
                <div className={`pg-result-card-content show-view`}>
                    <CodeMirrorEditor initialValue=''
                        mode={CodeMirrorMode.javascript} disabled={true} ref={editorRef} />
                </div>


                {(queryResultFormatType === QueryResultFormat.json ||
                    queryResultFormatType === QueryResultFormat.hash) &&
                    <div className={`pg-result-card-content`}>
                        <PgResultTable result={result} formatType={queryResultFormatType} />
                    </div>
                }

                {/* more views */}

            </>
        }


        {queryResultFormatType === QueryResultFormat.error &&
            <div className="pg-result-error-container">
                <div className="pg-result-error-title font-semibold">Error</div>
                <div className="pg-result-error-content">{JSON.stringify(error, null, 4)}</div>
            </div>
        }

        <PgCardFooter footerText={queryMatchLabel} />

    </div>
}

export default PgResultCard;
