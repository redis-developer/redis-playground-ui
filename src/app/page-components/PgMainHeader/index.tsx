import './index.css';

import Image from 'next/image';

import IconButton from '@/app/components/IconButton';
import PgQueryList from './PgQueryList';
import { usePlaygroundContext } from '../PlaygroundContext';
import { pgRunQuery } from '@/app/utils/services';


const logoImgPath = '/logo-small.png';
const labels = {
    title: 'Redis Playground',
    buttonRun: 'Run',
    buttonReset: 'Reset',
    buttonShare: 'Share',
}

const PgMainHeader = () => {
    const { queryViewData, customQuery, setQueryResult, setQueryError } = usePlaygroundContext();


    const handleRunQuery = async () => {
        setQueryResult("");
        setQueryError("");
        const result = await pgRunQuery({
            queryId: queryViewData?.queryId,
            customQuery: customQuery,
        });

        if (result?.data) {
            setQueryResult(JSON.stringify(result?.data, null, 4));
        }
        else if (result?.error) {
            setQueryError(JSON.stringify(result?.error, null, 4));
        }

    }

    const handleResetQuery = () => {
        console.log('reset query');
    }

    const handleShareQuery = () => {
        alert('Not implemented');
    }

    return <div className="pg-main-header">

        <div className="header-title font-bold">
            <Image src={logoImgPath} alt="logo" width={30} height={30} />

            {labels.title}
        </div>
        <div className="header-query-list">
            <PgQueryList />
        </div>
        <div className="header-buttons">
            <IconButton buttonLbl={labels.buttonRun} iconCls="fa fa-play" buttonCls="header-run-btn" onClick={handleRunQuery} />
            <IconButton buttonLbl={labels.buttonReset} iconCls="fa fa-refresh" onClick={handleResetQuery} />
            <IconButton buttonLbl={labels.buttonShare} iconCls="fa fa-share" onClick={handleShareQuery} />
        </div>
    </div>
}

export default PgMainHeader;