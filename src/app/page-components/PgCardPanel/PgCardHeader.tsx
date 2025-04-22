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
    const basePath = useBasePath;

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
                    <TooltipIcon imgSrc={basePath("/icons/info.svg")} imgWidth="0.875rem" imgHeight="0.875rem"
                        title={infoIconContent} titleType={infoIconContentType} />
                )}


            </div>
            <div className="header-buttons">
                {showSwitchViewIcon && <TooltipIcon imgSrc={basePath("/icons/columns.svg")} imgWidth="1.25rem" imgHeight="1.25rem"
                    title="Switch View"
                    onClick={() => handleClick(HeaderIcon.switchView)}
                />
                }

                {showCopyIcon &&
                    (copied ? <TooltipIcon imgSrc={basePath("/icons/check.svg")} imgWidth="1.25rem" imgHeight="1.25rem" title="Copied" /> : <TooltipIcon imgSrc={basePath("/icons/copy.svg")} imgWidth="1.25rem" imgHeight="1.25rem" title="Copy" onClick={() => handleClick(HeaderIcon.copy)} />)}

            </div>
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };