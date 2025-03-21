import './PgCardHeader.scss';

import { useState } from 'react';

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
                    <TooltipIcon imgSrc="/icons/info.svg" imgWidth="0.875rem" imgHeight="0.875rem"
                        title={infoIconContent} titleType={infoIconContentType} />
                )}


            </div>
            <div className="header-buttons">
                {showSwitchViewIcon && <TooltipIcon imgSrc="/icons/columns.svg" imgWidth="1.25rem" imgHeight="1.25rem"
                    title="Switch View"
                    onClick={() => handleClick(HeaderIcon.switchView)}
                />
                }

                {showCopyIcon &&
                    (copied ? <i className="fa fa-check"></i> : <TooltipIcon imgSrc="/icons/copy.svg" imgWidth="1.25rem" imgHeight="1.25rem" title="Copy" onClick={() => handleClick(HeaderIcon.copy)} />)}

            </div>
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };