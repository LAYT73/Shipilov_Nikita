import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { HomePage, NotFoundPage } from '@/pages';

const Routing: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<></>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default Routing;
