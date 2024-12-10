import './index.css';

import PgQueryCard from "./PgQueryCard";
import PgDbIndexCard from "./PgDbIndexCard";
import PgDataSourceCard from "./PgDataSourceCard";
import PgResultCard from "./PgResultCard";

const pageData = {
    queryId: "1",
    query: "FT.SEARCH {dbIndexName} '@brandName:{tokyo*}'",
    dbIndexId: "1",

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
    return <div className="pg-card-panel">
        <div className="pg-card-panel-row">
            <div className="pg-card-panel-row-item">
                <PgQueryCard queryId={pageData.queryId} query={pageData.query} />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDbIndexCard dbIndexId={pageData.dbIndexId} />
            </div>
        </div>

        <div className="pg-card-panel-row">
            <div className="pg-card-panel-row-item">
                <PgResultCard data={JSON.stringify(pageData.queryResult.data, null, 4)} error={pageData.queryResult.error} />
            </div>
            <div className="pg-card-panel-row-item">
                <PgDataSourceCard dataSourceId={pageData.dataSourceId} />
            </div>
        </div>
    </div>
}

export default PgCardPanel;