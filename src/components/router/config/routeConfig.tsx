import { RouteProps } from 'react-router-dom';

import NotFoundPage from '@components/NotFoundPage';
import Main from '@components/_main/Main';
import Feed from '@components/_feed/Feed';
import Neuro from '@components/_neuro/Neuro';
import Result from '@components/_result/Result';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: string[];
}

export enum AppRoutes {
    MAIN = 'main',
    NEURO = 'neuro',
    SURVEY = 'survey',
    RESULT = 'result',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NEURO]: '/neuro',
    [AppRoutes.SURVEY]: '/survey',
    [AppRoutes.RESULT]: '/result',
    // последний
    [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Main />,
    },
    [AppRoutes.SURVEY]: {
      path: RoutePath.survey,
      element: <Feed />
    },
    [AppRoutes.NEURO]: {
        path: RoutePath.neuro,
        element: <Neuro />
    },
    [AppRoutes.RESULT]: {
        path: RoutePath.result,
        element: <Result />
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    }
};