import './index.scss';

import type { IQueryTemplateData } from "../usePlayground";

import { useEffect, useState } from "react";
import Highlighter from 'react-highlight-words';
import Image from "next/image";

import { usePlaygroundContext } from "../PlaygroundContext";
import Loader from "@/app/components/Loader";

interface IQueryTemplateProps {
    onClose?: () => void;
}

const labels = {
    searchPlaceholder: "Search queries..."
}
const highlightClassName = "pg-highlighted-text";

const PgQueryTemplate = ({ onClose }: IQueryTemplateProps) => {
    const { setSelectedQuery, queryTemplateData, setQueryTemplateData, fnLoadQueryTemplateData } = usePlaygroundContext();

    const [filteredTemplateData, setFilteredTemplateData] = useState<IQueryTemplateData[]>(queryTemplateData);
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (queryTemplateData?.length === 0) {
            const fetchQueryTemplateData = async () => {
                setIsShowLoader(true);

                const result = await fnLoadQueryTemplateData();
                setFilteredTemplateData(result);

                setIsShowLoader(false);
            };
            fetchQueryTemplateData();
        }
    }, []);

    const handleQueryItemClick = (queryId: string, categoryId: string) => {
        setSelectedQuery({ queryId, categoryId });
        if (onClose) {
            onClose();
        }
    };

    const handleClearSearch = () => {
        setSearchValue("");
        handleSearchChange(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement> | null) => {
        let searchTerm = event?.target?.value || "";
        setSearchValue(searchTerm);
        searchTerm = searchTerm?.toLowerCase().trim();

        if (searchTerm) {
            const filteredData = queryTemplateData.map((queryTmpl) => {
                const isCategoryMatch = queryTmpl.category.toLowerCase().includes(searchTerm);
                return {
                    ...queryTmpl,
                    score: isCategoryMatch ? 2 : 1,
                    items: isCategoryMatch
                        ? queryTmpl.items
                        : queryTmpl.items.filter((item) =>
                            item.label.toLowerCase().includes(searchTerm) ||
                            item.description?.toLowerCase().includes(searchTerm)
                        )
                };
            }).filter(queryTmpl => queryTmpl.items.length > 0)
                .sort((a, b) => a.score - b.score);
            setFilteredTemplateData(filteredData);
        }
        else {
            setFilteredTemplateData(queryTemplateData);
        }
    };

    return <div className="pg-query-template">
        <div className="query-search-bar-container">
            <div className="query-search-bar">
                {/* <i className="fa fa-search"></i> */}
                <Image src="/icons/search.svg" alt={labels.searchPlaceholder} width={18} height={18} />
                <input type="text" placeholder={labels.searchPlaceholder} onChange={handleSearchChange} className="query-search-input" value={searchValue} />
                {searchValue && <i className="fa fa-times clear-icon" onClick={handleClearSearch}></i>}
            </div>
        </div>
        <Loader isShow={isShowLoader} />

        <div className="query-category-container">
            {filteredTemplateData.map((queryTmpl, index) => (
                <div key={index} className="query-category">
                    <div className="query-category-title font-bold">
                        <Highlighter
                            highlightClassName={highlightClassName}
                            searchWords={[searchValue]}
                            autoEscape={true}
                            textToHighlight={queryTmpl.category}
                        />
                    </div>
                    <div className="query-category-items">
                        {queryTmpl.items.map((item, index) => (
                            <div key={index} className="query-item" onClick={() => handleQueryItemClick(item.queryId, queryTmpl.categoryId)}>
                                <div className="query-item-label font-bold">
                                    <Highlighter
                                        highlightClassName={highlightClassName}
                                        searchWords={[searchValue]}
                                        autoEscape={true}
                                        textToHighlight={item.label}
                                    />
                                </div>
                                <div className="query-item-description">
                                    <Highlighter
                                        highlightClassName={highlightClassName}
                                        searchWords={[searchValue]}
                                        autoEscape={true}
                                        textToHighlight={item.description}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {filteredTemplateData.length === 0 && !isShowLoader && <div className="query-no-result">No matching queries found !</div>}

        </div>
    </div>
}

export default PgQueryTemplate;