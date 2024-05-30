import {useState, FC, useLayoutEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {animateScroll} from 'react-scroll';
import {theme} from 'antd';

import {QUESTION_MODEL, RESPONSE_QUESTION_MODEL, CONTEXT_DTO} from '@models/Question';
import {API} from '@/api';
import {RoutePath} from '@router/config/routeConfig';
import {MainContext, IProviderProps} from './Context';

export const ContextProvider: FC = (props) => {
    const [questionsState, setQuestionsState] = useState<QUESTION_MODEL[]>([]);
    const [testResult, setTestResult] = useState();
    const [themeAlgorithm, setThemeAlgorithm] = useState({algorithm: theme.defaultAlgorithm});

    const navigate = useNavigate();

    useLayoutEffect(() => {
        const fetchData = async () => {
            const result = await API.get('getStartQuestions');

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

        const result = await API.post<RESPONSE_QUESTION_MODEL[]>('getQuestions', dto);

        const resultState = result.data.map((resultItem) => {
            const intersectedItem = newState.find((processedItem) => processedItem.id === resultItem.id);

            if (Array.isArray(intersectedItem?.selected)) {
                resultItem.selected = intersectedItem?.selected;
            }

            return resultItem;
        });

        if (resultState.every((item) => Array.isArray(item.selected))) {
            const testResult = await API.post<RESPONSE_QUESTION_MODEL[]>('getResult', dto);
            setTestResult(testResult.data);
            setTimeout(() => {
                navigate(RoutePath.result);
            })
        } else {
            setQuestionsState(resultState);
        }

        if (resultState.length !== newState.length) {
            setTimeout(() => {
                animateScroll.scrollToBottom({
                    smooth: true
                });
            }, 0);
        }
    };

    const onSwitchTheme = () => {
        setThemeAlgorithm((p) =>
            p.algorithm === theme.defaultAlgorithm
                ? {algorithm: theme.darkAlgorithm}
                : {algorithm: theme.defaultAlgorithm}
        );
    };

    const providerProps: IProviderProps = {
        questionsState,
        testResult,
        themeAlgorithm,
        onSwitchTheme,
        onNewQuestion
    };

    return <MainContext.Provider value={providerProps}>{props.children}</MainContext.Provider>;
};
