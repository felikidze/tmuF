import {useState, FC, useLayoutEffect} from 'react';
import {default as axios} from 'axios';

import {QUESTION_MODEL, RESPONSE_QUESTION_MODEL, CONTEXT_DTO} from '@models/Question';
import {MainContext, IProviderProps} from './Context';

export const ContextProvider: FC = (props) => {
    const [questionsState, setQuestionsState] = useState<QUESTION_MODEL[]>([]);
    const [testResult, setTestResult] = useState()

    useLayoutEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://192.168.1.108:8888/getStartQuestions');

            setQuestionsState(result.data);
        };

        fetchData();
    }, []);

    const onNewQuestion = async (newQuestion: QUESTION_MODEL) => {
        const newState = questionsState.map((questionItem) => {
            if (questionItem.id === newQuestion.id) {
                return newQuestion;
            }

            return questionItem;
        });

        setQuestionsState(newState);

        const dto: CONTEXT_DTO[] = newState.map((item) => ({
            questionId: item.id,
            answersIds: item.selected!
        }));

        const result = await axios.post<RESPONSE_QUESTION_MODEL[]>('http://192.168.1.108:8888/getQuestions', dto);

        const resultState = result.data.map((resultItem) => {
            const intersectedItem = newState.find((processedItem) => processedItem.id === resultItem.id);

            if (Array.isArray(intersectedItem?.selected)) {
                resultItem.selected = intersectedItem?.selected;
            }

            return resultItem;
        });

        if (resultState.every((item) => Array.isArray(item.selected))) {
            const result = await axios.post<RESPONSE_QUESTION_MODEL[]>('http://192.168.1.108:8888/getQuestions', dto);
        } else {
            setQuestionsState(resultState);
        }
    };

    const providerProps: IProviderProps = {
        questionsState,
        testResult,
        onNewQuestion
    };

    return <MainContext.Provider value={providerProps}>{props.children}</MainContext.Provider>;
};
