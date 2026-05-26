"use client";
import { useState } from "react";
import { Nav }           from "@/components/Nav";
import { Hero }          from "@/components/Hero";
import { MenuSection }   from "@/components/MenuSection";
import { OrderSection }  from "@/components/OrderSection";
import { Cart }          from "@/components/Cart";
import { About }         from "@/components/About";
import { Gallery }       from "@/components/Gallery";
import { Reviews }       from "@/components/Reviews";
import { Reservation }   from "@/components/Reservation";
import { Contact }       from "@/components/Contact";
import { addItem, changeQty, cartCount, CartItem } from "@/lib/cart";

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen]   = useState(false);

  function handleAdd(name: string, price: number) {
    setCartItems((prev) => addItem(prev, name, price));
  }

  function handleChangeQty(name: string, delta: number) {
    setCartItems((prev) => changeQty(prev, name, delta));
  }

  const count = cartCount(cartItems);

  return (
    <>
      <Nav />

      <main>
        <Hero />

        <div className="border-t border-border" />
        <MenuSection />

        <div className="border-t border-border" />
        <OrderSection onAdd={handleAdd} items={cartItems} onChangeQty={handleChangeQty} />

        <div className="border-t border-border" />
        <About />

        <div className="border-t border-border" />
        <Gallery />

        <div className="border-t border-border" />
        <Reviews />

        <div className="border-t border-border" />
        <Reservation />

        <div className="border-t border-border" />
        <Contact />

        <footer className="border-t border-border px-[5%] py-10 flex flex-wrap justify-between items-center gap-4">
          <span className="font-display font-light text-[1.1rem] text-cream tracking-[0.12em]">Münchener Löwenbräu</span>
          <p className="font-sans text-[0.68rem] text-muted tracking-[0.1em]">Mittelstraße 144 · 32657 Lemgo · 05261 4267</p>
          <p className="font-sans text-[0.62rem] text-muted/50 flex gap-4">
            <a href="/impressum" className="hover:text-cream transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-cream transition-colors">Datenschutz</a>
          </p>
        </footer>
      </main>

      {count > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 border border-gold/50 text-cream bg-surface w-14 h-14 flex items-center justify-center text-lg shadow-2xl hover:border-gold hover:text-gold-lt transition-all duration-200"
          aria-label="Warenkorb öffnen"
        >
          🛒
          <span className="absolute -top-1.5 -right-1.5 bg-navy text-cream font-sans text-[0.58rem] font-medium w-5 h-5 rounded-full flex items-center justify-center border border-border">
            {count}
          </span>
        </button>
      )}

      {/* Demo banner */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-surface/95 border border-border text-cream font-sans text-[0.62rem] tracking-[0.12em] uppercase px-6 py-2.5 shadow-xl whitespace-nowrap pointer-events-none">
        Demo-Entwurf · Noch kein eigener Webauftritt
      </div>

      <Cart
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onChangeQty={handleChangeQty}
        onClear={() => setCartItems([])}
      />
    </>
  );
}
