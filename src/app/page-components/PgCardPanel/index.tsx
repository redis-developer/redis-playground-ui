import QueryCard from "./QueryCard";
import DbIndexCard from "./DbIndexCard";
import DataSourceCard from "./DataSourceCard";
import ResultCard from "./ResultCard";

import './index.css';

const PgCardPanel = () => {
    return <div className="card-panel">
        <div className="card-panel-row">
            <div className="card-panel-row-item">
                <QueryCard queryId="1" query="FT.SEARCH {dbIndexName} '@brandName:{tokyo*}'" />
            </div>
            <div className="card-panel-row-item">
                <DbIndexCard dbIndexId="1" />
            </div>
        </div>
        <div className="card-panel-row">
            <div className="card-panel-row-item">
                <ResultCard data="data" error="error" />
            </div>
            <div className="card-panel-row-item">
                <DataSourceCard dataSourceId="1" />
            </div>
        </div>
    </div>
}

export default PgCardPanel;