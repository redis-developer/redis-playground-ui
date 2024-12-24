import "./index.css";
import type { IQueryTemplateData } from "@/app/types";

import { useEffect, useState } from "react";

import { usePlaygroundContext } from "../PlaygroundContext";
import ModalPopup from '@/app/components/ModalPopup';
import PgQueryTemplate from '../PgQueryTemplate';

const labels = {
    configure: "CONFIGURE",
    selectQuery: "SELECT QUERY"
}

const PgSidebar = () => {
    const { queryTemplateData, selectedQuery, setSelectedQuery } = usePlaygroundContext();
    const [selectedCategory, setSelectedCategory] = useState<IQueryTemplateData | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (selectedQuery && queryTemplateData) {
            const result = queryTemplateData.find(item => item.category === selectedQuery.category);
            if (result) {
                setSelectedCategory(result);
            }
        }
    }, [selectedQuery]);

    const handleQueryItemClick = (queryId: string, category: string) => {
        setSelectedQuery({ queryId, category });
    };


    return <div className="pg-sidebar">

        <div className="list">
            <div className="list-title font-bold">
                {labels.configure}
            </div>
            <div className="list-item" onClick={() => setModalIsOpen(true)}>
                <div className="list-item-icon">
                    <i className="fa fa-object-group"></i>
                </div>
                <div className="list-item-label">
                    {labels.selectQuery}
                </div>
            </div>
        </div>
        <div className="query-category list">
            {selectedCategory && (
                <>
                    <div className="list-title font-bold">
                        {selectedCategory?.category}
                    </div>
                    <div>
                        {selectedCategory?.items.map(item => (
                            <div className={`list-item ${item.queryId === selectedQuery?.queryId ? "list-item-active" : ""}`}
                                key={item.label}
                                onClick={() => handleQueryItemClick(item.queryId, selectedCategory?.category)}>
                                <div className="list-item-icon">
                                    <i className="fa fa-arrow-right"></i>
                                </div>
                                <div className="list-item-label">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>

        <ModalPopup isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>

            <PgQueryTemplate onClose={() => setModalIsOpen(false)} />

        </ModalPopup>

    </div>
}

export default PgSidebar;