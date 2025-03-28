import './index.scss';

import { useState } from 'react';
import { Tooltip, ITooltip } from 'react-tooltip';
import Image from "next/image";

enum TooltipIconType {
    text = 'text',
    html = 'html'
}

interface ITooltipIconProps {
    id?: string;
    className?: string;
    iconCls?: string;
    imgSrc?: string;
    imgWidth?: number | string;
    imgHeight?: number | string;
    title: string;
    titleType?: TooltipIconType;
    onClick?: () => void;
}

const tooltipOptions: ITooltip = {
    // place: 'right',
    // variant: 'light',
    delayShow: 200,
    className: 'comp-custom-tooltip font-regular',
    classNameArrow: 'comp-custom-tooltip-arrow'
}

const generateTooltipId = () => {
    return `tooltip-id-${Math.random().toString(36).substring(2, 15)}`;
}

const TooltipIcon = ({ id, iconCls, imgSrc, imgWidth = "1rem", imgHeight = "1rem", title, titleType = TooltipIconType.text, onClick, className }: ITooltipIconProps) => {
    const [tooltipId, setTooltipId] = useState(id || generateTooltipId());
    return <>
        {iconCls && (
            <i className={`comp-tooltip-icon ${iconCls} ${className}`}
                onClick={onClick}
                data-tooltip-id={tooltipId}
                data-tooltip-content={titleType === TooltipIconType.text ? title : undefined}
                data-tooltip-html={titleType === TooltipIconType.html ? title : undefined}
            ></i>
        )}
        {imgSrc && (
            <div className={`comp-tooltip-icon-img ${className}`} style={{ width: imgWidth, height: imgHeight }} >
                <Image src={imgSrc} alt={title} fill
                    onClick={onClick}
                    data-tooltip-id={tooltipId}
                    data-tooltip-content={titleType === TooltipIconType.text ? title : undefined}
                    data-tooltip-html={titleType === TooltipIconType.html ? title : undefined}
                />
            </div>
        )}
        <Tooltip id={tooltipId} {...tooltipOptions} />
        {/* openOnClick={true} */}
    </>;
}

export default TooltipIcon;

export { TooltipIconType };