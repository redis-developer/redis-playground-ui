import './PgCardHeader.scss';

import { useState } from 'react';
import { useBasePath } from "@/app/utils/useBasePath";

import TooltipIcon from '../../components/TooltipIcon';
import { TooltipIconType } from '../../components/TooltipIcon';

interface PgCardHeaderProps {
    headerTitle: string;
    infoIconContent?: string;
    infoIconContentType?: TooltipIconType;
    showCopyIcon?: boolean;
    showSwitchViewIcon?: boolean;
    handleIconClick?: (icon: HeaderIcon) => void;
}

enum HeaderIcon {
    copy = 'copy',
    switchView = 'switchView'
}


const PgCardHeader = ({ headerTitle, infoIconContent, infoIconContentType, showCopyIcon, showSwitchViewIcon, handleIconClick }: PgCardHeaderProps) => {
    const [copied, setCopied] = useState(false);
    
    // Pre-compute all paths at the top level
    const infoIconPath = useBasePath("/icons/info.svg");
    const columnsIconPath = useBasePath("/icons/columns.svg");
    const checkIconPath = useBasePath("/icons/check.svg");
    const copyIconPath = useBasePath("/icons/copy.svg");

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

    return (
        <div className="pg-card-header">
            <div className="header-title font-medium">
                {headerTitle}

                {infoIconContent && (
                    <TooltipIcon imgSrc={infoIconPath} imgWidth="0.875rem" imgHeight="0.875rem"
                        title={infoIconContent} titleType={infoIconContentType} />
                )}


            </div>
            <div className="header-buttons">
                {showSwitchViewIcon && <TooltipIcon imgSrc={columnsIconPath} imgWidth="1.25rem" imgHeight="1.25rem"
                    title="Switch View"
                    onClick={() => handleClick(HeaderIcon.switchView)}
                />
                }

                {showCopyIcon &&
                    (copied ? <TooltipIcon imgSrc={checkIconPath} imgWidth="1.25rem" imgHeight="1.25rem" title="Copied" /> : <TooltipIcon imgSrc={copyIconPath} imgWidth="1.25rem" imgHeight="1.25rem" title="Copy" onClick={() => handleClick(HeaderIcon.copy)} />)}

            </div>
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };