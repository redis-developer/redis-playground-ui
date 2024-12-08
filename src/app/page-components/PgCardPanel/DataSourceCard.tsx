import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import './DataSourceCard.css';

interface DataSourceCardProps {
    dataSourceId: string;
}

const labels = {
    infoIconContent: 'A data source is a collection of data that we want to search.',
    headerTitle: 'Data Source',
    footerText: 'Displaying 100 of 10000 records.',
}

const DataSourceCard = ({ dataSourceId }: DataSourceCardProps) => {
    return <div className="data-source-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />

        <div className="data-source-id">{dataSourceId}</div>

        <CardFooter footerText={labels.footerText} />
    </div>
}

export default DataSourceCard;