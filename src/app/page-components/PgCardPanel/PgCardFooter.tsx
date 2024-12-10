import './PgCardFooter.css';

interface PgCardFooterProps {
    footerText: string;
}

const PgCardFooter = ({ footerText }: PgCardFooterProps) => {
    return <div className="pg-card-footer font-medium">{footerText}</div>
}

export default PgCardFooter;