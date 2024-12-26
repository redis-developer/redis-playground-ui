import './index.css';

enum IconButtonType {
    REGULAR = 'regular',
    SUCCESS = 'success'
}

interface IconButtonProps {
    buttonLbl: string;
    onClick?: () => void;
    iconCls?: string;
    buttonCls?: string;
    buttonType?: IconButtonType;
}

const IconButton = ({ buttonLbl, onClick, iconCls = "", buttonCls = "",
    buttonType = IconButtonType.REGULAR }: IconButtonProps) => {
    return (<div className={`comp-icon-button ${buttonType}  ${buttonCls}`} onClick={onClick}>
        {iconCls && <i className={`icon ${iconCls}`} />}
        <span className="button-lbl">{buttonLbl}</span>
    </div>);
}

export default IconButton;

export { IconButtonType };