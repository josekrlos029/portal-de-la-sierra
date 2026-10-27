# Investigación de mercados: cómo se venden lotes campestres fuera de Colombia

Fecha: 2026-10-26. Fuentes: anuncios y portales públicos, que muestran cómo comunica el mercado. No son datos de transacciones.

## Lo que se repite en los proyectos exitosos
| Mercado | Ejemplos revisados | Cómo se vende | Qué aplicamos |
|---|---|---|---|
| **EE. UU.** (homesites) | Fichas de lote de constructores (Shea Homes "homesite 107"), herramientas de site plan interactivo (Zonda, Anewgo, LotVue, LotWorks) | Mapa con **disponibilidad en vivo**, ficha por lote con precio, CTA "Request a tour" desde el plano, fecha "availability as of" y descargo de responsabilidad | Masterplan 3D con ficha y CTA, **"Availability as of"** en el disclaimer, precio por lote en USD aproximado |
| **Costa Rica** (comprador de EE. UU.) | Encuentra24: lotes en condominio en Escazú y Orotina, "boutique gated community" | *Exclusive community where nature, comfort and security come together*; precio por lote en US$; se menciona la cuota HOA | Jerga *gated community*, *homesites*, precio por lote en US$ |
| **Brasil** | Terras Alpha 2 (GO), condominio de 36 lotes en Niterói, lotes en Vicente Pires (DF) | **Portaria 24h**, controle de acesso, câmeras, **área de lazer** (piscina, espaço gourmet, quiosque), "apenas X lotes", valorização, infraestrutura completa | Jerga pt-BR: *condomínio fechado de lotes*, *portaria 24h*, *área de lazer*, *apenas 27 lotes* |
| **Portugal** | Comporta (Brejos da Carregueira), condominio SAMA con 16 villas | *Lote de terreno para construção de moradia*, **projeto aprovado / PIP**, área bruta de construção, condomínio privado | Pendiente si se abre pt-PT: destacar normas de construcción y licencias |

## Palabras clave por mercado (para title, H2 y FAQ)
- **ES-CO**: lotes campestres Valledupar · condominio campestre · lotes en venta Valledupar · vía Sabana Crespo · lote 800 m² · conjunto cerrado.
- **EN-US**: lots for sale Colombia · gated community Colombia · homesites · buy land in Colombia · country estate lots · Sierra Nevada de Santa Marta · can foreigners buy property in Colombia.
- **PT-BR**: lotes em condomínio fechado · terreno na Colômbia · loteamento · comprar terreno na Colômbia · portaria 24h · área de lazer · investir em terra.

## Hallazgos para la estrategia
1. **Casi nadie respalda la "valorización" con datos.** Nos diferenciamos con datos verificables (27.333 m², cota de 276–288 m, cuadro de coordenadas, modelo 3D sobre el levantamiento). Ese tipo de dato es el que citan los motores de IA (GEO).
2. **El comprador extranjero pregunta lo mismo en todos los mercados**: si puede comprar, cómo pagar desde el exterior, si puede conocer el proyecto a distancia y si hay cuota de administración. Las tres primeras ya están en la FAQ. La **cuota de administración (HOA / taxa de condomínio)** falta, porque no tenemos el dato.
3. **En Brasil** también preguntan por *matrícula individual*, *infraestrutura* (agua, energía, alumbrado) y *financiamento*. Conviene añadirlo a la FAQ cuando el cliente confirme los datos.
4. **El mapa interactivo es el estándar en EE. UU.**, y nuestro 3D está por encima de ese estándar. Mantenerlo actualizado (`estados` en `src/config.json`) es clave para la confianza.

## Datos que faltan del cliente (subirían conversión y AEO)
- Cuota de administración mensual estimada.
- Servicios disponibles: agua, energía, alumbrado, internet.
- Formas de pago y financiación (cuotas, separación).
- Tiempo en carro hasta Valledupar y el aeropuerto.
- Si los asesores atienden en inglés o portugués.

## Fuentes
- https://www.encuentra24.com/costa-rica-en/real-estate-for-sale-lots-land/
- https://www.dfimoveis.com.br/imovel?id=1307241 (Terras Alpha 2)
- https://www.zapimoveis.com.br/imovel/venda-terreno-lote-condominio-badu-niteroi-rj-1000m2-id-2859692063/
- https://supercasa.pt/comprar-terrenos/alcacer-do-sal/comporta
- https://www.idealista.pt/news/taxonomy/term/59114 (SAMA, Comporta)
- https://zondahome.com/digital-solutions/interactive-site-map-bundle
- https://anewgo.com/communities
- https://www.sheahomes.com/new-homes/california/bay-area/seaside/the-enclave/homesite-107
- https://mapatlas.eu/blog/real-estate-listing-pages-ai-search (schema para listings)
- TRM: https://www.portafolio.co/economia/finanzas/precio-del-dolar-hoy-en-colombia-la-divisa-inicia-cerca-de-3-160-este-21-de-octubre-504832
