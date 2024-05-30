import {useContext} from 'react';
import './App.css';

import AppRouter from '@router/AppRouter';
import Menu from '@components/_menu/Menu';
import {MainContext} from '@context/Context';

import {App as AntApp, ConfigProvider} from 'antd';

function App() {
    const {themeAlgorithm} = useContext(MainContext);

    return (
        <ConfigProvider theme={themeAlgorithm}>
            <AntApp>
                <Menu />
                <AppRouter></AppRouter>
            </AntApp>
        </ConfigProvider>
    );
}

export default App;
