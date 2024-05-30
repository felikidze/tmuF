import {createContext} from 'react';

import {QUESTION_MODEL} from '@models/Question';
import {theme} from 'antd';

interface IThemeAlgorithm {
    algorithm: theme.defaultAlgorithm | theme.darkAlgorithm
}

export interface IProviderProps {
    questionsState?: QUESTION_MODEL[];
    testResult?: {};
    themeAlgorithm?: IThemeAlgorithm;
    onSwitchTheme?: () => void;
    onNewQuestion?: (newQuestion: QUESTION_MODEL) => Promise<void>;
}

export const MainContext = createContext<IProviderProps>({});