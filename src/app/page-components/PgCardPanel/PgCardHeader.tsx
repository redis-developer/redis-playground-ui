import './PgCardHeader.css';

interface PgCardHeaderProps {
    headerTitle: string;
    infoIconContent?: string;
    showCopyIcon?: boolean;
}

const PgCardHeader = ({ headerTitle, infoIconContent, showCopyIcon }: PgCardHeaderProps) => {
    return (
        <div className="pg-card-header">
            <div className="pg-card-header-title font-bold">
                {headerTitle}

                {infoIconContent && <i className="fa fa-info-circle" title={infoIconContent}></i>}
            </div>
            <div className="pg-card-header-buttons">
                {showCopyIcon && <i className="fa fa-copy" title="Copy"></i>}
            </div>
        </div>
    );
};

export default PgCardHeader;
