import './index.scss';

import { useState } from 'react';
import { Tooltip, ITooltip } from 'react-tooltip';

interface ITooltipIconProps {
    id?: string;
    iconCls: string;
    title: string;
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

const TooltipIcon = ({ id, iconCls, title, onClick }: ITooltipIconProps) => {
    const [tooltipId, setTooltipId] = useState(id || generateTooltipId());
    return <>
        <i className={`comp-tooltip-icon ${iconCls}`}
            onClick={onClick}
            data-tooltip-id={tooltipId}
            data-tooltip-content={title}
        ></i>
        <Tooltip id={tooltipId} {...tooltipOptions} />
        {/* openOnClick={true} */}
    </>;
}

export default TooltipIcon;