import './PgDbIndexCard.css';

import { useState, useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { updateCode, CodeMirrorMode } from '../../components/CodeMirrorEditor';
import { pgGetDbIndexById } from '../../utils/services';

interface PgDbIndexCardProps {
    dbIndexId?: string;
}

const pageData = {
    infoIconContent: 'To search data in Redis, we must create an index.',
    headerTitle: 'DB INDEX',
    dbIndexName: "fashionSearchIndex",
}


const PgDbIndexCard = ({ dbIndexId }: PgDbIndexCardProps) => {
    const [dbIndexQuery, setDbIndexQuery] = useState("");
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
        const fetchDbIndexQuery = async () => {
            if (dbIndexId) {
                const result = await pgGetDbIndexById({ dbIndexIds: [dbIndexId] });
                if (result?.data?.length > 0) {
                    const resultQuery = result?.data[0].dbIndexQuery;
                    setDbIndexQuery(resultQuery);
                }
            }
        }
        fetchDbIndexQuery();
    }, [dbIndexId]);

    useEffect(() => {
        if (editorRef?.current && dbIndexQuery) {
            updateCode(editorRef.current, dbIndexQuery);
        }
    }, [dbIndexQuery]);

    return <div className="pg-db-index-card pg-child-editor-container">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />
        <CodeMirrorEditor initialValue={dbIndexQuery} mode={CodeMirrorMode.redis} ref={editorRef} />
    </div>
}

export default PgDbIndexCard;
