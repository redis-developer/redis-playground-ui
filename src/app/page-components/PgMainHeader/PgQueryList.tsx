import "./PgQueryList.css";

import { useEffect, useState } from "react";

import { pgGetQueryNavbarData } from "@/app/utils/services";
import { usePlaygroundContext } from "../PlaygroundContext";

interface IQueryNavbarData {
    category: string;
    items: {
        queryId: string;
        label: string;
        description: string;
    }[];
}

const PgQueryList = () => {

    const { setSelectedQueryId } = usePlaygroundContext();

    const [queryNavbarData, setQueryNavbarData] = useState<IQueryNavbarData[]>([]);

    useEffect(() => {
        const fetchQueryNavbarData = async () => {
            const result = await pgGetQueryNavbarData();
            if (result?.data?.length > 0) {
                setQueryNavbarData(result?.data);
            }
        };
        fetchQueryNavbarData();
    }, []);

    const handleQueryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const queryId = event.target.value;
        setSelectedQueryId(queryId);
    };

    return <div className="pg-query-list">
        <select onChange={handleQueryChange}>
            <option value="" key="0">--- Select a query ---</option>
            {queryNavbarData.map((category) => (
                <optgroup label={category.category} key={category.category}>
                    {category.items.map((item) => (
                        <option value={item.queryId} key={item.queryId}>{item.label}</option>
                    ))}
                </optgroup>
            ))}
        </select>

    </div>;
};

export default PgQueryList;

