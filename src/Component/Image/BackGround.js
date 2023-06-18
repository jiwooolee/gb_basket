import React from 'react';

import { Image } from "antd";

const BackGround = ({ width, preview, src }) => {

    return (
        <Image width={width}
               preview={preview}
               src={`${process.env.PUBLIC_URL}/Image/${src}`}
        />
    );
};

export default BackGround;