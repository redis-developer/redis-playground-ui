import './PgQueryCard.css';

import { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';

interface PgQueryCardProps {
    queryId?: string;
    query?: string;
}

const pageData = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'QUERY',
}

const PgQueryCard = ({ queryId, query }: PgQueryCardProps) => {
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (editorRef?.current && query) {
            updateCode(editorRef.current, query);
        }
    }, [query]);

    return <div className="pg-query-card">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />
        <CodeMirrorEditor initialValue={query} mode={CodeMirrorMode.redis} ref={editorRef} />
    </div>
}

export default PgQueryCard;
