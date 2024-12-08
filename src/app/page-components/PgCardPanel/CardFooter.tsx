import './CardFooter.css';

interface CardFooterProps {
    footerText: string;
}

const CardFooter = ({ footerText }: CardFooterProps) => {
    return <div className="card-footer">{footerText}</div>
}

export default CardFooter;