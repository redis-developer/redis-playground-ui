import './index.css';
import type { IQueryViewData } from "@/app/types";

import { useEffect } from 'react';

import PgQueryCard from "./PgQueryCard";
import PgDbIndexCard from "./PgDbIndexCard";
import PgDataSourceCard from "./PgDataSourceCard";
import PgResultCard from "./PgResultCard";

import { usePlaygroundContext } from "../PlaygroundContext";
import { pgGetQueryDataById } from "@/app/utils/services";


const pageData = {
    queryResult: {
        data: [
            {
                productId: 1,
                price: 100,
                brandName: "tokyo",
            }
        ],
        error: null,
    },
    dataSourceId: "1",
}


const PgCardPanel = () => {
    const { selectedQueryId, queryViewData, setQueryViewData } = usePlaygroundContext();

    useEffect(() => {
        // on change of selectedQueryId
        const fetchQueryData = async () => {
            if (selectedQueryId) {
                const result = await pgGetQueryDataById({ queryIds: [selectedQueryId] });
                if (result?.data?.length > 0) {
                    const resultData: IQueryViewData = result?.data[0];
                    setQueryViewData(resultData);
                }
            }
        };
        fetchQueryData();
    }, [selectedQueryId, setQueryViewData]);

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
                <PgResultCard data={JSON.stringify(pageData.queryResult.data, null, 4)} error={pageData.queryResult.error} />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDataSourceCard dataSourceId={queryViewData?.dataSourceId} />
            </div>
        </div>
    </div>
}

export default PgCardPanel;