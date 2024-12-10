import './PgResultCard.css';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode } from '../../components/CodeMirrorEditor';

interface PgResultCardProps {
    data: any;
    error: any;
}

const pageData = {
    infoIconContent: 'A result is a collection of data that we want to search.',
    headerTitle: 'RESULT',
    footerText: 'NO RESULTS FOUND',
}

const PgResultCard = ({ data, error }: PgResultCardProps) => {
    return <div className="pg-result-card">
        <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />

        <CodeMirrorEditor initialValue={data} mode={CodeMirrorMode.javascript} />
        <PgCardFooter footerText={pageData.footerText} />
        {/* show error too */}
    </div>
}

export default PgResultCard;
