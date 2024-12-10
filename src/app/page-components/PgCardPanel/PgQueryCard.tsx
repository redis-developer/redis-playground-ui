import './PgQueryCard.css';

import PgCardHeader from './PgCardHeader';

import CodeMirrorEditor from '../../components/CodeMirrorEditor';

interface PgQueryCardProps {
    queryId: string;
    query: string;
}

const labels = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'QUERY',
}

const PgQueryCard = ({ queryId, query }: PgQueryCardProps) => {
    return <div className="pg-query-card">
        <PgCardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />
        <CodeMirrorEditor initialValue={query} mode="redis" />
    </div>
}

export default PgQueryCard;
