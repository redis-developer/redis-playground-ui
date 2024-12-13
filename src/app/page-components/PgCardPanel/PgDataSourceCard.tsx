import './PgDataSourceCard.css';

import { useEffect, useRef, useState } from 'react';
import { EditorView } from 'codemirror';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { pgGetSampleDataByDataSourceId } from '../../utils/services';

interface PgDataSourceCardProps {
  dataSourceId?: string;
}

const pageData = {
  infoIconContent: 'A data source is a collection of data that we want to search.',
  headerTitle: 'DATA SOURCE',
  defaultFooterText: 'NO RECORDS FOUND',
  dataCount: 30,
}


const PgDataSourceCard = ({ dataSourceId }: PgDataSourceCardProps) => {
  const [footerText, setFooterText] = useState(pageData.defaultFooterText);
  const [sampleData, setSampleData] = useState("");
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    const fetchSampleData = async () => {
      if (dataSourceId) {
        const result = await pgGetSampleDataByDataSourceId({
          dataSourceId: dataSourceId,
          dataCount: pageData.dataCount
        });
        if (result?.data?.length > 0) {
          const resultData = JSON.stringify(result?.data, null, 4);
          setSampleData(resultData);
          setFooterText(`DISPLAYING ${result?.data?.length} SAMPLE RECORDS`);
        }
      }
    }
    fetchSampleData();
  }, [dataSourceId]);

  useEffect(() => {
    if (editorRef?.current && sampleData) {
      updateCode(editorRef.current, sampleData);
    }
  }, [sampleData]);

  return <div className="pg-data-source-card pg-child-editor-container">
    <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} />

    <CodeMirrorEditor initialValue={sampleData} mode={CodeMirrorMode.javascript} ref={editorRef} />

    <PgCardFooter footerText={footerText} />
  </div>
}

export default PgDataSourceCard;
