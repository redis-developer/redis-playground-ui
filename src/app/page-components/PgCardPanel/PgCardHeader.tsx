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
            <div className="header-title font-bold">
                {headerTitle}

                {infoIconContent && (
                    <TooltipIcon iconCls="fa fa-info-circle"
                        title={infoIconContent} titleType={infoIconContentType} />
                )}


            </div>
            <div className="header-buttons">
                {showSwitchViewIcon && <TooltipIcon iconCls="fa fa-columns"
                    title="Switch View"
                    onClick={() => handleClick(HeaderIcon.switchView)}
                />
                }

                {showCopyIcon &&
                    (copied ? <i className="fa fa-check"></i> : <TooltipIcon iconCls="fa fa-copy" title="Copy" onClick={() => handleClick(HeaderIcon.copy)} />)}

            </div>
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };