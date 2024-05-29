import {memo, Suspense, useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoutesProps, routeConfig} from '@router/config/routeConfig';
import {Spin} from 'antd';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<Spin />}>{route.element}</Suspense>;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
