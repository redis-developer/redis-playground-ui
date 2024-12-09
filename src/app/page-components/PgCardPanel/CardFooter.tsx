import './CardFooter.css';

interface CardFooterProps {
    footerText: string;
}

const CardFooter = ({ footerText }: CardFooterProps) => {
    return <div className="card-footer font-medium">{footerText}</div>
}

export default CardFooter;