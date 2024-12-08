import './index.css';

interface IconButtonProps {
    btnLabel: string;
    onClick?: () => void;
    iconClass?: string;
    btnClass?: string; //for primary, secondary, etc. color buttons

}

const IconButton = ({ iconClass, btnLabel, onClick, btnClass }: IconButtonProps) => {
    return <div className={`comp-icon-button ${iconClass} ${btnClass}`} onClick={onClick}>{btnLabel}</div>
}

export default IconButton;