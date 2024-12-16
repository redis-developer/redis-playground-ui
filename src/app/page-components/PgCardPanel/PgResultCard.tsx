import './PgResultCard.css';

import { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import PgResultTable from '../PgResultFormatter/PgResultTable';
import { usePlaygroundContext } from '../PlaygroundContext';
import { QueryResultFormat } from '@/app/constants';

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
    }, [result]);

    return <div className="pg-result-card pg-child-editor-container">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />

        {queryResultFormatType === QueryResultFormat.string &&
            <CodeMirrorEditor initialValue=''
                mode={CodeMirrorMode.javascript} disabled={true} ref={editorRef} />
        }

        {(queryResultFormatType === QueryResultFormat.json ||
            queryResultFormatType === QueryResultFormat.hash) &&
            <PgResultTable result={result} formatType={queryResultFormatType} />
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
