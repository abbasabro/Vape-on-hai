import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import WhatsAppButton from './components/WhatsAppButton';
import { CartProvider } from './components/CartProvider';
import { WishlistProvider } from './components/WishlistProvider';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'motion/react';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

export default function App() {
  const location = useLocation();
  

  return (
    <CartProvider>
       <WishlistProvider>
      <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
        <Toaster position="top-center" theme="dark" closeButton />
        <Navbar />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Login />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
      </WishlistProvider>
</CartProvider>
  );
}
