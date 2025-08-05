import "./index.scss";

import type { IQueryTemplateData } from "@/app/types";

import { useEffect, useState, useRef } from "react";

import { usePlaygroundContext } from "../PlaygroundContext";
import ModalPopup from '@/app/components/ModalPopup';
import ImageIcon from "@/app/components/ImageIcon";

import PgQueryTemplate from '../PgQueryTemplate';

const labels = {
    configure: "Configure",
    selectQuery: "Select query",
    links: "Resources",
    replayTour: "Replay Tour"
}


const linkItems = [
    {
        label: "Docs",
        //icon: "fa fa-book", 
        url: "https://redis.io/docs/latest/",
        image: "/icons/profiler.svg"
    },
    {
        label: "Redis University",
        //icon: "fa fa-user-graduate",
        url: "https://university.redis.io/",
        image: "/icons/university.svg"
    },
    {
        label: "Try Redis Cloud",
        //icon: "fa fa-cloud",
        url: "http://redis.io/try-free",
        image: "/icons/cloud-midnight.svg"
    },
    {
        label: "Sandbox Tutorial",
        url: "https://redis.io/learn/howtos/redis-sandbox/",
        image: "/icons/tutorial.svg"
    },
]

const PgSidebar = () => {
    const { selectedQuery, setSelectedQuery, fnGetSelectedQueryTemplate, runTour, setRunTour, fnSetTourCompleted } = usePlaygroundContext();
    const [selectedCategory, setSelectedCategory] = useState<IQueryTemplateData | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hasQueryCategoryOverflow, setHasQueryCategoryOverflow] = useState(false);
    const queryCategoryRef = useRef<HTMLDivElement>(null);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    useEffect(() => {
        if (selectedQuery) {
            const result = fnGetSelectedQueryTemplate();
            if (result?.template) {
                setSelectedCategory(result.template);
            }
        }
    }, [selectedQuery]);

    useEffect(() => {
        if (queryCategoryRef.current && selectedCategory) {
            const element = queryCategoryRef.current;
            const hasOverflowContent = element.scrollHeight > element.clientHeight;
            setHasQueryCategoryOverflow(hasOverflowContent);
        } else {
            setHasQueryCategoryOverflow(false);
        }
    }, [selectedCategory]);

    const handleQueryItemClick = (queryId: string, categoryId: string) => {
        setSelectedQuery({ queryId, categoryId });
    };

    const handleReplayTourClick = () => {
        setRunTour(true);
    }


    return <div className="pg-sidebar">

        <div className="pg-list">
            <div className="pg-list-title font-medium">
                {labels.configure}
            </div>
            <div className="pg-list-item anime-line-hover" onClick={() => setModalIsOpen(true)}>
                <div className="pg-list-item-icon">
                    {/* <i className="fa fa-arrows-up-down-left-right"></i> */}
                    <ImageIcon imgSrc={basePath + "/icons/move.svg"} alt="move" imgWidth="1rem" imgHeight="1rem" />
                </div>
                <div className="pg-list-item-label select-query-label">
                    {labels.selectQuery}
                </div>
            </div>
        </div>

        <div
            ref={queryCategoryRef}
            className={`pg-query-category pg-list ${hasQueryCategoryOverflow ? 'has-overflow' : ''}`}
        >
            {selectedCategory && (
                <div>
                    <div className="pg-list-title font-medium">
                        {selectedCategory?.category} ({selectedCategory?.items.length})
                    </div>
                    <div>
                        {selectedCategory?.items.map(item => (
                            <div className={`pg-list-item anime-line-hover ${item.queryId === selectedQuery?.queryId ? "pg-list-item-active" : ""}`}
                                key={item.label}
                                onClick={() => handleQueryItemClick(item.queryId, selectedCategory?.categoryId)}>

                                <div className="pg-list-item-icon">
                                    {/* <i className="fa fa-arrow-right"></i> */}
                                    <ImageIcon imgSrc={basePath + "/icons/arrow-right-slim.svg"} alt={item.label} imgWidth="1rem" imgHeight="1rem" />
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
                        {/* <i className={item.icon}></i> */}
                        <ImageIcon imgSrc={basePath + item.image} alt={item.label} imgWidth="1rem" imgHeight="1rem" />
                    </div>
                    <div className="pg-list-item-label" >
                        {item.label}
                    </div>
                </div>
            ))}

            <div className="pg-list-item anime-line-hover" key="replay-tour" onClick={handleReplayTourClick}>
                <div className="pg-list-item-icon">
                    {/* <i className="fa fa-rotate"></i> */}
                    <ImageIcon imgSrc={basePath + "/icons/refresh.svg"} alt="rotate" imgWidth="1rem" imgHeight="1rem" />
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