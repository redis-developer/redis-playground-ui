import './PgDbIndexCard.css';

import { useState, useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';

import PgCardHeader from './PgCardHeader';
import { HeaderIcon } from './PgCardHeader';
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

    return <div className="pg-db-index-card">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} handleIconClick={handleIconClick} />
        <CodeMirrorEditor initialValue={dbIndexQuery} mode={CodeMirrorMode.redis} ref={editorRef} disabled={true} />
    </div>
}

export default PgDbIndexCard;
