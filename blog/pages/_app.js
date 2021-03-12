import App from 'next/app'
import dynamic from 'next/dynamic'
import 'antd/dist/antd.css'
dynamic(
    import('lib-flexible'),
    {ssr: false}
);
export default App
