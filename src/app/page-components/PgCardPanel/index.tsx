import './index.css';
import type { IQueryViewData } from "@/app/types";

import { useEffect } from 'react';
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
import { pgGetQueryDataById } from "@/app/utils/services";

const ResizeHandle = () => {
    return (
        <PanelResizeHandle className="resize-handle">
            <div className="resize-handle-inner" />
        </PanelResizeHandle>
    );
};

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
                setCustomQuery("");
                setQueryViewData(null);

                const result = await pgGetQueryDataById({ queryIds: [selectedQueryId] });
                if (result?.data?.length > 0) {
                    const resultData: IQueryViewData = result?.data[0];
                    setQueryViewData(resultData);
                }
            }
        };
        fetchQueryData();
    }, [selectedQueryId]);//, setQueryViewData, setCustomQuery

    return (
        <div className="pg-card-panel">
            <PanelGroup direction="vertical">
                <Panel minSize={20}>
                    <PanelGroup direction="horizontal">
                        <Panel minSize={20}>
                            <div className="pg-card-panel-item">
                                <PgQueryCard
                                    queryId={queryViewData?.queryId}
                                    query={queryViewData?.query} />
                            </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel minSize={20}>
                            <div className="pg-card-panel-item">
                                <PgDbIndexCard dbIndexId={queryViewData?.dbIndexId} />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <ResizeHandle />
                <Panel minSize={20}>
                    <PanelGroup direction="horizontal">
                        <Panel minSize={20}>
                            <div className="pg-card-panel-item">
                                <PgResultCard result={queryResult} error={queryError} />
                            </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel minSize={20}>
                            <div className="pg-card-panel-item">
                                <PgDataSourceCard dataSourceId={queryViewData?.dataSourceId} />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
}

export default PgCardPanel;