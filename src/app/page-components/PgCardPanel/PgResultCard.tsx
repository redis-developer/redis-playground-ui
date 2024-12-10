import './PgResultCard.css';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';

interface PgResultCardProps {
    data: any;
    error: any;
}

const labels = {
    infoIconContent: 'A result is a collection of data that we want to search.',
    headerTitle: 'RESULT',
    footerText: 'NO RESULTS FOUND',
}

const PgResultCard = ({ data, error }: PgResultCardProps) => {
    return <div className="pg-result-card">
        <PgCardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />

        <CodeMirrorEditor initialValue={data} mode="javascript" />
        <PgCardFooter footerText={labels.footerText} />
    </div>
}

export default PgResultCard;
