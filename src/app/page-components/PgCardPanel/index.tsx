import './index.scss';
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
        selectedQuery,
        queryViewData, setQueryViewData,
        setCustomQuery,
        setQueryResponse,
        setApiCallInProgress
    } = usePlaygroundContext();

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
                            <div className="pg-card-panel-item">
                                <PgQueryCard
                                    queryId={queryViewData?.queryId}
                                    query={queryViewData?.query} />
                            </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel minSize={20} defaultSize={45}>
                            <div className="pg-card-panel-item">
                                <PgDbIndexCard dbIndexId={queryViewData?.dbIndexId} />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <ResizeHandle />
                <Panel minSize={20}>
                    <PanelGroup direction="horizontal">
                        <Panel minSize={20} defaultSize={55}>
                            <div className="pg-card-panel-item">
                                <PgResultCard />
                            </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel minSize={20} defaultSize={45}>
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