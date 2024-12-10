import PgQueryCard from "./PgQueryCard";
import PgDbIndexCard from "./PgDbIndexCard";
import PgDataSourceCard from "./PgDataSourceCard";
import PgResultCard from "./PgResultCard";

import './index.css';

const PgCardPanel = () => {
    return <div className="pg-card-panel">
        <div className="pg-card-panel-row">
            <div className="pg-card-panel-row-item">
                <PgQueryCard queryId="1" query="FT.SEARCH {dbIndexName} '@brandName:{tokyo*}'" />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDbIndexCard dbIndexId="1" />
            </div>
        </div>
        <div className="pg-card-panel-row">
            <div className="pg-card-panel-row-item">
                <PgResultCard data="data" error="error" />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDataSourceCard dataSourceId="1" />
            </div>
        </div>
    </div>
}

export default PgCardPanel;