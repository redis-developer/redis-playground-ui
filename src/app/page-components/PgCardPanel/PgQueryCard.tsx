import './PgQueryCard.css';

import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode } from '../../components/CodeMirrorEditor';

interface PgQueryCardProps {
    queryId: string;
    query: string;
}

const pageData = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'QUERY',
}

const PgQueryCard = ({ queryId, query }: PgQueryCardProps) => {
    return <div className="pg-query-card">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />
        <CodeMirrorEditor initialValue={query} mode={CodeMirrorMode.redis} />
    </div>
}

export default PgQueryCard;
