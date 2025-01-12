import './PgQueryCard.scss';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { EditorView } from 'codemirror';

import PgCardHeader from './PgCardHeader';
import { HeaderIcon } from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { usePlaygroundContext } from '../PlaygroundContext';
import { TooltipIconType } from '@/app/components/TooltipIcon';


interface PgQueryCardRef {
    // Expose methods of this component
    updateEditorContent: (_code: string) => void;
}

const pageData = {
    infoIconDefaultContent: 'Try different queries to see how your data changes',
    headerTitle: 'QUERY',
}

const PgQueryCard = forwardRef<PgQueryCardRef, {}>((props, ref) => {
    const { setCustomQuery, queryViewData, queryTemplateData, selectedQuery, fnGetSelectedQueryTemplate } = usePlaygroundContext();
    const editorRef = useRef<EditorView | null>(null);
    const [infoIconContent, setInfoIconContent] = useState<string>(pageData.infoIconDefaultContent);

    const updateInfoIconContent = () => {
        setInfoIconContent(pageData.infoIconDefaultContent);
        const result = fnGetSelectedQueryTemplate();
        if (result?.query) {
            const infoIconContent = `
                    <div>
                        <div class="pg-info-content">Query: ${result.query.label}</div>
                        <div class="pg-info-content">Description: ${result.query.description}</div>
                        <div class="pg-info-content">(${pageData.infoIconDefaultContent})</div>
                    </div>
                    `;

            setInfoIconContent(infoIconContent);
        }
    }

    const updateEditorContent = (_code: string) => {
        if (editorRef?.current && _code) {
            updateCode(editorRef.current, _code);
            updateInfoIconContent();
        }
    }


    useImperativeHandle(ref, () => ({
        updateEditorContent
    }));


    useEffect(() => {
        const code = queryViewData?.query || "";
        updateEditorContent(code);
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
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true}
            infoIconContent={infoIconContent} infoIconContentType={TooltipIconType.html} handleIconClick={handleIconClick} />
        <CodeMirrorEditor initialValue={queryViewData?.query} mode={CodeMirrorMode.redis}
            ref={editorRef} onBlur={handleQueryChange} onExecute={handleExecute} />
    </div>

});

PgQueryCard.displayName = 'PgQueryCard';

export default PgQueryCard;

export type { PgQueryCardRef };

/*

const ParentComponent = () => {
    const queryCardRef = useRef<PgQueryCardRef>(null);
    
    const someFunction = () => {
        queryCardRef.current?.updateEditorContent("new code here");
    }

    return <PgQueryCard ref={queryCardRef} />;
}
*/