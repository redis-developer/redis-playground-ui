import './index.scss';

interface LoaderProps {
    isShow: boolean;
}
const Loader = ({ isShow }: LoaderProps) => {

    return <div className={`comp-loader ${isShow ? 'comp-loader-show' : ''}`}></div>
}

export default Loader;