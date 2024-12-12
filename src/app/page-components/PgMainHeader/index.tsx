import './index.css';

import Image from 'next/image';

import IconButton from '@/app/components/IconButton';
import PgQueryList from './PgQueryList';


const logoImgPath = '/logo-small.png';
const labels = {
    title: 'Redis Playground',
    buttonRun: 'Run',
    buttonReset: 'Reset',
    buttonShare: 'Share',
}

const PgMainHeader = () => {
    return <div className="pg-main-header">

        <div className="header-title font-bold">
            <Image src={logoImgPath} alt="logo" width={30} height={30} />

            {labels.title}
        </div>
        <div className="header-query-list">
            <PgQueryList />
        </div>
        <div className="header-buttons">
            <IconButton buttonLbl={labels.buttonRun} iconCls="fa fa-play" buttonCls="header-run-btn" />
            <IconButton buttonLbl={labels.buttonReset} iconCls="fa fa-refresh" />
            <IconButton buttonLbl={labels.buttonShare} iconCls="fa fa-share" />
        </div>
    </div>
}

export default PgMainHeader;