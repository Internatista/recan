import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType, useParams } from 'react-router-dom'
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
import { useStore, currencyStore } from './store'

function ScrollManager() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  useEffect(() => {
    if (type !== 'POP') window.scrollTo(0, 0)
  }, [pathname, type])
  return null
}

// Older Slovak addresses redirect to the English ones.
function OldOrderRedirect() {
  const { id } = useParams()
  return <Navigate to={`/order/${id}`} replace />
}

function AppRedirect() {
  useEffect(() => {
    window.location.replace('/app/')
  }, [])
  return null
}

function App() {
  // re-render the whole site when the currency changes
  useStore(currencyStore)
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#obsah">
        Skip to content
      </a>
      <Header />
      <main id="obsah">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/bundle" element={<BundlePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/story" element={<Story />} />
          <Route path="/refill" element={<Refill />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/app" element={<AppRedirect />} />
          <Route path="/trojbalicek" element={<Navigate to="/bundle" replace />} />
          <Route path="/pribeh" element={<Navigate to="/story" replace />} />
          <Route path="/objednavka/:id" element={<OldOrderRedirect />} />
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
