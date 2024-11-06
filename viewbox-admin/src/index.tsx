import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/snackbar';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/locale';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <SnackbarUtilsConfigurator />
      <ConfigProvider locale={ru_RU}>
        <App />
      </ConfigProvider>
    </SnackbarProvider>
  </Provider>
);
