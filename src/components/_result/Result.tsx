import {FC, useContext} from 'react';
import {Card, Flex} from 'antd';

import {MainContext} from '@context/Context';
import {TEXT_RESULT} from '@consts';

const Result: FC = () => {
    const {testResult} = useContext(MainContext);

    return (
        <Card
            title="Результаты"
            bordered={true}
            style={{width: '100%'}}
        >
            <Flex
                gap="middle"
                wrap={true}
                align="center"
                justify="center"
                vertical={true}
            >
                {TEXT_RESULT.split('\n')
                    .filter(Boolean)
                    .map((el) => {
                        return <div>{el}</div>;
                    })}
            </Flex>
        </Card>
    );
};

export default Result;
