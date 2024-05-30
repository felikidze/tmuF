import {FC, useContext} from 'react';
import {Card, Flex, Descriptions} from 'antd';

import {MainContext} from '@context/Context';
import {TEXT_RESULT, TABLE_DESCRIPTION} from '@consts';

const Result: FC = () => {
    const {testResult} = useContext(MainContext);
    // @ts-ignore
    const finalTable = TABLE_DESCRIPTION?.filter((el) => testResult?.[el.key+''] > 0);

    return (
        <>
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
            <Descriptions title="Вероятность рака" items={finalTable}/>
        </>
    );
};

export default Result;
