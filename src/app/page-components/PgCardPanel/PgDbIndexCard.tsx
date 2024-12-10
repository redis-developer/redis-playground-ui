import './PgDbIndexCard.css';

import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';


interface PgDbIndexCardProps {
    dbIndexId: string;
}

const labels = {
    infoIconContent: 'To search data in Redis, we must create an index.',
    headerTitle: 'DB INDEX',
}

let initialValue = `FT.CREATE {dbIndexName}
 ON JSON
 PREFIX 1 {keyPrefix}
 SCHEMA
 $.productId AS "productId" NUMERIC
 $.price AS price NUMERIC
 $.brandName AS brandName TAG
 $.gender AS gender TAG
 $.masterCategoryType AS masterCategoryType TAG
 $.subCategoryType AS subCategoryType TAG
 $.productColors AS productColors TAG
 $.productDisplayName AS productDisplayName TAG
 $.displayCategories AS displayCategories TAG SEPARATOR ,
 $.productDescription AS productDescription TEXT
`;

const PgDbIndexCard = ({ dbIndexId }: PgDbIndexCardProps) => {
    return <div className="pg-db-index-card">
        <PgCardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />
        <CodeMirrorEditor initialValue={initialValue} mode="redis" />
    </div>
}

export default PgDbIndexCard;
