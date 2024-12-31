import './PgQueryCard.scss';

import { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardHeader from './PgCardHeader';
import { HeaderIcon } from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { usePlaygroundContext } from '../PlaygroundContext';


const pageData = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'QUERY',
}

const PgQueryCard = () => {
    const { setCustomQuery, queryViewData } = usePlaygroundContext();
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (editorRef?.current && queryViewData?.query) {
            updateCode(editorRef.current, queryViewData.query);
        }
    }, [queryViewData]);

    const handleQueryChange = (newQuery: string) => {

        if (!newQuery || newQuery.trim() === queryViewData?.query) {
            newQuery = "";
        }
        setCustomQuery(newQuery.trim());
    }

    const handleCopyClick = () => {
        try {
            if (editorRef.current) {
                const content = editorRef.current.state.doc.toString();
                navigator.clipboard.writeText(content);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleIconClick = (icon: HeaderIcon) => {
        if (icon === HeaderIcon.copy) {
            handleCopyClick();
        }
    }

    const handleExecute = () => {
        const runBtn = document.querySelector('.header-run-btn');
        if (runBtn) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            runBtn.dispatchEvent(clickEvent);
        }
    }

    return <div className="pg-query-card">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} handleIconClick={handleIconClick} />
        <CodeMirrorEditor initialValue={queryViewData?.query} mode={CodeMirrorMode.redis}
            ref={editorRef} onBlur={handleQueryChange} onExecute={handleExecute} />
    </div>
}

export default PgQueryCard;
