import './PgResultTable.css';

import { useEffect, useState } from 'react';

import { usePlaygroundContext } from '../PlaygroundContext';

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
    "pg:fashion:7439",
    [
        "$",
        "{\"productId\":7439,\"price\":599,\"productDisplayName\":\"Proline Men Navy Striped T-shirt\",\"variantName\":\"PROLINE SS11/VS14 PC/JR/BD T shirt\",\"brandName\":\"proline\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Sale and Clearance,Casual Wear,Sale\",\"productColors\":\"Navy Blue,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"Navy blue striped T-shirt with printed detail, has a round neck, short sleeves\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/4f560e45a0816dea59ef5a562daf4902_images.jpg\"}"
    ],
    "pg:fashion:6969",
    [
        "$",
        "{\"productId\":6969,\"price\":1599,\"productDisplayName\":\"s.Oliver Women's Green Blouse Shirt\",\"variantName\":\"Green blouse\",\"brandName\":\"s.oliver\",\"ageGroup\":\"Adults-Women\",\"gender\":\"women\",\"displayCategories\":\"Casual Wear and Clearance,Sale and Clearance,Casual Wear,Sale\",\"productColors\":\"Green,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"Blue casual shirt, has a spread collar,a full buttoned placket, sleeveless, curved hem\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/a42f2140bf105f3327f02c3ca033d354_images.jpg\"}"
    ],
    "pg:fashion:7462",
    [
        "$",
        "{\"productId\":7462,\"price\":525,\"productDisplayName\":\"Proline Men Grey Printed T-shirt\",\"variantName\":\"PROLINE SS11/VS01 VNTGGMRL T shirt\",\"brandName\":\"proline\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Tshirts,Casual Wear and Clearance,Sale and Clearance,Casual Wear,Sale\",\"productColors\":\"Grey,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"Grey printed T-shirt, has a round neck, short sleeves\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/fd6027bd35ddb9dd5fbe262235df9ee5_images.jpg\"}"
    ],
    "pg:fashion:7479",
    [
        "$",
        "{\"productId\":7479,\"price\":399,\"productDisplayName\":\"Proline Men Black V-Neck T-shirt\",\"variantName\":\"PROLINE SS11/BEP7A BLK/WHT T shirt\",\"brandName\":\"proline\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Casual Wear,Sale\",\"productColors\":\"Black,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"Black T-shirt, has a V-neck, short sleeves\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/592b57f42c67cc2afd9e10d35da9ef11_images.jpg\"}"
    ],
    "pg:fashion:53781",
    [
        "$",
        "{\"productId\":53781,\"price\":1299,\"productDisplayName\":\"Puma Men Blue Sless Round Neck T-shirt\",\"variantName\":\"Sless Tee\",\"brandName\":\"puma\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Casual Wear,Sports Wear,Sale\",\"productColors\":\"Blue,NA\",\"season\":\"\",\"usage\":\"Sports\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"Blue solid T-shirt, has a round neck, sleeveless\",\"imageLink\":\"http://assets.myntassets.com/assets/images/53781/2017/8/1/11501582752754-Puma-Men-Tshirts-5881501582752475-1.jpg\"}"
    ],
    "pg:fashion:23872",
    [
        "$",
        "{\"productId\":23872,\"price\":1599,\"productDisplayName\":\"ADIDAS Men White Polo T-shirt\",\"variantName\":\"Solid\",\"brandName\":\"adidas\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Casual Wear,Sale\",\"productColors\":\"White,\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"<p>White polo T-shirt made of 100% polyester, has a ribbed collar with red tipping, short sleeves with ribbed cuffs and red tipping, adidas&nbsp; three patented stripes from the shoulder to the cuffs, buttoned chest placket, embroidered logo on left chest, brand tag on the left vented hem <br /></p>\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/14a309181573e426cb1e5f7377a0926d_images.jpg\"}"
    ],
    "pg:fashion:3065",
    [
        "$",
        "{\"productId\":3065,\"price\":399,\"productDisplayName\":\"Tantra Women Tiger Black T-shirt\",\"variantName\":\"Tantra Tiger Purple Womens Tee\",\"brandName\":\"tantra\",\"ageGroup\":\"Adults-Women\",\"gender\":\"women\",\"displayCategories\":\"Casual Wear,Sale\",\"productColors\":\"Black,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"<p style=\\\"text-align: justify;\\\"><strong>Composition</strong><br />Black printed round neck t-shirt in 100% cotton with chest print<br /></p>\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/Tantra-Women-Tiger-Purple-T-shirt_fea79c8db9b4d201ca5593662883e83e_images.jpg\"}"
    ],
    "pg:fashion:7443",
    [
        "$",
        "{\"productId\":7443,\"price\":399,\"productDisplayName\":\"Proline Men White Polo T-shirt\",\"variantName\":\"PROLINE SS11/BE53 SLVRGMRL T shirt\",\"brandName\":\"proline\",\"ageGroup\":\"Adults-Men\",\"gender\":\"men\",\"displayCategories\":\"Casual Wear,Sale\",\"productColors\":\"White,NA\",\"season\":\"Summer\",\"usage\":\"Casual\",\"masterCategoryType\":\"apparel\",\"subCategoryType\":\"topwear\",\"productDescription\":\"White polo T-shirt, has a polo collar, short button placket, short sleeves\",\"imageLink\":\"http://assets.myntassets.com/v1/images/style/properties/4ccc2e6d776645be5f17b439d17552a3_images.jpg\"}"
    ],
    //... so on
];
 */

interface PgResultTableProps {
    result: any[];
}

interface IHeader {
    key: string;
    text: string;
}

const formatResult = (_result: any[]) => {
    const jsonArr: any[] = [];

    if (_result?.length) {
        for (let i = 1; i < _result.length; i += 2) {
            const key = _result[i] as string;
            const value = _result[i + 1] as any[];

            if (value?.length) {
                const jsonPath = value[0];
                const jsonData = value[1];
                try {
                    const parsedData = JSON.parse(jsonData as string);
                    jsonArr.push({
                        key,
                        path: jsonPath,
                        ...parsedData
                    });
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
        }
    }
    return jsonArr;
};

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


const PgResultTable = ({ result }: PgResultTableProps) => {

    const [matchedCount, setMatchedCount] = useState(0);
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableHeaders, setTableHeaders] = useState<IHeader[]>([]);

    const { setQueryMatchLabel } = usePlaygroundContext();

    useEffect(() => {
        setQueryMatchLabel('NO RESULT FOUND');

        if (result?.length) {
            const mCount = result[0];
            setMatchedCount(mCount);

            const tData = formatResult(result);
            setTableData(tData);

            const headers = getTableHeaders(tData);
            setTableHeaders(headers);

            let fText = `TOTAL MATCHES: ${mCount}`;
            if (tData.length < mCount) {
                fText += ` (SHOWING FIRST ${tData.length} RESULTS)`;
            }
            setQueryMatchLabel(fText);
        }
    }, [result, setQueryMatchLabel]);


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
                        <tr key={item.id}>
                            <td key={`${item.id}-slNo`}>{index + 1}</td>

                            {tableHeaders.map((header) => (
                                <td key={`${item.id}-${header.key}`}>
                                    {item[header.key]?.toString() || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default PgResultTable;