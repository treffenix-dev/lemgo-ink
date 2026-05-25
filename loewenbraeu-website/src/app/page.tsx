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
    setCartOpen(true);
  }

  function handleChangeQty(name: string, delta: number) {
    setCartItems((prev) => changeQty(prev, name, delta));
  }

  const count = cartCount(cartItems);

  return (
    <>
      <Nav cartCount={count} />

      <main>
        <Hero />

        <hr className="border-none border-t border-border max-w-5xl mx-auto" />
        <MenuSection />

        <hr className="border-none border-t border-border max-w-5xl mx-auto" />
        <OrderSection onAdd={handleAdd} />

        <hr className="border-none border-t border-border max-w-5xl mx-auto" />
        <About />

        <Gallery />

        <Reviews />

        <Reservation />

        <hr className="border-none border-t border-border max-w-5xl mx-auto" />
        <Contact />

        <footer className="border-t border-border px-[5%] py-8 flex flex-wrap justify-between items-center gap-4">
          <span className="font-display text-gold text-base">Münchener Löwenbräu</span>
          <p className="text-[0.75rem] text-muted">Mittelstraße 144 · 32657 Lemgo · 05261 4267</p>
          <p className="text-[0.7rem] text-muted">Impressum · Datenschutz</p>
        </footer>
      </main>

      {/* Floating cart button */}
      {count > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-gold text-bg w-14 h-14 flex items-center justify-center text-xl shadow-2xl hover:bg-gold-lt transition-colors"
          aria-label="Warenkorb öffnen"
        >
          🛒
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[0.62rem] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        </button>
      )}

      {/* Demo badge */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-gold/90 text-bg text-[0.68rem] font-medium tracking-[0.1em] uppercase px-5 py-2 shadow-xl whitespace-nowrap pointer-events-none">
        ✦ Demo-Entwurf — Noch kein eigener Webauftritt vorhanden
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
