import {FC} from 'react';
import {Progress as AntProgress} from 'antd';

interface IProgressProps {

}

const Progress: FC<IProgressProps> = () => {
    return (
        <>
            <AntProgress type="circle" percent={100} />
        </>
    );
};

export default Progress;