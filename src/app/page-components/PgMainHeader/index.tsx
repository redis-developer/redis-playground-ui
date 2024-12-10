import './index.css';

import Image from 'next/image';

import IconButton from '@/app/components/IconButton';

const logoSmallImgPath = '/logo-small.png';

const labels = {
    title: 'Redis Playground',
    btnRun: 'Run',
    btnReset: 'Reset',
    btnShare: 'Share',
}

const PgMainHeader = () => {
    return <div className="pg-main-header">

        <div className="pg-main-header-title font-bold">
            <Image src={logoSmallImgPath} alt="logo" width={30} height={30} />

            {labels.title}
        </div>
        <div className="pg-main-header-buttons">
            <IconButton btnLabel={labels.btnRun} iconClass="fa fa-play" btnClass="pg-main-header-run-btn" />
            <IconButton btnLabel={labels.btnReset} iconClass="fa fa-refresh" />
            <IconButton btnLabel={labels.btnShare} iconClass="fa fa-share" />
        </div>
    </div>
}

export default PgMainHeader;