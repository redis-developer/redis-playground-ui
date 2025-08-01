'use client';

import './index.scss';

import type { IQueryResponse, IQueryHistory } from '@/app/types';


import { useState } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from "uuid";

import IconButton from '@/app/components/IconButton';

import { usePlaygroundContext } from '../PlaygroundContext';
import { pgRunQuery, pgSaveQuery } from '@/app/utils/services';
import { QueryResultFormat } from '@/app/constants';
import { IconButtonType } from '@/app/components/IconButton';
import Loader from "@/app/components/Loader";
import { infoToast } from '@/app/utils/toast-util';
import { BrowserCache, USER_ID_KEY } from '@/app/utils/browser-cache';
import TooltipIcon from '@/app/components/TooltipIcon';
import { TooltipIconType } from '@/app/components/TooltipIcon';
import { insertQueryHistory } from '@/app/utils/query-history';

const logoImgPath = '/redis.png';
const labels = {
    title: 'Redis Sandbox',
    buttonRun: 'Run',
    buttonReset: 'Reset',
    buttonShare: 'Share',
}

const getQueryMatchLabel = (result: any, query: string, formatType: QueryResultFormat) => {
    let footerText = "---";
    try {
        if (result?.length > 0 && Array.isArray(result)) {

            if (formatType === QueryResultFormat.vectorSets) {
                const hasScores = query.toLowerCase().includes('withscores');
                const hasAttribs = query.toLowerCase().includes('withattribs');
                let count = 0;
                if (hasScores && hasAttribs) {
                    count = result.length / 3;
                }
                else if (hasScores) {
                    count = result.length / 2;
                }
                else {
                    count = result.length;
                }
                footerText = `TOTAL ELEMENTS: ${count}`;
            }
            else {
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

    if (currentQuery) {
        //remove all empty lines and comments starting with # or //
        currentQuery = currentQuery
            .split("\n")
            .filter((line: string) => {
                const trimmedLine = line.trim();
                return (
                    trimmedLine &&
                    !(trimmedLine.startsWith("#") || trimmedLine.startsWith("//"))
                );
            })
            .join("\n")
            .trim();


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
        else if (result?.length > 0 && Array.isArray(result) && currentQuery?.startsWith('FT.AGGREGATE')) {
            retType = QueryResultFormat.aggregate;
        }
        else if (result?.length > 0 && Array.isArray(result) && currentQuery?.startsWith('VSIM')) {
            retType = QueryResultFormat.vectorSets;
        }
    }
    return retType;
}

const PgMainHeader = () => {
    const { queryViewData, customQuery,
        setQueryResponse,
        selectedQuery, setSelectedQuery,
        apiCallInProgress, setApiCallInProgress,
        userId,
        setUserId,
    } = usePlaygroundContext();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const [isRunButtonDisabled, setIsRunButtonDisabled] = useState(false);


    const handleRunQuery = async () => {
        setQueryResponse(null);

        const queryResponse: IQueryResponse = {
            executedQuery: "",
            result: null,
            error: null,
            matchLabel: "",
            resultFormatType: QueryResultFormat.string,
        };
        setApiCallInProgress(prev => prev + 1);
        setIsRunButtonDisabled(true);

        const apiResult = await pgRunQuery({
            queryId: queryViewData?.queryId, //for default query
            customQuery: customQuery,
        });

        if (apiResult?.data) {
            setUserId(apiResult?.userId);
            createQueryHistory(); //async

            queryResponse.result = apiResult?.data;

            const currentQuery = customQuery || queryViewData?.query || "";
            queryResponse.executedQuery = currentQuery;

            const formatType = detectResultFormatType(currentQuery, apiResult?.data);
            queryResponse.resultFormatType = formatType;

            const footerText = getQueryMatchLabel(apiResult?.data, currentQuery, formatType);
            queryResponse.matchLabel = footerText;
        }
        else if (apiResult?.error) {
            queryResponse.resultFormatType = QueryResultFormat.error;
            queryResponse.error = apiResult?.error;
        }

        setQueryResponse(queryResponse);
        setApiCallInProgress(prev => prev - 1);
        setIsRunButtonDisabled(false);
    }

    const handleResetQuery = () => {

        //retrigger the query change
        const newSelectedQuery = selectedQuery;
        setSelectedQuery(null);
        if (newSelectedQuery) {
            setTimeout(() => {
                setSelectedQuery(newSelectedQuery);
            }, 0);
        }
    }

    const createQueryHistory = async () => {
        const queryHistory: IQueryHistory = {
            hId: uuidv4(),
            createdOn: new Date().toISOString(),
            //few days ago
            // createdOn: new Date(new Date().setDate(new Date().getDate() - 13)).toISOString(),

            customQuery: "",
            queryId: "",
            query: "",
            categoryId: "",
            // title: "",
        }

        if (customQuery) {
            queryHistory.customQuery = customQuery;
        }

        if (queryViewData?.queryId && selectedQuery?.categoryId) {
            queryHistory.queryId = queryViewData?.queryId;
            queryHistory.query = queryViewData?.query;
            queryHistory.categoryId = selectedQuery?.categoryId;
        }

        await insertQueryHistory([queryHistory]);
    }

    const handleShareQuery = async () => {

        let isSuccess = false;
        const inputUserId = BrowserCache.getItem(USER_ID_KEY);

        let queryStr = '';
        let partialId = uuidv4();
        if (customQuery) {
            queryStr = `?cQueryId=${partialId}`;
        }
        else if (queryViewData?.queryId && selectedQuery?.categoryId) {
            queryStr = `?queryId=${queryViewData?.queryId?.toLowerCase()}&catId=${selectedQuery?.categoryId}`;
        }
        if (queryStr) {

            if (inputUserId) {
                queryStr += `&userId=${inputUserId}`;
            }

            //for safari, clipboard copy must happen before the api call
            const shareUrl = `${window.location.origin}${basePath}${queryStr}`;
            navigator.clipboard.writeText(shareUrl);
        }

        if (customQuery) {
            setApiCallInProgress(prev => prev + 1);

            const result = await pgSaveQuery({
                partialId: partialId,
                customQuery: customQuery,
                categoryId: selectedQuery?.categoryId,
                queryId: queryViewData?.queryId, //for default query
            });
            if (result?.data?._id) {
                isSuccess = true;
            }

            setApiCallInProgress(prev => prev - 1);
        }
        else {
            isSuccess = true;
        }

        if (isSuccess) {
            infoToast('Share URL copied to clipboard !', {
                className: "pg-custom-nowrap-toast",
            });
        }
    }

    return (
        <div className="pg-main-header-container">
            <div className="header-logo">
                <Image src={basePath + logoImgPath} alt="logo" width={84} height={28} />
            </div>
            <div className="header-right-container">
                <div className="header-right-top">
                    <div className="header-title font-medium">
                        {labels.title}

                        {userId && (
                            <TooltipIcon imgSrc={basePath + "/icons/info.svg"} imgWidth="0.875rem" imgHeight="0.875rem"
                                title={"userId : " + userId} />
                        )}
                    </div>
                    <div className="header-buttons">
                        <IconButton buttonLbl={labels.buttonRun}
                            imgSrc={basePath + "/icons/play.svg"} imgWidth="1.5rem" imgHeight="1.5rem"
                            buttonCls="header-run-btn" onClick={handleRunQuery} buttonType={IconButtonType.SUCCESS} isDisabled={isRunButtonDisabled} />
                        <IconButton buttonLbl={labels.buttonReset}
                            imgSrc={basePath + "/icons/redo.svg"} imgWidth="1.25rem" imgHeight="1.25rem"
                            imgHoverSrc={basePath + "/icons/redo-hover.svg"}
                            buttonCls="header-reset-btn" onClick={handleResetQuery} />
                        <IconButton buttonLbl={labels.buttonShare}
                            imgSrc={basePath + "/icons/arrow-up-right.svg"} imgWidth="1.25rem" imgHeight="1.25rem"
                            imgHoverSrc={basePath + "/icons/arrow-up-right-hover.svg"}
                            buttonCls="header-share-btn" onClick={handleShareQuery} />
                    </div>
                </div>
                <Loader isShow={apiCallInProgress > 0} />
            </div>
        </div>
    )
}

export default PgMainHeader;
