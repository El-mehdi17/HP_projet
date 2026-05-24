import { NavLink } from "react-router-dom";
import "./css/Accuile.css";
import { useState, useEffect } from "react";
import Produits from "./Produits";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
export default function Accuile() {

  const [slide, setSlide] = useState(0);

  const images = Object.values(
    import.meta.glob("./images/Acceuil/*.{png,jpg,jpeg,webp}", {
      eager: true,
    })
  ).map((m) => m.default);

  useEffect(() => {

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);

  }, [images.length]);

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setSlide((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
     <>
    <section className="black">

      {/* Images */}
      <div className="img_black">

        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={slide === index ? "slide active" : "slide"}
          />
        ))}

      </div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="text_black">

         <h3>Qui sommes-nous ?</h3>

        <p>
          Notre société est dédiée à offrir des solutions complètes pour vos besoins informatiques.
          Spécialisés dans la vente, l'achat et la réparation de pièces PC telles que les claviers,
          cartes mères et autres composants essentiels, nous garantissons des produits fiables
          et un service professionnel. Que vous soyez particulier ou entreprise, nous mettons
          notre expertise à votre disposition pour assurer performance, qualité et satisfaction.
        </p>

        <div className="hero_buttons">

          <NavLink to="/inscription">
            <button className="btn_primary">
              Inscription
            </button>
          </NavLink>

          <NavLink to="/Connexion">
            <button className="btn_secondary">
              Connexion
            </button>
          </NavLink>

        </div>

      </div>

      {/* Controls */}
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>

      <button className="next" onClick={nextSlide}>
        ❯
      </button>

      {/* Dots */}
      <div className="dots">

        {images.map((_, index) => (
          <span
            key={index}
            className={slide === index ? "dot active_dot" : "dot"}
            onClick={() => setSlide(index)}
          ></span>
        ))}

      </div>

    </section>
    <Produits combien={2} />
    <Services />
    <Contact />
    <Footer />
   </>
  );
}
