import './index.css';

import type { IQueryNavbarData } from "../usePlayground";

import { useEffect, useState } from "react";

import { pgGetQueryNavbarData } from "@/app/utils/services";
import { usePlaygroundContext } from "../PlaygroundContext";

interface IQueryTemplateProps {
    onClose?: () => void;
}

const labels = {
    searchPlaceholder: "Search queries..."
}

const PgQueryTemplate = ({ onClose }: IQueryTemplateProps) => {
    const { setSelectedQueryId, queryNavbarData, setQueryNavbarData } = usePlaygroundContext();

    const [filteredNavbarData, setFilteredNavbarData] = useState<IQueryNavbarData[]>(queryNavbarData);

    useEffect(() => {
        if (queryNavbarData?.length === 0) {
            const fetchQueryNavbarData = async () => {
                const result = await pgGetQueryNavbarData();
                if (result?.data?.length > 0) {
                    setQueryNavbarData(result?.data);
                    setFilteredNavbarData(result?.data);
                }
            };
            fetchQueryNavbarData();
        }
    }, []);

    const handleQueryItemClick = (queryId: string, category: string) => {
        setSelectedQueryId(queryId);
        if (onClose) {
            onClose();
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let searchValue = event?.target?.value;
        searchValue = searchValue?.toLowerCase().trim() || "";

        if (searchValue) {
            const filteredData = queryNavbarData.map((category) => ({
                ...category,
                items: category.items.filter((item) =>
                    item.label.toLowerCase().includes(searchValue) ||
                    item.description?.toLowerCase().includes(searchValue)
                )
            })).filter(category => category.items.length > 0);
            setFilteredNavbarData(filteredData);
        }
        else {
            setFilteredNavbarData(queryNavbarData);
        }
    };

    return <div className="pg-query-template">
        <div className="query-search-bar-container">
            <div className="query-search-bar">
                <i className="fa fa-search"></i>
                <input type="text" placeholder={labels.searchPlaceholder} onChange={handleSearchChange} className="query-search-input" />
            </div>
        </div>
        <div className="query-category-container">
            {filteredNavbarData.map((category, index) => (
                <div key={index} className="query-category">
                    <div className="query-category-title font-bold">{category.category}</div>
                    <div className="query-category-items">
                        {category.items.map((item, index) => (
                            <div key={index} className="query-item" onClick={() => handleQueryItemClick(item.queryId, category.category)}>
                                <div className="query-item-label font-bold">{item.label}</div>
                                <div className="query-item-description">{item.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {filteredNavbarData.length === 0 && <div className="query-no-result">No matching queries found !</div>}

        </div>
    </div>
}

export default PgQueryTemplate;