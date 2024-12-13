import './index.css';
import type { IQueryViewData } from "@/app/types";

import { useEffect } from 'react';

import PgQueryCard from "./PgQueryCard";
import PgDbIndexCard from "./PgDbIndexCard";
import PgDataSourceCard from "./PgDataSourceCard";
import PgResultCard from "./PgResultCard";

import { usePlaygroundContext } from "../PlaygroundContext";
import { pgGetQueryDataById } from "@/app/utils/services";


const PgCardPanel = () => {
    const {
        selectedQueryId,
        queryViewData, setQueryViewData,
        queryResult, queryError,
        setCustomQuery
    } = usePlaygroundContext();

    useEffect(() => {
        // on change of selectedQueryId
        const fetchQueryData = async () => {
            if (selectedQueryId) {
                const result = await pgGetQueryDataById({ queryIds: [selectedQueryId] });
                if (result?.data?.length > 0) {
                    const resultData: IQueryViewData = result?.data[0];
                    setQueryViewData(resultData);
                    setCustomQuery("");
                }
            }
        };
        fetchQueryData();
    }, [selectedQueryId, setQueryViewData, setCustomQuery]);

    return <div className="pg-card-panel">
        <div className="pg-card-panel-row">
            <div className="pg-card-panel-row-item">
                <PgQueryCard queryId={queryViewData?.queryId} query={queryViewData?.query} />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDbIndexCard dbIndexId={queryViewData?.dbIndexId} />
            </div>
        </div>

        <div className="pg-card-panel-row">
            <div className="pg-card-panel-row-item">
                <PgResultCard result={queryResult} error={queryError} />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDataSourceCard dataSourceId={queryViewData?.dataSourceId} />
            </div>
        </div>
    </div>
}

export default PgCardPanel;