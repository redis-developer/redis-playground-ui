import './DbIndexCard.css';

import CardHeader from './CardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';


interface DbIndexCardProps {
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

const DbIndexCard = ({ dbIndexId }: DbIndexCardProps) => {
    return <div className="db-index-card">
        <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />
        <CodeMirrorEditor initialValue={initialValue} mode="redis" />
    </div>
}

export default DbIndexCard;