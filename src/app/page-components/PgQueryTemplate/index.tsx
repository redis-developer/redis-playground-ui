import './index.scss';

import type { IQueryTemplateData } from "../usePlayground";

import { useEffect, useState } from "react";
import Highlighter from 'react-highlight-words';

import { usePlaygroundContext } from "../PlaygroundContext";
import Loader from "@/app/components/Loader";
import ImageIcon from "@/app/components/ImageIcon";
import TooltipIcon from '@/app/components/TooltipIcon';
import { useBasePath } from "@/app/utils/useBasePath";

interface IQueryTemplateProps {
    onClose?: () => void;
}

const labels = {
    searchPlaceholder: "Search queries",
    headerTitle: "Queries"
}
const highlightClassName = "pg-highlighted-text";

const PgQueryTemplate = ({ onClose }: IQueryTemplateProps) => {
    const { setSelectedQuery, queryTemplateData, setQueryTemplateData, fnLoadQueryTemplateData } = usePlaygroundContext();

    const [filteredTemplateData, setFilteredTemplateData] = useState<IQueryTemplateData[]>(queryTemplateData);
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Pre-compute all paths at the top level
    const searchIconPath = useBasePath("/icons/search.svg");
    const closeIconPath = useBasePath("/icons/close.svg");
    const arrowRightSlimRedPath = useBasePath("/icons/arrow-right-slim-red.svg");

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

    const handleSidebarItemClick = (categoryId: string) => {
        const element = document.getElementById(`category-${categoryId}`);
        if (element) {
            // For browsers that don't support smooth scrolling
            try {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (e) {
                // Fallback for older browsers
                element.scrollIntoView(true);
            }
        }
    };

    return <div className="pg-query-template">
        <div className="pg-query-template-header">
            <div className="pg-query-template-header-title font-medium">
                {labels.headerTitle}
            </div>
            <Loader isShow={isShowLoader} />
        </div>
        <div className="pg-query-template-content">
            <div className="query-sidebar">
                <div className="query-search-bar-container">
                    <div className="query-search-bar">
                        {/* <i className="fa fa-search"></i> */}
                        <ImageIcon imgSrc={searchIconPath} alt={labels.searchPlaceholder} imgWidth="1.125rem" imgHeight="1.125rem" />
                        <input type="text" placeholder={labels.searchPlaceholder} onChange={handleSearchChange} className="query-search-input" value={searchValue} />
                        {/* {searchValue && <i className="fa fa-times clear-icon" onClick={handleClearSearch}></i>} */}
                        {searchValue && <TooltipIcon imgSrc={closeIconPath} className='clear-icon' imgWidth="1rem" imgHeight="1rem" title="Clear" onClick={handleClearSearch} />}
                    </div>
                </div>
                <div className="query-sidebar-content">
                    {filteredTemplateData.map((queryTmpl, index) => (
                        <div key={index} className="query-sidebar-item" onClick={() => handleSidebarItemClick(queryTmpl.categoryId)}>
                            <div className="query-sidebar-item-label">
                                {queryTmpl.category}
                            </div>
                            <ImageIcon imgSrc={arrowRightSlimRedPath} alt={queryTmpl.category} />
                        </div>

                    ))}

                </div>
            </div>
            <div className="query-category-container">
                {filteredTemplateData.map((queryTmpl, index) => (
                    <div key={index} className="query-category" id={`category-${queryTmpl.categoryId}`}>
                        <div className="query-category-title font-medium">
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
                                    <div className="query-item-label font-medium">
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

    </div>
}

export default PgQueryTemplate;