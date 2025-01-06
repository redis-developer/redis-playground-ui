import "./index.scss";

import type { IQueryTemplateData } from "@/app/types";

import { useEffect, useState } from "react";

import { usePlaygroundContext } from "../PlaygroundContext";
import ModalPopup from '@/app/components/ModalPopup';
import PgQueryTemplate from '../PgQueryTemplate';

const labels = {
    configure: "CONFIGURE",
    selectQuery: "SELECT QUERY",
    links: "RESOURCES"
}

const linkItems = [
    { label: "Visit Docs", icon: "fa fa-book", url: "https://redis.io/docs/latest/" },
    { label: "Redis University", icon: "fa fa-university", url: "https://university.redis.io/" },
    { label: "Redis Cloud (Free)", icon: "fa fa-cloud", url: "https://cloud.redis.io/" },

]

const PgSidebar = () => {
    const { selectedQuery, setSelectedQuery, fnGetSelectedQueryTemplate } = usePlaygroundContext();
    const [selectedCategory, setSelectedCategory] = useState<IQueryTemplateData | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (selectedQuery) {
            const result = fnGetSelectedQueryTemplate();
            if (result?.template) {
                setSelectedCategory(result.template);
            }
        }
    }, [selectedQuery]);

    const handleQueryItemClick = (queryId: string, category: string) => {
        setSelectedQuery({ queryId, category });
    };


    return <div className="pg-sidebar">

        <div className="pg-list">
            <div className="pg-list-title font-bold">
                {labels.configure}
            </div>
            <div className="pg-list-item anime-line-hover" onClick={() => setModalIsOpen(true)}>
                <div className="pg-list-item-icon">
                    <i className="fa fa-object-group"></i>
                </div>
                <div className="pg-list-item-label">
                    {labels.selectQuery}
                </div>
            </div>
        </div>

        <div className="pg-query-category pg-list">
            {selectedCategory && (
                <div>
                    <div className="pg-list-title font-bold">
                        {selectedCategory?.category}
                    </div>
                    <div>
                        {selectedCategory?.items.map(item => (
                            <div className={`pg-list-item anime-line-hover ${item.queryId === selectedQuery?.queryId ? "pg-list-item-active" : ""}`}
                                key={item.label}
                                onClick={() => handleQueryItemClick(item.queryId, selectedCategory?.category)}>

                                <div className="pg-list-item-icon">
                                    <i className="fa fa-arrow-right"></i>
                                </div>
                                <div className="pg-list-item-label">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>

        <div className="pg-links pg-list">
            <div className="pg-list-title font-bold">
                {labels.links}
            </div>
            {linkItems.map(item => (
                <div className="pg-list-item anime-line-hover" key={item.label}>
                    <div className="pg-list-item-icon">
                        <i className={item.icon}></i>
                    </div>
                    <div className="pg-list-item-label" onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}>
                        {item.label}
                    </div>
                </div>
            ))}
        </div>



        <ModalPopup isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>

            <PgQueryTemplate onClose={() => setModalIsOpen(false)} />

        </ModalPopup>

    </div >
}

export default PgSidebar;