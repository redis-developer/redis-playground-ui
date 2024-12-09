import './ResultCard.css';

import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';

interface ResultCardProps {
    data: any;
    error: any;
}

const labels = {
    infoIconContent: 'A result is a collection of data that we want to search.',
    headerTitle: 'RESULT',
    footerText: 'NO RESULTS FOUND',
}

const ResultCard = ({ data, error }: ResultCardProps) => {
    return <div className="result-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />

        <CodeMirrorEditor initialValue={data} mode="javascript" />
        <CardFooter footerText={labels.footerText} />
    </div>
}

export default ResultCard;