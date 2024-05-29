import './App.css';

import AppRouter from '@router/AppRouter';
import Menu from '@components/_menu/Menu';

import {App as AntApp, ConfigProvider} from 'antd';

function App() {
    return (
        <ConfigProvider>
            <AntApp>
                <Menu/>
                <AppRouter>
                </AppRouter>
            </AntApp>
        </ConfigProvider>
    );
}

export default App;
