import './index.css';

import Image from 'next/image';

import IconButton from '@/app/components/IconButton';
import PgQueryList from './PgQueryList';
import { usePlaygroundContext } from '../PlaygroundContext';
import { pgRunQuery } from '@/app/utils/services';
import { QueryResultFormat } from '@/app/constants';


const logoImgPath = '/logo-small.png';
const labels = {
    title: 'Redis Playground',
    buttonRun: 'Run',
    buttonReset: 'Reset',
    buttonShare: 'Share',
}

const getQueryMatchLabel = (result: any) => {
    let footerText = "---";
    try {
        if (result?.length > 0 && Array.isArray(result)) {
            const mCount = parseInt(result[0]);
            footerText = `TOTAL ${mCount > 1 ? "MATCHES" : "MATCH"}: ${mCount}`;
            let resultLength = result.length - 1; //-mCount
            if (resultLength % 2 === 0) { //key value pair
                resultLength = resultLength / 2;
                if (resultLength < mCount) {
                    footerText += ` (SHOWING FIRST ${resultLength} RESULTS)`;
                }
            }

        }
        else if (result && typeof result === "string") {
            footerText = "TOTAL MATCH: 1";
        }
    }
    catch (e) {
        console.error(e);
    }
    return footerText;
}

const detectResultFormatType = (currentQuery: string, result: any[]) => {
    let retType = QueryResultFormat.string;

    if (result?.length > 0 && Array.isArray(result) && currentQuery?.startsWith('FT.SEARCH')) {
        retType = QueryResultFormat.hash;

        if (result.length > 2) {
            // const matchedCount = result[0];
            // const firstKey = result[1];
            const firstValue = result[2];
            /*
                firstValue = [
                    "$",  // JSON path
                    "{...json content...}"
                ]
             */
            if (firstValue?.length == 2 && firstValue[0].startsWith("$")) {
                retType = QueryResultFormat.json;
            }
        }
    }
    return retType;
}



const PgMainHeader = () => {
    const { queryViewData, customQuery, setQueryResult, setQueryError, setQueryMatchLabel, setQueryResultFormatType, selectedQueryId, setSelectedQueryId, setExecutedQuery } = usePlaygroundContext();


    const resetResultFields = () => {
        setExecutedQuery("");
        setQueryResult("");
        setQueryResultFormatType(QueryResultFormat.string);
        setQueryMatchLabel('NO RESULT FOUND');
        setQueryError("");
    }

    const handleRunQuery = async () => {
        resetResultFields();

        const apiResult = await pgRunQuery({
            queryId: queryViewData?.queryId, //for default query
            customQuery: customQuery,
        });

        if (apiResult?.data) {
            setQueryResult(apiResult?.data);

            const currentQuery = customQuery || queryViewData?.query || "";
            setExecutedQuery(currentQuery);

            const formatType = detectResultFormatType(currentQuery, apiResult?.data);
            setQueryResultFormatType(formatType);

            const footerText = getQueryMatchLabel(apiResult?.data);
            setQueryMatchLabel(footerText);
        }
        else if (apiResult?.error) {
            setQueryResultFormatType(QueryResultFormat.error);
            setQueryError(apiResult?.error);
        }

    }

    const handleResetQuery = () => {

        resetResultFields();

        //retrigger the query change
        const newSelectedQueryId = selectedQueryId;
        setSelectedQueryId("");
        if (newSelectedQueryId) {
            setTimeout(() => {
                setSelectedQueryId(newSelectedQueryId);
            }, 0);
        }
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
