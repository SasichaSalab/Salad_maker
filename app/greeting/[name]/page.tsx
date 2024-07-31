import React, { FC } from 'react'
interface Params {
    name: string;
}
const page: React.FC<{ params: Params }> = ({ params }) => {
    return (
        <div>greeting {params.name}</div>
    );
};

export default page;