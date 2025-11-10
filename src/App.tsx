// src/App.tsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// === 컴포넌트 경로는 네 프로젝트 구조에 맞게 조정 ===
import Navbar from "./pages/Navbar";
import Slider from "./pages/Slider";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ProductOptionModal from "./pages/ProductOptionModal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import OrderConfirm from "./pages/OrderConfirm";
import OrderComplete from "./pages/OrderComplete";
import OrderList from "./pages/OrderList";
import Wishlist from "./pages/WishList";

// 에셋
import thumb1 from "./assets/thumbnails/thumbnail_1.webp";
import thumb2 from "./assets/thumbnails/thumbnail_2.webp";
import thumb3 from "./assets/thumbnails/thumbnail_3.webp";
import thumb4 from "./assets/thumbnails/thumbnail_4.webp";
import slides1 from "./assets/slides/slides_1.png";
import slides2 from "./assets/slides/slides_2.png";
import slides3 from "./assets/slides/slides_3.png";

// ---- 타입 ----
import { Product, CartItem } from "./types/Product"; 

function AppContent() {
  const navigate = useNavigate();

  const products: Product[] = [
    { id: 1, brand: "웰터 익스페리먼트", name: "THERMOTRAIL LIGHTWEIGHT PERTEX DOWN JACKET", price: 338000, salePrice: 270400, image: thumb1 },
    { id: 2, brand: "머렐", name: "[UNISEX] WINTER MOC 3 GUNSMOKE", price: 179000, image: thumb3 },
    { id: 3, brand: "렙", name: "써러스 울트라 후디 Black", price: 210000, image: thumb2 },
    { id: 4, brand: "아이더", name: "퀀텀 에너지쉴드 Z (Z1)_Black", price: 179000, salePrice: 69000, image: thumb4 },
    { id: 5, brand: "웰터 익스페리먼트", name: "THERMOTRAIL LIGHTWEIGHT PERTEX DOWN JACKET", price: 338000, salePrice: 270400, image: thumb1 },
    { id: 6, brand: "렙", name: "써러스 울트라 후디 Black", price: 210000, image: thumb2 },
    { id: 7, brand: "머렐", name: "[UNISEX] WINTER MOC 3 GUNSMOKE", price: 179000, image: thumb3 },
    { id: 8, brand: "아이더", name: "퀀텀 에너지쉴드 Z (Z1)_Black", price: 179000, salePrice: 69000, image: thumb4 },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 장바구니 담기
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const found = prev.find(
        (i) =>
          String(i.id) === String(item.id) &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
      );
      if (found) {
        return prev.map((i) =>
          String(i.id) === String(item.id) &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item }];
    });
  };

  const increaseQuantity = (id: CartItem["id"], color: string, size: string) => {
    setCartItems((prev) =>
      prev.map((i) =>
        String(i.id) === String(id) && i.selectedColor === color && i.selectedSize === size
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQuantity = (id: CartItem["id"], color: string, size: string) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          String(i.id) === String(id) && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id: CartItem["id"], color: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(
            String(i.id) === String(id) &&
            i.selectedColor === color &&
            i.selectedSize === size
          )
      )
    );
  };

  const handleLogin = () => navigate("/login");

  return (
    <>
      <Navbar cartCount={cartItems.length} onLogin={handleLogin} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="mx-auto max-w-screen-lg px-4">
              <section className="my-4">
                {/* Slider.tsx는 images만 받도록 만들었으니 props 간단화 */}
                <Slider images={[slides1, slides2, slides3]} />
              </section>

              <section className="mb-8">
                <ProductList
                  products={products}
                  // 카드의 “장바구니 담기” 클릭 시 옵션 모달 오픈
                  addToCart={(p) => setSelectedProduct(p)}
                />
              </section>
            </main>
          }
        />

        <Route
          path="/products/:id"
          element={<ProductDetail products={products} onAdd={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          }
        />

        <Route path="/order-confirm" element={<OrderConfirm cartItems={cartItems} />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/orders" element={<OrderList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      {selectedProduct && (
        <ProductOptionModal
          product={selectedProduct}
          onAdd={addToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
