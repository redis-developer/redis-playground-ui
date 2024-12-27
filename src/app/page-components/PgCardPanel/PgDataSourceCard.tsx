import './PgDataSourceCard.css';

import { useEffect, useRef, useState } from 'react';
import { EditorView } from 'codemirror';

import PgCardFooter from './PgCardFooter';
import PgCardHeader from './PgCardHeader';
import { HeaderIcon } from './PgCardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import { CodeMirrorMode, updateCode } from '../../components/CodeMirrorEditor';
import { pgGetSampleDataByDataSourceId } from '../../utils/services';
import { usePlaygroundContext } from '../PlaygroundContext';

interface PgDataSourceCardProps {
  dataSourceId?: string;
}

const pageData = {
  infoIconContent: 'A data source is a collection of data in Redis that we want to search.',
  headerTitle: 'DATA SOURCE',
  defaultFooterText: 'NO RECORDS FOUND',
  dataCount: 30,
}


const PgDataSourceCard = ({ dataSourceId }: PgDataSourceCardProps) => {
  const [footerText, setFooterText] = useState(pageData.defaultFooterText);
  const [sampleData, setSampleData] = useState("");
  const editorRef = useRef<EditorView | null>(null);
  const { setApiCallInProgress } = usePlaygroundContext();

  useEffect(() => {
    const fetchSampleData = async () => {
      if (dataSourceId) {
        setApiCallInProgress(prev => prev + 1);

        const result = await pgGetSampleDataByDataSourceId({
          dataSourceId: dataSourceId,
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
  }, [dataSourceId]);

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

    <CodeMirrorEditor initialValue={sampleData} mode={CodeMirrorMode.javascript} ref={editorRef} disabled={true} />

    <PgCardFooter footerText={footerText} />
  </div>
}

export default PgDataSourceCard;
