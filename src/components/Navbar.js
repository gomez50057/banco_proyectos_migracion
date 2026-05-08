'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset;
      setVisible(current < scrollPosition || current < 10);
      setScrollPosition(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // cierra el menú al navegar
    }
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const navClass = [
    styles.navbar,
    visible ? styles.active : styles.hidden,
    scrollPosition > 100 ? styles.scrolled : '',
  ].join(' ');

  return (
    <nav className={navClass}>
      <div className={styles.navInner}>
        <div className={styles.logo}>
          <img
            src="https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/Logotipo.webp"
            alt="Logo"
          />
        </div>

        {/* Botón hamburguesa sólo en móvil */}
        <button className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`${styles.navOptions} ${menuOpen ? styles.open : ''}`}>
          <li className={styles.navItem}>
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, 'about')}
              className={styles.navLink}
            >
              Sobre el Proyecto
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className={styles.navLink}
            >
              Tablero de Proyectos
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#howitWorks"
              onClick={(e) => handleScrollTo(e, 'howitWorks')}
              className={styles.navLink}
            >
              Cómo Funciona
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#map"
              onClick={(e) => handleScrollTo(e, 'map')}
              className={styles.navLink}
            >
              Mapa Interactivo
            </a>
          </li>
          <li className={styles.navItem}>
            <Link href="/login" className={styles.buttonAcceder}>
              Acceder
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
