import './PgResultTable.scss';

import { useEffect, useState } from 'react';

import { QueryResultFormat } from '@/app/constants';
import { usePlaygroundContext } from '../PlaygroundContext';


interface PgResultTableProps {
    result: any[];
    formatType: QueryResultFormat;
}

interface IHeader {
    key: string;
    text: string;
}

const formatResultHash = (_result: any[]) => {
    /**
    const sampleResult = [
    3,
    "pg:bike:10008",
    [
        "score",
        "0.940289616585",
        "brand",
        "Bold bicycles",
        "type",
        "eBikes",
        "description",
        "A city eBike .."
    ],
    "pg:bike:10058",
    [
        "score",
        "0.950955808163",
        "brand",
        "Nord",
        "type",
        "Commuter bikes",
        "description",
        "This bike is the ...."
    ],
    // ... so on
    ];
    */
    const objArr: any[] = [];

    if (_result?.length) {
        // const mCount = result[0];, start from 1
        for (let i = 1; i < _result.length; i += 2) {
            const key = _result[i] as string;
            const value = _result[i + 1] as any[];

            let hashObj: any = null;
            if (key && value?.length && value.length % 2 === 0) {
                /*
                value = [field1, value1, field2, value2, ...]
                 */
                hashObj = {
                    key: key
                };
                for (let j = 0; j < value.length; j += 2) {
                    const field = value[j];
                    const fieldValue = value[j + 1];
                    hashObj[field] = fieldValue;
                }

            }
            if (hashObj) {
                objArr.push(hashObj);
            }
        }
    }
    return objArr;
}

const formatResultJson = (_result: any[]) => {
    /**
   const sampleResult = [
    650,
    "pg:fashion:5862",
    [
        "$",
        "{\"productId\":5862,\"price\":1699,\"productDisplayName\":\"ADIDAS Men's Stripe Black T-shirt\",\"variantName\":\"Adidas Stripe tee\",\"brandName\":\"adidas\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Tshirts,Casual Wear and Clearance,Sale and Clearance,Casual Wear,Sale\",\"productColors\":\"Black,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"-\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/9f9f083996862e825eb0ffb32ed9db31_images.jpg\"}"
    ],
    "pg:fashion:5859",
    [
        "$",
        "{\"productId\":5859,\"price\":1699,\"productDisplayName\":\"ADIDAS Men's Allover White T-shirt\",\"variantName\":\"Adidas ST allover Tee\",\"brandName\":\"adidas\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Casual Wear,Sale\",\"productColors\":\"White,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"-\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/c3219eba7f6553f3d3bac56450569e67_images.jpg\"}"
    ],
    //... so on
];
 */

    const objArr: any[] = [];

    if (_result?.length) {
        // const mCount = result[0];, start from 1
        for (let i = 1; i < _result.length; i += 2) {
            const key = _result[i] as string;
            const value = _result[i + 1] as any[];

            let jsonObj: any = null;
            if (key && value?.length) {
                /*
                value = [
                    "$",  // JSON path
                    "{...json content...}"
                ]
                 */
                const jsonPath = value[0];
                const jsonData = value[1];
                try {
                    const parsedData = JSON.parse(jsonData as string);
                    jsonObj = {
                        key,
                        path: jsonPath,
                        ...parsedData
                    };
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
            if (jsonObj) {
                objArr.push(jsonObj);
            }
        }
    }
    return objArr;
};

const formatResultAggregate = (_result: any[]) => {
    /**
 const sampleResult = 
 [
    1, //Matched count
    [ //row 1
        "__key", //field 1
        "pg:bicycle:6", // value 1
        "price", 
        "2300", 
        "discounted", 
        "2070" 
    ],
    [ //row 2
        "__key", // field 1
        "pg:bicycle:0", // value 1
        "price",
        "270",
        "discounted",
        "243"
    ],
    //... so on
];
 */

    const objArr: any[] = [];

    if (_result?.length) {
        // const mCount = result[0];, start from 1
        for (let i = 1; i < _result.length; i++) {
            const rowArray = _result[i];
            let obj: any = null;
            if (rowArray?.length && rowArray.length % 2 === 0) {
                obj = {};
                for (let j = 0; j < rowArray.length; j += 2) {
                    let field = rowArray[j];
                    if (field === '__key') {
                        field = 'key';
                    }
                    const value = rowArray[j + 1];
                    obj[field] = value;
                }
            }
            if (obj) {
                objArr.push(obj);
            }
        }
    }
    return objArr;
}


const prioritizeTableHeaders = (_headers: IHeader[], _query: string = "") => {
    //showing search fields first in the table

    let retHeaders: IHeader[] = _headers;

    if (_headers?.length && _query) {

        // Match all patterns that start with @ and end with :
        const querySearchFields = _query.match(/@[^:]+:/g)?.map(field => {
            // Remove @ from start and : from end
            return field.slice(1, -1).trim();
        }) || [];

        if (querySearchFields?.length) {
            const priorityKeys = ['key', 'path', ...querySearchFields];

            const filteredHeaders = _headers.filter(header => priorityKeys.includes(header.key));
            const remainingHeaders = _headers.filter(header => !priorityKeys.includes(header.key));
            retHeaders = [...filteredHeaders, ...remainingHeaders];
        }
    }
    return retHeaders;
}

const getTableHeaders = (_tableData: any[]) => {
    let headers: IHeader[] = [];

    if (_tableData?.length) {
        // Get all unique keys from all objects
        const keySet = new Set(
            _tableData.reduce((keys: string[], item) => {
                return [...keys, ...Object.keys(item)];
            }, [])
        );
        const keys = Array.from(keySet);

        for (let i = 0; i < keys.length; i++) {
            const headerKey = keys[i];
            const headerText = headerKey
                .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                .trim();

            headers.push({
                key: headerKey,
                text: headerText
            });
        }
    }
    return headers;
};

const formatCellContent = (value: any, maxLength: number) => {
    if (!value) {
        value = '';
    }
    const fullText = value.toString() || '-';
    const trimmedText = fullText.length > maxLength
        ? `${fullText.substring(0, maxLength)}...`
        : '';
    return {
        displayText: trimmedText || fullText,
        title: trimmedText ? fullText : ''
    };
};

const PgResultTable = ({ result, formatType }: PgResultTableProps) => {
    const { queryResponse } = usePlaygroundContext();

    const [tableData, setTableData] = useState<any[]>([]);
    const [tableHeaders, setTableHeaders] = useState<IHeader[]>([]);
    const maxCellCharCount = 50;

    useEffect(() => {
        if (result?.length) {
            let tData: any[] = [];
            if (formatType === QueryResultFormat.aggregate) {
                tData = formatResultAggregate(result);
            }
            else if (formatType === QueryResultFormat.json) {
                tData = formatResultJson(result);
            }
            else if (formatType === QueryResultFormat.hash) {
                tData = formatResultHash(result);
            }
            setTableData(tData);

            const headers = getTableHeaders(tData);
            const prioritizedHeaders = prioritizeTableHeaders(headers, queryResponse?.executedQuery);
            setTableHeaders(prioritizedHeaders);
        }
    }, [result, formatType]);



    return (
        <div className="pg-result-table-container">

            <table className="pg-result-table">

                {tableHeaders.length > 0 && (
                    <thead>
                        <tr>
                            <th key="slNo">Sl No</th>
                            {tableHeaders.map((header) => (
                                <th key={header.key}>{header.text}</th>
                            ))}
                        </tr>
                    </thead>
                )}

                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={item.key}>
                            <td key={`${item.key}-slNo`}>{index + 1}</td>

                            {tableHeaders.map((header) => {
                                const { displayText, title } = formatCellContent(item[header.key], maxCellCharCount);
                                return (
                                    <td key={`${item.key}-${header.key}`}
                                        title={title}>
                                        {displayText}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default PgResultTable;