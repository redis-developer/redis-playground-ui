import './PgCardHeader.css';

import { useState } from 'react';

interface PgCardHeaderProps {
    headerTitle: string;
    infoIconContent?: string;
    showCopyIcon?: boolean;
    showSwitchViewIcon?: boolean;
    handleIconClick?: (icon: HeaderIcon) => void;
}

enum HeaderIcon {
    copy = 'copy',
    switchView = 'switchView'
}

const PgCardHeader = ({ headerTitle, infoIconContent, showCopyIcon, showSwitchViewIcon, handleIconClick }: PgCardHeaderProps) => {

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

                {infoIconContent && <i className="fa fa-info-circle" title={infoIconContent}></i>}
            </div>
            <div className="header-buttons">
                {showSwitchViewIcon && <i className="fa fa-columns" title="Switch View" onClick={() => handleClick(HeaderIcon.switchView)}></i>}

                {showCopyIcon &&
                    (copied ? <i className="fa fa-check"></i> : <i className="fa fa-copy" title="Copy" onClick={() => handleClick(HeaderIcon.copy)}></i>)}

            </div>
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };