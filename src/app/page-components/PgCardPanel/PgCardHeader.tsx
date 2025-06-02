import './PgCardHeader.scss';

import { useState } from 'react';

import TooltipIcon from '../../components/TooltipIcon';
import { TooltipIconType } from '../../components/TooltipIcon';
import PgQueryHistory from './PgQueryHistory';

interface PgCardHeaderProps {
    headerTitle: string;
    infoIconContent?: string;
    infoIconContentType?: TooltipIconType;
    showCopyIcon?: boolean;
    showSwitchViewIcon?: boolean;
    showQueryHistoryIcon?: boolean;
    handleIconClick?: (icon: HeaderIcon) => void;
}

enum HeaderIcon {
    copy = 'copy',
    switchView = 'switchView'
}


const PgCardHeader = ({ headerTitle, infoIconContent, infoIconContentType, showCopyIcon, showSwitchViewIcon, showQueryHistoryIcon, handleIconClick }: PgCardHeaderProps) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const [copied, setCopied] = useState(false);
    const [showQueryHistoryModal, setShowQueryHistoryModal] = useState(false);

    const handleClick = (icon: HeaderIcon) => {
        if (handleIconClick) {
            handleIconClick(icon);

            if (icon === HeaderIcon.copy) {
                setCopied(true);
                // Reset back to copy icon after 2 seconds
                setTimeout(() => {
                    setCopied(false);
                }, 2000);

            }
        }
    }

    const handleQueryHistoryIconClick = () => {
        setShowQueryHistoryModal(true);
    };

    return (
        <div className="pg-card-header">
            <div className="header-title font-medium">
                {headerTitle}

                {infoIconContent && (
                    <TooltipIcon imgSrc={basePath + "/icons/info.svg"} imgWidth="0.875rem" imgHeight="0.875rem"
                        title={infoIconContent} titleType={infoIconContentType} />
                )}


            </div>
            <div className="header-buttons">
                {showQueryHistoryIcon && (
                    <TooltipIcon
                        imgSrc={basePath + "/icons/history.svg"}
                        imgWidth="1.25rem"
                        imgHeight="1.25rem"
                        title="Query History"
                        onClick={handleQueryHistoryIconClick}
                        className="pg-query-history-icon"
                    />
                )}
                {showSwitchViewIcon && <TooltipIcon imgSrc={basePath + "/icons/columns.svg"} imgWidth="1.25rem" imgHeight="1.25rem"
                    title="Switch View"
                    onClick={() => handleClick(HeaderIcon.switchView)}
                />
                }

                {showCopyIcon &&
                    (copied ? <TooltipIcon imgSrc={basePath + "/icons/check.svg"} imgWidth="1.25rem" imgHeight="1.25rem" title="Copied" /> : <TooltipIcon imgSrc={basePath + "/icons/copy.svg"} imgWidth="1.25rem" imgHeight="1.25rem" title="Copy" onClick={() => handleClick(HeaderIcon.copy)} />)}

            </div>
            <PgQueryHistory isOpen={showQueryHistoryModal} onClose={() => setShowQueryHistoryModal(false)} />
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };