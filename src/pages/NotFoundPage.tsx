import { Link } from 'react-router-dom';
// import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Search } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            {/* <Header /> */}
            <main className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <Search className="mx-auto h-24 w-24 text-ion-blue mb-4" />
                    <h1 className="text-6xl font-extrabold text-black mb-2">404</h1>
                    <p className="text-2xl font-semibold text-gray-700 mb-6">Oops! Page Not Found</p>
                    <p className="text-gray-500 mb-8">It seems like the page you are looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.</p>
                    <Link to="/"
                        className="px-6 py-3 bg-fusion-pink text-white font-bold rounded-lg hover:bg-opacity-90 transition-all"
                    >
                        Go back home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
