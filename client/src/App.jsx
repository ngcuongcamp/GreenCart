import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import AuthModal from './components/LoginForm';
import AllProductsPage from './pages/AllProductsPage';
import CategoryProductsPage from './pages/ProductsCategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsCategoryPage from './pages/ProductsCategoryPage';
import SingleProductPage from './pages/SingleProductPage';
import ScrollToTopButton from './components/ScrollToTop';
import CartPage from './pages/CartPage';

const App = () => {
  const isSellerPath = useLocation().pathname.startsWith('/seller');
  const { isShowUserLogin } = useAppContext()

  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {isShowUserLogin && <AuthModal />}

      <Toaster />

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/category/:categoryName" element={<ProductsCategoryPage />} />
          <Route path="/products/:category/:productId" element={<SingleProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
      <ScrollToTopButton />
    </div>
  )
}

export default App