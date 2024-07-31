import React, { FC } from 'react'
interface Params {
    post: string;
}
const page: React.FC<{ params: Params }> = ({ params }) => {
    return (
        <div>Post: {params.post}</div>
    );
};

export default page;