import serverHttp from '../httpClient';

export const performance = () => serverHttp.get('https://fe-task.getsandbox.com/performance').then((response) => response.data);
