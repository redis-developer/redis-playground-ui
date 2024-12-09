import './index.css';

interface IconButtonProps {
    btnLabel: string;
    onClick?: () => void;
    iconClass?: string;
    btnClass?: string;

}

const IconButton = ({ iconClass, btnLabel, onClick, btnClass }: IconButtonProps) => {
    return (<div className={`comp-icon-button ${btnClass}`} onClick={onClick}>
        <i className={`icon ${iconClass}`}></i>
        <span className="label">{btnLabel}</span>
    </div>);
}

export default IconButton;