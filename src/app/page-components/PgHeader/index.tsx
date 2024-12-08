import './index.css';

import IconButton from '@/app/components/IconButton';

const labels = {
    title: 'Redis Playground',
    btnRun: 'Run',
    btnReset: 'Reset',
    btnShare: 'Share',
}

const PgHeader = () => {
    return <div className="pg-header">

        <div className="pg-header-title">{labels.title}</div>
        <IconButton btnLabel={labels.btnRun} iconClass="fa fa-play" btnClass="pg-header-run-btn" />
        <IconButton btnLabel={labels.btnReset} iconClass="fa fa-refresh" />
        <IconButton btnLabel={labels.btnShare} iconClass="fa fa-share" />
    </div>
}

export default PgHeader;