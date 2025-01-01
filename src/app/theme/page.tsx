import "./page.scss";
const Theme = () => {
    return (
        <div className="theme-container theme-custom-component">
            <div className="header">
                <h2>Theme</h2>
            </div>
            <div className="theme-container-body">
                <div className="group">
                    <div className="item black-gray">
                        <div className="item-label-white">Black Gray</div>
                    </div>
                    <div className="item black-gray-light1">
                        <div className="item-label-white">Black Gray X 1</div>
                    </div>
                    <div className="item black-gray-light2">
                        <div className="item-label-white">Black Gray X 2</div>
                    </div>
                    <div className="item black-gray-light3">
                        <div className="item-label-white">Black Gray X 3</div>
                    </div>
                    <div className="item gray">
                        <div className="item-label-black">Gray</div>
                    </div>
                    <div className="item black">
                        <div className="item-label-white">Black</div>
                    </div>
                    <div className="item white">
                        <div className="item-label-black">White</div>
                    </div>
                    <div className="item white-gray">
                        <div className="item-label-black">White Gray</div>
                    </div>
                </div>



                <div className="group">
                    <div className="item primary">
                        <div className="item-label-white">Primary</div>
                    </div>
                    <div className="item primary-light1">
                        <div className="item-label-white">Primary X 1</div>
                    </div>
                    <div className="item primary-light2">
                        <div className="item-label-white">Primary X 2</div>
                    </div>
                    <div className="item primary-light3">
                        <div className="item-label-white">Primary X 3</div>
                    </div>
                    <div className="item primary-light4">
                        <div className="item-label-white">Primary X 4</div>
                    </div>
                    <div className="item primary-light5">
                        <div className="item-label-white">Primary X 5</div>
                    </div>
                    <div className="item primary-light7">
                        <div className="item-label-black">Primary X 7</div>
                    </div>
                </div>

                <div className="group">
                    <div className="item success-green">
                        <div className="item-label-white">Success Green</div>
                    </div>
                    <div className="item success-green-light">
                        <div className="item-label-black">Success Green Light</div>
                    </div>
                    <div className="item error-red">
                        <div className="item-label-white">Error Red</div>
                    </div>
                    <div className="item btn-border">
                        <div className="item-label-black">Button Border</div>
                    </div>
                </div>

                <div className="group">
                    <div className="item loader-gradient1">
                        <div className="item-label-white">Loader Gradient 1</div>
                    </div>
                    <div className="item loader-gradient2">
                        <div className="item-label-white">Loader Gradient 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Theme;