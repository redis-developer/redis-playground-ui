import QueryCard from "./QueryCard";
import DbIndexCard from "./DbIndexCard";
import DataSourceCard from "./DataSourceCard";
import ResultCard from "./ResultCard";

import './index.css';

const PgCardPanel = () => {
    return <div className="card-panel">
        <QueryCard queryId="1" query="SELECT * FROM users" />
        <DbIndexCard dbIndexId="1" />
        <DataSourceCard dataSourceId="1" />
        <ResultCard data="data" error="error" />
    </div>
}

export default PgCardPanel;