import './PgResultCard.css';

import { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';

interface PgResultCardProps {
    result: any;
    error: any;
}

const pageData = {
    infoIconContent: 'A result is a collection of data that we want to search.',
    headerTitle: 'RESULT',
    footerText: 'NO RESULTS FOUND',
}

const PgResultCard = ({ result, error }: PgResultCardProps) => {

    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (editorRef?.current) {// && result 
            const code = result || error;
            updateCode(editorRef.current, code);
        }
    }, [result, error]);

    return <div className="pg-result-card pg-child-editor-container">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />

        <CodeMirrorEditor initialValue={result} mode={CodeMirrorMode.javascript} disabled={true} ref={editorRef} />
        <PgCardFooter footerText={pageData.footerText} />
        {/* show error too */}
    </div>
}

export default PgResultCard;
