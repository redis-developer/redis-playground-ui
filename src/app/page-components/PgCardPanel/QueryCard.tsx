import CardHeader from './CardHeader';
import './QueryCard.css';

interface QueryCardProps {
    queryId: string;
    query: string;
}

const labels = {
    infoIconContent: 'Try different queries to see how your data changes.',
    headerTitle: 'Query',
}

const QueryCard = ({ queryId, query }: QueryCardProps) => {
    return <div className="query-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />
        <div className="query-id">{queryId}</div>
        <div className="query">{query}</div>
    </div>
}

export default QueryCard;