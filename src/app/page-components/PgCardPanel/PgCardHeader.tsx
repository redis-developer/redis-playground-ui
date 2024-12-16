import './PgCardHeader.css';

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

    const handleClick = (icon: HeaderIcon) => {
        if (handleIconClick) {
            handleIconClick(icon);
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
                {showCopyIcon && <i className="fa fa-copy" title="Copy" onClick={() => handleClick(HeaderIcon.copy)}></i>}

            </div>
        </div>
    );
};

export default PgCardHeader;


export { HeaderIcon };