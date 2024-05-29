import { RouteProps } from 'react-router-dom';

import NotFoundPage from '@components/NotFoundPage';
import Main from '@components/_main/Main';
import Feed from '@components/_feed/Feed';
import Neuro from '@components/_neuro/Neuro';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: string[];
}

export enum AppRoutes {
    MAIN = 'main',
    NEURO = 'neuro',
    FEED = 'feed',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NEURO]: '/neuro',
    [AppRoutes.FEED]: '/feed',
    // последний
    [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes.MAIN|AppRoutes.NOT_FOUND, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Main />,
    },
    [AppRoutes.FEED]: {
      path: RoutePath.feed,
      element: <Feed />
    },
    [AppRoutes.NEURO]: {
        path: RoutePath.neuro,
        element: <Neuro />
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    }
};