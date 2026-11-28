import { WordmarkApilado } from '../../brand/Wordmark';
import { EQUIPO, type Integrante } from '../../content/sitio';
import constanza from './img/constanza.jpg';
import josefina from './img/josefina.jpg';
import facundo from './img/facundo.jpg';
import valentino from './img/valentino.jpg';
import selloMagenta from './img/sello-magenta.png';
import selloNavy from './img/sello-navy.png';
import selloLima from './img/sello-lima.png';
import selloLavanda from './img/sello-lavanda.png';
import './nosotros.css';

const FOTOS: Record<string, string> = {
  Constanza: constanza,
  Josefina: josefina,
  Facundo: facundo,
  Valentino: valentino
};

const SELLOS: Record<Integrante['sello'], string> = {
  magenta: selloMagenta,
  navy: selloNavy,
  lima: selloLima,
  lavanda: selloLavanda
};

const clave = (nombre: string): string => nombre.toLowerCase();

/** "Nosotros": el estudio y el equipo, con las fotos encimadas como en Figma. */
export function Nosotros(): JSX.Element {
  return (
    <section className="nosotros" id="nosotros" aria-labelledby="nosotros-titulo">
      <div className="nosotros__texto">
        <p className="nosotros__etiqueta">Nosotros</p>
        <h2 id="nosotros-titulo" className="nosotros__titulo" aria-label="Somos tu estudio amigo">
          <span className="nosotros__liviano">Somos tu</span>{' '}
          <WordmarkApilado decorativo className="nosotros__marca nosotros__marca--centro" />
          <WordmarkApilado alineado="izquierda" decorativo className="nosotros__marca nosotros__marca--izquierda" />
        </h2>
        <p className="nosotros__bajada">
          Arrancamos en 2025 porque veíamos marcas con muchísima identidad que en redes no se veían
          como en la realidad. Hoy somos un equipo creativo que combina estrategia, diseño y
          comunicación, trabajando en conjunto con cada cliente para potenciar la identidad de su
          marca.
        </p>
      </div>

      <ul className="nosotros__equipo" aria-label="Equipo">
        {EQUIPO.map(persona => (
          <li key={persona.nombre} className={`nosotros__persona nosotros__persona--${clave(persona.nombre)}`}>
            <img
              src={FOTOS[persona.nombre]}
              alt={`${persona.nombre}, ${persona.rol.toLowerCase()}`}
              className="nosotros__foto"
              loading="lazy"
            />
            <img src={SELLOS[persona.sello]} alt="" className="nosotros__sello" loading="lazy" />
            <p className="nosotros__pie" aria-hidden="true">
              <strong className="nosotros__nombre">{persona.nombre}</strong>
              <span className="nosotros__rol">{persona.rol}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
