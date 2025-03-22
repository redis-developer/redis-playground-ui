import './index.scss';

import ImageIcon from '../ImageIcon';

enum IconButtonType {
    REGULAR = 'regular',
    SUCCESS = 'success'
}

interface IconButtonProps {
    buttonLbl: string;
    onClick?: () => void;
    iconCls?: string;
    imgSrc?: string;
    imgHoverSrc?: string;
    imgWidth?: number | string;
    imgHeight?: number | string;
    buttonCls?: string;
    buttonType?: IconButtonType;
    isDisabled?: boolean;
}

const IconButton = ({ buttonLbl, onClick, iconCls = "", imgSrc = "", imgHoverSrc = "", imgWidth = "1rem", imgHeight = "1rem", buttonCls = "",
    buttonType = IconButtonType.REGULAR, isDisabled = false }: IconButtonProps) => {

    const handleClick = () => {
        if (!isDisabled && onClick) {
            onClick();
        }
    }

    return (<div className={`comp-icon-button ${buttonType}  ${buttonCls} ${isDisabled ? 'disabled' : ''}`}
        onClick={handleClick}>
        <div className='comp-icon-button-wrapper'>
            <span className="button-lbl">{buttonLbl}</span>
            {iconCls && <i className={`icon ${iconCls}`} />}
            {imgSrc && <ImageIcon imgSrc={imgSrc} alt={buttonLbl} imgWidth={imgWidth} imgHeight={imgHeight} className="default-image" />}
            {imgHoverSrc && <ImageIcon imgSrc={imgHoverSrc} alt={buttonLbl} imgWidth={imgWidth} imgHeight={imgHeight} className="hover-image" />}
        </div>
    </div>);
}

export default IconButton;

export { IconButtonType };