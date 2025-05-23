import './index.scss';
import type { IQueryViewData, ISavedQueryData } from "@/app/types";
import type { PgQueryCardRef } from "./PgQueryCard";

import { useEffect, useRef, useState } from 'react';
import {
    Panel,
    PanelGroup,
    PanelResizeHandle
} from "react-resizable-panels";

import PgQueryCard from "./PgQueryCard";
import PgDbIndexCard from "./PgDbIndexCard";
import PgDataSourceCard from "./PgDataSourceCard";
import PgResultCard from "./PgResultCard";

import { usePlaygroundContext } from "../PlaygroundContext";
import { pgGetQueryDataById, pgGetSavedQuery } from "@/app/utils/services";
import { getQueryHistoryById } from '@/app/utils/query-history';

const ResizeHandle = () => {
    return (
        <PanelResizeHandle className="resize-handle">
            <div className="resize-handle-inner" />
        </PanelResizeHandle>
    );
};

const PgCardPanel = () => {
    const {
        selectedQuery,
        setSelectedQuery,
        setQueryViewData,
        setCustomQuery,
        setQueryResponse,
        setApiCallInProgress,
        fnLoadQueryTemplateData,
        setUserId
    } = usePlaygroundContext();

    const [savedQueryData, setSavedQueryData] = useState<ISavedQueryData | null>(null);
    const queryCardRef = useRef<PgQueryCardRef>(null);

    const updateSavedQueryInEditor = (queryData?: ISavedQueryData | null) => {
        setTimeout(() => {
            const data = queryData || savedQueryData;
            if (data?.customQuery) {
                setCustomQuery(data.customQuery);
                queryCardRef.current?.updateEditorContent(data.customQuery);
                setSavedQueryData(null);
            }
        }, 50);
    }

    useEffect(() => {

        const onload = async () => {
            const promObjTmpl = fnLoadQueryTemplateData();

            setSavedQueryData(null);

            //load shared url
            if (window.location.search) {
                const queryParams = new URLSearchParams(window.location.search);
                const cQueryId = queryParams.get("cQueryId") || "";
                const queryId = queryParams.get("queryId")?.toUpperCase() || "";
                const catId = queryParams.get("catId") || "";
                const userId = queryParams.get("userId") || "";
                const hId = queryParams.get("hId") || "";


                if (userId) {
                    setUserId(userId);
                }


                if (cQueryId || hId) {
                    let promObjSq = null;

                    if (cQueryId) {
                        promObjSq = pgGetSavedQuery({ partialId: cQueryId });
                    }
                    else if (hId) {
                        promObjSq = getQueryHistoryById(hId);
                    }

                    const [result1, resultSq] = await Promise.all([promObjTmpl, promObjSq]);

                    if (resultSq?.data) {

                        const savedQueryResult = {
                            title: resultSq?.data.title,
                            customQuery: resultSq?.data.customQuery,
                            categoryId: resultSq?.data.categoryId,
                            queryId: resultSq?.data.queryId,
                        };

                        setSavedQueryData(savedQueryResult)

                        if (resultSq?.data.queryId) {
                            //trigger selectedQuery change
                            setSelectedQuery({
                                categoryId: resultSq?.data.categoryId,
                                queryId: resultSq?.data.queryId,
                            })
                        }
                        else {
                            updateSavedQueryInEditor(savedQueryResult);
                        }
                    }
                }
                else if (queryId && catId) {
                    //await fnLoadQueryTemplateData();
                    await promObjTmpl;

                    setSelectedQuery({
                        categoryId: catId,
                        queryId: queryId,
                    })
                }


                //delete query params
                const newUrl = window.location.href.split("?")[0];
                window.history.replaceState({}, "", newUrl);
            }
            else {
                await promObjTmpl;
            }
        };
        onload();
    }, []);

    useEffect(() => {
        // on change of selectedQuery
        const fetchQueryData = async () => {

            if (selectedQuery) {
                setApiCallInProgress(prev => prev + 1);

                setCustomQuery("");
                setQueryViewData(null);
                setQueryResponse(null);

                const result = await pgGetQueryDataById({ queryIds: [selectedQuery.queryId] });
                if (result?.data?.length > 0) {
                    const resultData: IQueryViewData = result?.data[0];
                    setQueryViewData(resultData);
                }
                setApiCallInProgress(prev => prev - 1);

                updateSavedQueryInEditor();

            }
        };
        fetchQueryData();
    }, [selectedQuery]);

    return (
        <div className="pg-card-panel">
            <PanelGroup direction="vertical">
                <Panel minSize={20}>
                    <PanelGroup direction="horizontal">
                        <Panel minSize={20} defaultSize={55}>
                            <div className="pg-card-panel-item pg-card-panel-query">
                                <PgQueryCard ref={queryCardRef} />
                            </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel minSize={20} defaultSize={45}>
                            <div className="pg-card-panel-item pg-card-panel-db-index">
                                <PgDbIndexCard />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <ResizeHandle />
                <Panel minSize={20}>
                    <PanelGroup direction="horizontal">
                        <Panel minSize={20} defaultSize={55}>
                            <div className="pg-card-panel-item pg-card-panel-result">
                                <PgResultCard />
                            </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel minSize={20} defaultSize={45}>
                            <div className="pg-card-panel-item pg-card-panel-data-source">
                                <PgDataSourceCard />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
}

export default PgCardPanel;