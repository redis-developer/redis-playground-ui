import "./index.scss";

import type { IQueryTemplateData } from "@/app/types";

import { useEffect, useState } from "react";

import { usePlaygroundContext } from "../PlaygroundContext";
import ModalPopup from '@/app/components/ModalPopup';
import ImageIcon from "@/app/components/ImageIcon";
import { useBasePath } from "@/app/utils/useBasePath";

import PgQueryTemplate from '../PgQueryTemplate';

const labels = {
    configure: "Configure",
    selectQuery: "Select query",
    links: "Resources",
    replayTour: "Replay Tour"
}

const PgSidebar = () => {
    const { selectedQuery, setSelectedQuery, fnGetSelectedQueryTemplate, runTour, setRunTour, fnSetTourCompleted } = usePlaygroundContext();
    const [selectedCategory, setSelectedCategory] = useState<IQueryTemplateData | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const basePath = useBasePath;

    useEffect(() => {
        if (selectedQuery) {
            const result = fnGetSelectedQueryTemplate();
            if (result?.template) {
                setSelectedCategory(result.template);
            }
        }
    }, [selectedQuery]);

    const handleQueryItemClick = (queryId: string, categoryId: string) => {
        setSelectedQuery({ queryId, categoryId });
    };

    const handleReplayTourClick = () => {
        setRunTour(true);
    }

    const linkItems = [
        {
            label: "Docs",
            url: "https://redis.io/docs/latest/",
            image: basePath("/icons/profiler.svg")
        },
        {
            label: "Redis University",
            url: "https://university.redis.io/",
            image: basePath("/icons/university.svg")
        },
        {
            label: "Redis Cloud",
            url: "https://cloud.redis.io/",
            image: basePath("/icons/cloud-midnight.svg")
        },
    ]

    return <div className="pg-sidebar">

        <div className="pg-list">
            <div className="pg-list-title font-medium">
                {labels.configure}
            </div>
            <div className="pg-list-item anime-line-hover" onClick={() => setModalIsOpen(true)}>
                <div className="pg-list-item-icon">
                    <ImageIcon imgSrc={basePath("/icons/move.svg")} alt="move" imgWidth="1rem" imgHeight="1rem" />
                </div>
                <div className="pg-list-item-label select-query-label">
                    {labels.selectQuery}
                </div>
            </div>
        </div>

        <div className="pg-query-category pg-list">
            {selectedCategory && (
                <div>
                    <div className="pg-list-title font-medium">
                        {selectedCategory?.category}
                    </div>
                    <div>
                        {selectedCategory?.items.map(item => (
                            <div className={`pg-list-item anime-line-hover ${item.queryId === selectedQuery?.queryId ? "pg-list-item-active" : ""}`}
                                key={item.label}
                                onClick={() => handleQueryItemClick(item.queryId, selectedCategory?.categoryId)}>

                                <div className="pg-list-item-icon">
                                    <ImageIcon imgSrc={basePath("/icons/arrow-right-slim.svg")} alt={item.label} imgWidth="1rem" imgHeight="1rem" />
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
            <div className="pg-list-title font-medium">
                {labels.links}
            </div>

            {linkItems.map(item => (
                <div className="pg-list-item anime-line-hover" key={item.label} onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}>
                    <div className="pg-list-item-icon">
                        <ImageIcon imgSrc={item.image} alt={item.label} imgWidth="1rem" imgHeight="1rem" />
                    </div>
                    <div className="pg-list-item-label" >
                        {item.label}
                    </div>
                </div>
            ))}

            <div className="pg-list-item anime-line-hover" key="replay-tour" onClick={handleReplayTourClick}>
                <div className="pg-list-item-icon">
                    <ImageIcon imgSrc={basePath("/icons/refresh.svg")} alt="rotate" imgWidth="1rem" imgHeight="1rem" />
                </div>
                <div className="pg-list-item-label pg-replay-tour-lbl">
                    {labels.replayTour}
                </div>
            </div>

        </div>



        <ModalPopup isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>

            <PgQueryTemplate onClose={() => setModalIsOpen(false)} />

        </ModalPopup>

    </div >
}

export default PgSidebar;