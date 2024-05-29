import {createContext} from 'react';

import {QUESTION_MODEL} from '@models/Question';

export interface IProviderProps {
    questionsState: QUESTION_MODEL[];
    testResult: {};
    onNewQuestion: (newQuestion: QUESTION_MODEL) => Promise<void>;
}

export const MainContext = createContext({});