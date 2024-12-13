import './PgQueryCard.css';

import { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { usePlaygroundContext } from '../PlaygroundContext';

interface PgQueryCardProps {
    queryId?: string;
    query?: string;
}

const pageData = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'QUERY',
}

const PgQueryCard = ({ queryId, query }: PgQueryCardProps) => {
    const { setCustomQuery, queryViewData } = usePlaygroundContext();
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (editorRef?.current && query) {
            updateCode(editorRef.current, query);
        }
    }, [query]);

    const handleQueryChange = (newQuery: string) => {

        if (!newQuery || newQuery.trim() === queryViewData?.query) {
            newQuery = "";
        }
        setCustomQuery(newQuery);
    }

    return <div className="pg-query-card pg-child-editor-container">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />
        <CodeMirrorEditor initialValue={query} mode={CodeMirrorMode.redis}
            ref={editorRef} onBlur={handleQueryChange} />
    </div>
}

export default PgQueryCard;
