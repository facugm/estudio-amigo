import { Isotype } from '../../brand/Isotype';
import { EQUIPO } from '../../content/sitio';
import './nosotros.css';

/** "Nosotros": el estudio y el equipo. */
export function Nosotros(): JSX.Element {
  return (
    <section className="nosotros" id="nosotros" aria-labelledby="nosotros-titulo">
      <div className="nosotros__texto">
        <p className="nosotros__etiqueta">Nosotros</p>
        <h2 id="nosotros-titulo" className="nosotros__titulo">
          <span className="nosotros__liviano">Somos tu</span> estudio amigo.
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
          <li key={persona.nombre} className="nosotros__persona">
            <span className="nosotros__avatar">
              {persona.foto ? (
                <img src={persona.foto} alt="" className="nosotros__foto" loading="lazy" />
              ) : (
                <Isotype className={`nosotros__amigo nosotros__amigo--${persona.color}`} />
              )}
            </span>
            <strong className="nosotros__nombre">{persona.nombre}</strong>
            <span className="nosotros__rol">{persona.rol}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
