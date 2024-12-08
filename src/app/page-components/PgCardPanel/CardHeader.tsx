import './CardHeader.css';

interface CardHeaderProps {
    headerTitle: string;
    infoIconContent?: string;
    showCopyIcon?: boolean;
}

const CardHeader = ({ headerTitle, infoIconContent, showCopyIcon }: CardHeaderProps) => {
    return <div className="card-header">
        <div className="card-header-title">{headerTitle}</div>
        {infoIconContent && <div className="card-header-info-icon">{infoIconContent}</div>}
        {showCopyIcon && <div className="card-header-copy-icon">Copy</div>}
    </div>
}

export default CardHeader;