import CardHeader from './CardHeader';
import './DbIndexCard.css';

interface DbIndexCardProps {
    dbIndexId: string;
}

const labels = {
    infoIconContent: 'To search data in Redis, we must create an index.',
    headerTitle: 'DB Index',
}

const DbIndexCard = ({ dbIndexId }: DbIndexCardProps) => {
    return <div className="db-index-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />
        <div className="db-index-id">{dbIndexId}</div>
    </div>
}

export default DbIndexCard;