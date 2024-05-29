import {FC, useState} from 'react';

import {Flex} from 'antd';

import {MOCK_QUESTIONS} from '@components/mock';
import Question from '@components/_question/Question';

interface IFeedProps {}

const Feed: FC<IFeedProps> = () => {
    const [feedState, setFeedState] = useState([]);

    const onResult = (items) => {
        setFeedState(feedState);
    };

    return (
        <Flex gap="middle" wrap align="center" justify="center">
            {MOCK_QUESTIONS.map((mockItem) => {
                return (
                    <Question
                        title={mockItem.title}
                        description={mockItem.description}
                        options={mockItem.options}
                        isMulti={mockItem.isMulti}
                        questionId={mockItem.id}
                        onResult={onResult}
                    />
                );
            })}
        </Flex>
    );
};

export default Feed;
