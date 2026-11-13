import { CLIENTES, type Cliente } from '../../content/sitio';
import './clientes.css';

function Logo({ cliente }: { cliente: Cliente }): JSX.Element {
  return (
    <li className="clientes__logo">
      {cliente.logo ? (
        <img src={cliente.logo} alt={cliente.nombre} className="clientes__img" loading="lazy" />
      ) : (
        <span className="clientes__nombre">{cliente.nombre}</span>
      )}
    </li>
  );
}

/**
 * "Algunas marcas con las que trabajamos".
 * En celu la fila se mueve sola (carrusel infinito); en desktop queda quieta, como en Figma.
 */
export function Clientes(): JSX.Element {
  return (
    <section className="clientes" id="clientes" aria-labelledby="clientes-titulo">
      <h2 id="clientes-titulo" className="clientes__titulo">
        Algunas marcas con las que trabajamos
      </h2>
      <div className="clientes__ventana">
        <ul className="clientes__pista">
          {CLIENTES.map(c => (
            <Logo key={c.nombre} cliente={c} />
          ))}
        </ul>
        {/* Copia para que el carrusel no tenga corte; los lectores de pantalla la ignoran. */}
        <ul className="clientes__pista clientes__pista--copia" aria-hidden="true">
          {CLIENTES.map(c => (
            <Logo key={c.nombre} cliente={c} />
          ))}
        </ul>
      </div>
    </section>
  );
}
