import './PgDataSourceCard.scss';

import { useEffect, useRef, useState } from 'react';
import { EditorView } from 'codemirror';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import { HeaderIcon } from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { pgGetSampleDataByDataSourceId } from '../../utils/services';
import { usePlaygroundContext } from '../PlaygroundContext';



const pageData = {
  infoIconContent: 'A data source is a collection of data in Redis that we want to search.',
  headerTitle: 'Data Source',
  defaultFooterText: 'NO RECORDS FOUND',
  dataCount: 30,
}


const PgDataSourceCard = () => {
  const [footerText, setFooterText] = useState(pageData.defaultFooterText);
  const [sampleData, setSampleData] = useState("");
  const editorRef = useRef<EditorView | null>(null);
  const { setApiCallInProgress, queryViewData } = usePlaygroundContext();

  useEffect(() => {
    const fetchSampleData = async () => {
      if (queryViewData?.dataSourceId) {
        setApiCallInProgress(prev => prev + 1);
        setSampleData("");
        setFooterText(pageData.defaultFooterText);

        const result = await pgGetSampleDataByDataSourceId({
          dataSourceId: queryViewData?.dataSourceId,
          dataCount: pageData.dataCount
        });
        if (result?.data?.length > 0) {
          const resultData = JSON.stringify(result?.data, null, 4);
          setSampleData(resultData);
          setFooterText(`DISPLAYING ${result?.data?.length} SAMPLE RECORDS`);
        }
        setApiCallInProgress(prev => prev - 1);
      }
    }
    fetchSampleData();
  }, [queryViewData]);

  useEffect(() => {
    if (editorRef?.current && sampleData) {
      updateCode(editorRef.current, sampleData);
    }
  }, [sampleData]);

  const handleCopyClick = () => {
    try {
      if (editorRef.current) {
        const content = editorRef.current.state.doc.toString();
        navigator.clipboard.writeText(content);
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  const handleIconClick = (icon: HeaderIcon) => {
    if (icon === HeaderIcon.copy) {
      handleCopyClick();
    }
  }

  return <div className="pg-data-source-card">
    <PgCardHeader headerTitle={pageData.headerTitle} showCopyIcon={true} infoIconContent={pageData.infoIconContent} handleIconClick={handleIconClick} />

    <CodeMirrorEditor initialValue={sampleData} mode={CodeMirrorMode.redis} ref={editorRef} disabled={true} />

    <PgCardFooter footerText={footerText} />
  </div>
}

export default PgDataSourceCard;
