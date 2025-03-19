import './index.scss';

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
    isDisabled?: boolean;
}

const IconButton = ({ buttonLbl, onClick, iconCls = "", buttonCls = "",
    buttonType = IconButtonType.REGULAR, isDisabled = false }: IconButtonProps) => {

    const handleClick = () => {
        if (!isDisabled && onClick) {
            onClick();
        }
    }

    return (<div className={`comp-icon-button ${buttonType}  ${buttonCls} ${isDisabled ? 'disabled' : ''}`}
        onClick={handleClick}>
        <span className="button-lbl">{buttonLbl}</span>
        {iconCls && <i className={`icon ${iconCls}`} />}
    </div>);
}

export default IconButton;

export { IconButtonType };