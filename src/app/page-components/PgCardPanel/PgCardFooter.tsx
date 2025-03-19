import './PgCardFooter.scss';

interface PgCardFooterProps {
    footerText?: string;
}

const PgCardFooter = ({ footerText }: PgCardFooterProps) => {
    return <div className="pg-card-footer font-thin">{footerText}</div>
}

export default PgCardFooter;