import './index.scss';
import Image from 'next/image';

enum IconButtonType {
    REGULAR = 'regular',
    SUCCESS = 'success'
}

interface IconButtonProps {
    buttonLbl: string;
    onClick?: () => void;
    iconCls?: string;
    imgSrc?: string;
    imgWidth?: number;
    imgHeight?: number;
    buttonCls?: string;
    buttonType?: IconButtonType;
    isDisabled?: boolean;
}

const IconButton = ({ buttonLbl, onClick, iconCls = "", imgSrc = "", imgWidth = 16, imgHeight = 16, buttonCls = "",
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
            {imgSrc && <Image src={imgSrc} alt={buttonLbl} width={imgWidth} height={imgHeight} />}
        </div>
    </div>);
}

export default IconButton;

export { IconButtonType };