import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import AppRouter from '@router/AppRouter';
import Menu from '@components/_menu/Menu';

import {App as AntApp, ConfigProvider} from 'antd';

function App() {
    const [count, setCount] = useState(0);

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
