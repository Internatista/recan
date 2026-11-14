import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import '@fontsource/titan-one/400.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import './styles.css'
import { Header, Footer, Toast, NotFound } from './components/ui'
import Home from './pages/Home'
import { Shop, Product, BundlePage } from './pages/Shop'
import { Cart, Checkout, OrderConfirmation } from './pages/Cart'
import { Blog, Article } from './pages/Blog'
import { Story, Refill } from './pages/Info'
import Admin from './pages/Admin'

function ScrollManager() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  useEffect(() => {
    if (type !== 'POP') window.scrollTo(0, 0)
  }, [pathname, type])
  return null
}

function AppRedirect() {
  useEffect(() => {
    window.location.replace('/app/')
  }, [])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#obsah">
        Preskočiť na obsah
      </a>
      <Header />
      <main id="obsah">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/trojbalicek" element={<BundlePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/objednavka/:id" element={<OrderConfirmation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/pribeh" element={<Story />} />
          <Route path="/refill" element={<Refill />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/app" element={<AppRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
