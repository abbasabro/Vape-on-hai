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
import { Toaster } from 'sonner';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
        <Toaster position="top-center" theme="dark" closeButton />
        <Navbar />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:id" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Login />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
