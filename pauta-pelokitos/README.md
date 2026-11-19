# Pauta Pelokitos · tablero

Vive en `/pauta-pelokitos/` del mismo sitio de GitHub Pages que la web del estudio: `https://facugm.github.io/estudio-amigo/pauta-pelokitos/`.

Tablero interno con los datos de Meta Ads de Pelokitos (Argentina, Uruguay y USA), leídos directo de la Marketing API. Así no dependemos del cooldown de Windsor.

## Cómo funciona

```
GitHub Actions · .github/workflows/deploy.yml (cada 15 min, en cada push o "Actualizar ahora")
  ├─ npm run build → la web del estudio en dist/
  └─ pauta-pelokitos/scripts/fetch.mjs → dist/pauta-pelokitos/ → Insights API (nivel anuncio, por día, últimos 60 días)
       └─ cifra los datos (AES-256-GCM, clave derivada de DASHBOARD_PASSWORD)
            └─ se publica todo junto como artifact de Pages
Navegador → pide la contraseña → descifra con WebCrypto → muestra el tablero
```

- El token de Meta solo vive en GitHub Secrets. No aparece en el sitio ni en el repo.
- El sitio y el repo son públicos, pero los números viajan cifrados. Sin la contraseña no se lee nada.
- Los datos no se commitean: se suben como artifact de Pages, así el historial del repo queda limpio.

## Puesta en marcha

### 1. Token de Meta

Hay dos formas de conseguirlo. Conviene la A, pero la B sirve para arrancar hoy.

**A. System User (no vence)**
1. En business.facebook.com → Configuración → Usuarios → Personas, revisá que tengas **Control total** (admin) en el Business Manager donde están las cuentas publicitarias. Si las cuentas son de Pelokitos y el estudio tiene acceso como socio, podés hacerlo desde el Business Manager del estudio.
2. En developers.facebook.com, creá una app de tipo **Business** y agregale el producto **Marketing API**.
3. En el Business Manager → Usuarios → **Usuarios del sistema**, creá uno (rol Empleado alcanza).
4. Asignale las tres cuentas publicitarias con permiso de ver rendimiento, y la app.
5. Hacé clic en **Generar token**, elegí la app y tildá `ads_read`. Copiá el token.

**B. Token de usuario de larga duración (vence a los ~60 días)**
1. Con la cuenta de Facebook de Coti, que ya tiene acceso a las cuentas (por eso le anda Windsor), entrá al Graph API Explorer, elegí la app y pedí `ads_read`.
2. Cambiá el token por uno de larga duración (`/oauth/access_token?grant_type=fb_exchange_token…`) o usá el Access Token Debugger → "Extend".
3. Agendá renovarlo antes de que venza. Cuando vence, el workflow sale en rojo y el tablero muestra "revisar el workflow".

Para probarlo: `curl "https://graph.facebook.com/v26.0/me/adaccounts?fields=name,currency&access_token=TOKEN"` tiene que listar las cuentas de Pelokitos.

### 2. Cuentas

Las cuentas están en `config.json`, en formato `act_<id>`. Las cargué con las que estaban seleccionadas en Windsor:

| País | Cuenta | ID |
|---|---|---|
| Argentina | Pelokitos.ar | 4023363421012141 |
| Uruguay | Pelokitos Uruguay | 1759274621921767 |
| USA | Pelokitos USA | 1085024901167295 |

En Windsor también aparecen **Pelokitos Argentina** (291061325564676) y **Pelokitos usa** (866890720519262). Si alguna de esas tiene campañas activas, sumala al array `accounts` de su país: el tablero las agrega juntas.

`purchaseAction` es el evento que contamos como **turno confirmado** (`offsite_conversion.fb_pixel_purchase`, el mismo que "Website Purchases" en Windsor). Antes de usarlo, comparalo un día contra Ads Manager. En el tablero, en "Eventos del píxel en el período", aparecen todos los eventos que devuelve Meta, por si los pasos del turnero se trackean con eventos personalizados.

### 3. GitHub Pages

1. En Settings → Pages → Source, elegí **GitHub Actions**. Antes se publicaba desde la rama `gh-pages`; ahora la web y el tablero salen del mismo workflow, sin commits de datos.
2. En Settings → Secrets and variables → Actions, cargá:
   - `META_TOKEN`: el token del paso 1
   - `DASHBOARD_PASSWORD`: la contraseña del equipo (larga, 16 caracteres o más)
3. En Actions → "Deploy to GitHub Pages", tocá **Run workflow**. En 2 o 3 minutos quedan la web en `/` y el tablero en `/pauta-pelokitos/`.

Si Meta falla (por ejemplo, porque venció el token), la web se publica igual. En las corridas programadas no se publica nada y queda online la última versión buena; en un push o a mano, el tablero conserva los datos anteriores. En los dos casos, el workflow lo marca.

### 4. Botón "Actualizar ahora"

Cada persona del equipo lo configura una sola vez:
1. En GitHub → Settings → Developer settings → **Fine-grained tokens**, generá un token con acceso **solo a este repo** y el permiso **Actions: Read and write**.
2. En el tablero, entrá a **Ajustes** y pegalo. Se guarda únicamente en ese navegador.

Al tocar el botón se dispara el workflow. El tablero se recarga solo cuando llegan los datos nuevos, en 1 a 3 minutos. Para eso hace falta que la persona tenga acceso al repo (colaboradora).

## Probar sin token

Desde la raíz del repo:

```bash
DASHBOARD_PASSWORD=prueba node pauta-pelokitos/scripts/mock.mjs
npx serve pauta-pelokitos/dist        # o: python3 -m http.server -d pauta-pelokitos/dist
```

Con datos reales: `META_TOKEN=… DASHBOARD_PASSWORD=… node pauta-pelokitos/scripts/fetch.mjs`.

Usa datos inventados con la misma forma que los reales. La contraseña es `prueba`.

## Cosas a tener en cuenta

- **Frescura:** el cron corre cada 15 minutos, pero GitHub puede demorarlo un rato cuando tiene mucha carga. Además, Meta tarda en consolidar algunas conversiones. Para datos en vivo de verdad, el siguiente paso es un proxy en Cloudflare Workers con el mismo front.
- **Atribución:** se usa `use_unified_attribution_setting=true`, la misma atribución que muestra Ads Manager.
- **Monedas:** cada país se ve por separado, en su moneda. Nunca se suman entre sí.
- **Si cambia la contraseña:** actualizá el secret y corré el workflow. Quien la tenía guardada en el navegador la vuelve a escribir.
- **Versión de la API:** está fijada en `config.json` (`v26.0`). Meta saca una versión nueva cada pocos meses y mantiene cada una alrededor de dos años.
- **Keepalive:** GitHub apaga los crons de repos con 60 días sin commits. `.github/workflows/keepalive.yml` deja un commit chiquito una vez por mes en `pauta-pelokitos/.keepalive`.
- **Minutos de Actions:** cada corrida instala y compila la web (alrededor de 1 minuto). En un repo público no consume cuota.
