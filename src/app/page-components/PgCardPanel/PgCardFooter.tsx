import './PgCardFooter.scss';

interface PgCardFooterProps {
    footerText?: string;
}

const PgCardFooter = ({ footerText }: PgCardFooterProps) => {
    return <div className="pg-card-footer">{footerText}</div>
}

export default PgCardFooter;