import './index.css';

interface IconButtonProps {
    buttonLbl: string;
    onClick?: () => void;
    iconCls?: string;
    buttonCls?: string;

}

const IconButton = ({ buttonLbl, onClick, iconCls = "", buttonCls = "" }: IconButtonProps) => {
    return (<div className={`comp-icon-button ${buttonCls}`} onClick={onClick}>
        {iconCls && <i className={`icon ${iconCls}`} />}
        <span className="button-lbl">{buttonLbl}</span>
    </div>);
}

export default IconButton;