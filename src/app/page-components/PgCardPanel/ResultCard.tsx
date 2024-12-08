import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import './ResultCard.css';


interface ResultCardProps {
    data: any;
    error: any;
}

const labels = {
    infoIconContent: 'A result is a collection of data that we want to search.',
    headerTitle: 'Result',
    footerText: 'No results found.',
}

const ResultCard = ({ data, error }: ResultCardProps) => {
    return <div className="result-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />

        <div>{data}</div>
        <div>{error}</div>

        <CardFooter footerText={labels.footerText} />
    </div>
}

export default ResultCard;