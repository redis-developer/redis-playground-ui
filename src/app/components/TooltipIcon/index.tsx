import './index.scss';

import { useState } from 'react';
import { Tooltip, ITooltip } from 'react-tooltip';

enum TooltipIconType {
    text = 'text',
    html = 'html'
}

interface ITooltipIconProps {
    id?: string;
    iconCls: string;
    title: string;
    titleType?: TooltipIconType;
    onClick?: () => void;
}

const tooltipOptions: ITooltip = {
    // place: 'right',
    // variant: 'light',
    delayShow: 200,
    className: 'comp-custom-tooltip',
    //classNameArrow: 'comp-custom-tooltip-arrow'
}

const generateTooltipId = () => {
    return `tooltip-id-${Math.random().toString(36).substring(2, 15)}`;
}

const TooltipIcon = ({ id, iconCls, title, titleType = TooltipIconType.text, onClick }: ITooltipIconProps) => {
    const [tooltipId, setTooltipId] = useState(id || generateTooltipId());
    return <>
        <i className={`comp-tooltip-icon ${iconCls}`}
            onClick={onClick}
            data-tooltip-id={tooltipId}
            data-tooltip-content={titleType === TooltipIconType.text ? title : undefined}
            data-tooltip-html={titleType === TooltipIconType.html ? title : undefined}
        ></i>
        <Tooltip id={tooltipId} {...tooltipOptions} />
        {/* openOnClick={true} */}
    </>;
}

export default TooltipIcon;

export { TooltipIconType };