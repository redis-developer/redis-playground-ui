import './CardHeader.css';

interface CardHeaderProps {
    headerTitle: string;
    infoIconContent?: string;
    showCopyIcon?: boolean;
}

const CardHeader = ({ headerTitle, infoIconContent, showCopyIcon }: CardHeaderProps) => {
    return (
        <div className="card-header">
            <div className="card-header-title font-bold">
                {headerTitle}
                {infoIconContent && <i className="fa fa-info-circle" title={infoIconContent}></i>}
            </div>
            <div className="card-header-buttons">
                {showCopyIcon && <i className="fa fa-copy" title="Copy"></i>}
            </div>
        </div>
    );
};

export default CardHeader;