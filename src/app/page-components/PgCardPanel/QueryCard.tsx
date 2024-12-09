import './QueryCard.css';

import CardHeader from './CardHeader';

import CodeMirrorEditor from '../../components/CodeMirrorEditor';

interface QueryCardProps {
    queryId: string;
    query: string;
}

const labels = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'QUERY',
}

const QueryCard = ({ queryId, query }: QueryCardProps) => {
    return <div className="query-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />
        <CodeMirrorEditor initialValue={query} mode="redis" />
    </div>
}

export default QueryCard;