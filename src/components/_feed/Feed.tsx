import {FC, useContext, useState} from 'react';

import {Flex} from 'antd';

import {MOCK_QUESTIONS} from '@components/mock';
import Question from '@components/_question/Question';
import {MainContext, IProviderProps} from '@context/Context';

interface IFeedProps {}

const Feed: FC<IFeedProps> = () => {
    const {questionsState, onNewQuestion} = useContext<IProviderProps>(MainContext);

    return (
        <Flex
            gap="middle"
            wrap={true}
            align="center"
            justify="center"
            vertical={true}
        >
            {questionsState?.map((questionItem) => {
                return (
                    <Question
                        key={`${questionItem.id}-${questionItem.selected}`}
                        question={questionItem}
                        onNewQuestion={onNewQuestion}
                    />
                );
            })}
        </Flex>
    );
};

export default Feed;
