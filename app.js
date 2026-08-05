/* =========================================================
   VELAS STUDIO — app.js
   Vanilla JS. All state persisted to localStorage.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     STORAGE KEYS
     --------------------------------------------------------- */
  const LS_KEYS = {
    welcomed: "vs_welcomed",
    checklistProduccion: "vs_checklist_produccion",
    checklistVenta: "vs_checklist_venta",
    lastScreen: "vs_last_screen",
  };

  /* ---------------------------------------------------------
     CONTENT DATA
     --------------------------------------------------------- */
  const CHECKLIST_PRODUCCION = [
    "Moldes limpios",
    "Cera pesada",
    "Fragancia preparada",
    "Colorante listo",
    "Temperatura correcta",
    "Recipientes preparados",
    "Etiquetas listas",
  ];

  const CHECKLIST_VENTA = [
    "Fotos con buena luz",
    "Precio calculado",
    "Empaque revisado",
    "Descripción del producto lista",
    "Publicación programada",
    "Método de pago definido",
  ];

  const TIPS = [
    { title: "Elegí el pabilo correcto", body: "Un pabilo muy fino deja la vela con un pozo de cera sin quemar; uno muy grueso genera humo y una llama inestable. Hacé pruebas pequeñas antes de producir en volumen." },
    { title: "Menos fragancia es más", body: "Superar el porcentaje recomendado por el fabricante no intensifica el aroma en frío, y puede afectar la combustión. Respetá siempre la ficha técnica de tu esencia." },
    { title: "Fotografiá con luz natural", body: "La luz de ventana, sin flash directo, resalta la textura de la cera y los colores reales. Es la forma más simple de mejorar tus fotos de producto sin invertir en equipo." },
    { title: "Cobrá tu tiempo, no solo los materiales", body: "El precio de una vela no es solo la suma de insumos: tu tiempo de preparación, curado y empaque también tiene valor. Usá la calculadora para no subestimarlo." },
    { title: "Llevá un registro simple", body: "Anotar qué combinaciones de cera, pabilo y fragancia funcionaron mejor te ahorra tiempo en cada nueva producción y te ayuda a mantener la consistencia." },
  ];

  const FAQ = [
    { q: "¿Cuánto dura el curado de una vela?", a: "Depende del tipo de cera: la de soja suele necesitar entre 24 y 72 horas, mientras que otras ceras pueden requerir hasta dos semanas para liberar todo su aroma." },
    { q: "¿Por qué mi vela se hunde en el centro?", a: "Es normal en ceras de soja por la contracción al enfriar. Un segundo vertido fino sobre la superficie, una vez fría la primera capa, corrige el acabado." },
    { q: "¿Cómo elijo el precio de venta?", a: "Sumá todos tus costos de producción, agregá el margen que buscás obtener y usá la calculadora de esta app para automatizar el cálculo por unidad." },
    { q: "¿Qué recipientes puedo reutilizar?", a: "Vidrios sin grietas que resistan calor son ideales. Limpiá bien los restos de cera anterior con agua caliente antes de reutilizarlos." },
    { q: "¿Necesito colorante para vender bien?", a: "No es obligatorio. Muchas marcas artesanales destacan justamente por el color natural de la cera; el colorante es una decisión estética, no técnica." },
  ];

  const SAFETY = [
    "Nunca dejes la cera derritiéndose sin supervisión.",
    "Usá guantes y protegé la superficie de trabajo del calor.",
    "Mantené el área ventilada mientras trabajás con fragancias.",
    "Ten siempre un extintor o manta ignífuga cerca de tu zona de trabajo.",
    "No viertas cera caliente por el desagüe: dejala enfriar y desechala en sólidos.",
    "Etiquetá tus velas con advertencias de uso para tus clientes.",
  ];

  const QUOTES = [
    "Cada vela que enciendes es una pequeña prueba de que tu constancia se nota.",
    "Lo artesanal no compite en velocidad, compite en detalle.",
    "Un buen producto se construye repitiendo el mismo cuidado, una y otra vez.",
    "Tu taller de hoy es el negocio que estás construyendo para mañana.",
    "La consistencia en tus procesos es lo que tus clientes reconocerán como calidad.",
    "Cada lote que curás con paciencia mejora el siguiente.",
  ];

  /* ---------------------------------------------------------
     INSPIRACIÓN — datos y contenido práctico
     Usa exclusivamente fotografías reales (assets/inspiracion/),
     sin ilustraciones ni iconos generados. Cada categoría tiene
     una fotografía de referencia y 3 tarjetas de consulta rápida,
     cada una respondiendo una sola pregunta concreta.
     --------------------------------------------------------- */
  const INSPIRATION = [
    {
      id: "aromaticas",
      label: "Velas aromáticas",
      image: "assets/inspiracion/vela_aromatica.jpg",
      cards: [
        {
          title: "¿Qué porcentaje de esencia utilizar?",
          intro: "El porcentaje de fragancia (fragrance load) determina qué tan intenso es el aroma sin comprometer la combustión. La mayoría de las esencias para velas recomiendan entre 6% y 10% del peso total de la cera, aunque varía según el tipo de cera y el fabricante.",
          sections: [
            {
              heading: "Pasos",
              type: "steps",
              items: [
                "Pesa la cera derretida antes de agregar la fragancia.",
                "Calcula el porcentaje según la ficha técnica del proveedor (ejemplo: 8% sobre 500 g de cera = 40 g de esencia).",
                "Agrega la fragancia con la cera entre 60°C y 70°C, salvo que el proveedor indique otra temperatura.",
                "Mezcla durante al menos 2 minutos para integrar bien el aroma.",
                "Haz siempre una vela de prueba antes de producir en volumen.",
              ],
            },
            {
              heading: "Errores frecuentes",
              type: "list",
              items: [
                "Superar el 10% no intensifica el aroma en frío; genera exceso de aceite que puede filtrarse (sweating) y afectar la combustión.",
                "Agregar la fragancia con la cera demasiado caliente evapora parte del aroma.",
                "Medir \"a ojo\" en lugar de pesar genera inconsistencia entre lotes.",
              ],
            },
            {
              heading: "Ejemplos reales",
              type: "list",
              items: [
                "Cera de soja + esencia sintética: 8% es un punto de partida seguro para la mayoría de las marcas.",
                "Cera de coco-soja: suele tolerar hasta 10% sin sweating.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Registra porcentaje, temperatura y proveedor de cada lote para poder repetir tus mejores resultados.",
                "Si el aroma en frío es débil pero en caliente es fuerte, el problema casi siempre es el porcentaje o el pabilo, no la cantidad de fragancia.",
              ],
            },
          ],
        },
        {
          title: "¿Cuánto tiempo debe curar una vela?",
          intro: "El curado es el tiempo de reposo después de verter la vela, necesario para que la fragancia se una completamente a la cera y el aroma en frío alcance su máxima intensidad.",
          sections: [
            {
              heading: "Tiempos de curado",
              type: "list",
              items: [
                "Cera de soja: mínimo 3 días, ideal 7 a 14 días.",
                "Cera de parafina: mínimo 24 a 48 horas, ideal 3 a 5 días.",
                "Cera de coco o mezclas: 5 a 10 días recomendado.",
              ],
            },
            {
              heading: "Qué sucede si se vende antes del curado",
              type: "list",
              items: [
                "El aroma en frío es mucho más débil que el real, aunque la vela esté bien hecha.",
                "El cliente puede pensar que \"no tira olor\" y dejar una mala reseña sin que sea un problema de calidad.",
                "Algunas fragancias necesitan más tiempo para completar la unión química con la cera; venderla antes es la causa más común de reclamos por poco aroma.",
              ],
            },
            {
              heading: "Checklist antes de vender",
              type: "checklist",
              items: [
                "Pasaron al menos los días mínimos de curado según el tipo de cera.",
                "Se probó el aroma en frío, con la vela apagada, antes de despachar.",
                "Se etiquetó la fecha de fabricación para llevar control de lotes.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Marca la fecha de vertido en la base de cada vela con un código simple para no perder el control del lote.",
                "Si tienes pedidos urgentes, produce con anticipación en lugar de acortar el curado.",
              ],
            },
          ],
        },
        {
          title: "5 mezclas aromáticas recomendadas",
          intro: "Combinar dos fragancias diferencia tu catálogo, siempre que elijas combinaciones ya probadas y sepas para qué cliente funciona cada una.",
          sections: [
            {
              heading: "Mezclas y para qué cliente funcionan",
              type: "list",
              items: [
                "Lavanda + Vainilla — para quien busca relajación y ambientes de descanso (dormitorio, spa en casa). Perfil floral suave con fondo dulce.",
                "Canela + Naranja — para regalos de temporada otoño/invierno. Perfil cálido y especiado, muy popular como obsequio.",
                "Jazmín + Sándalo — para un público que busca un aroma sofisticado, floral-amaderado. Funciona bien en línea premium.",
                "Menta + Eucalipto — para quien busca frescura y sensación de limpieza (baños, oficinas, espacios de estudio).",
                "Vainilla + Coco — perfil gourmand-tropical, muy vendido en primavera-verano y como regalo de cumpleaños.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Al mezclar dos fragancias, empieza probando en proporción 70/30 antes de llegar a 50/50; rara vez ambas notas funcionan igual de fuerte.",
                "Documenta cada combinación con el porcentaje exacto de cada esencia para poder repetirla.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "decorativas",
      label: "Velas decorativas",
      image: "assets/inspiracion/vela_minimalista.jpg",
      cards: [
        {
          title: "¿Qué moldes generan mayor valor percibido?",
          intro: "El molde influye más en el precio que puedes cobrar que el color o la fragancia, porque comunica trabajo manual y diseño diferenciado.",
          sections: [
            {
              heading: "Opciones con mayor percepción de valor",
              type: "list",
              items: [
                "Moldes geométricos con relieve (facetados, ondulados): dan sensación de producto de diseño, no artesanal casero.",
                "Moldes de silicona con textura orgánica (piedra, madera, ondas): funcionan bien en decoración de interiores.",
                "Moldes con capas o degradado de color: requieren más pasos de producción, lo que justifica un precio mayor.",
                "Formas no convencionales o esculturales: se venden como pieza decorativa, no solo como vela, lo que permite un precio más alto.",
              ],
            },
            {
              heading: "Ejemplos reales",
              type: "list",
              items: [
                "Una vela cilíndrica lisa se percibe como básica; la misma cera en un molde ondulado tipo pilar tallado puede venderse al doble de precio.",
                "Las velas con textura de piedra o mármol se posicionan bien en decoración minimalista.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Antes de invertir en un molde nuevo, valida la demanda vendiendo una muestra o publicando fotos del prototipo.",
                "Los moldes con relieve profundo necesitan cera con buena memoria de forma (dura) para no perder detalle al desmoldar.",
              ],
            },
          ],
        },
        {
          title: "¿Qué colores son los más vendidos durante todo el año?",
          intro: "Además de los colores de temporada, existen colores base que se venden todo el año porque combinan con cualquier decoración.",
          sections: [
            {
              heading: "Los más vendidos todo el año",
              type: "list",
              items: [
                "Blanco o crudo: el más vendido en general, combina con cualquier ambiente.",
                "Beige o arena: tendencia sostenida en decoración minimalista.",
                "Verde salvia: se mantiene fuerte todo el año, no solo en Navidad.",
                "Terracota u óxido: color de temporada que se volvió permanente en catálogos de decoración.",
                "Negro mate: nicho, pero con buen margen; apunta a un cliente que busca diseño moderno.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Si tienes un catálogo reducido, prioriza blanco o crudo y un color de temporada rotativo.",
                "Los colores neutros tienen menor riesgo de quedar en stock sin vender fuera de temporada.",
              ],
            },
          ],
        },
        {
          title: "¿Cómo evitar que las velas se rompan al desmoldarlas?",
          intro: "La rotura al desmoldar suele deberse a la temperatura, el tipo de cera o el tiempo de enfriamiento, no al molde en sí.",
          sections: [
            {
              heading: "Pasos",
              type: "steps",
              items: [
                "Deja enfriar la vela a temperatura ambiente entre 12 y 24 horas antes de desmoldar. Nunca uses el refrigerador para acelerar el proceso: genera grietas.",
                "Si usas moldes de silicona, retíralos despacio estirando el borde en lugar de tirar de golpe.",
                "Si usas moldes rígidos de policarbonato o metal, pasa el molde por agua tibia unos segundos para aflojar la cera.",
                "Verifica que la cera esté completamente sólida al tacto en el centro, no solo en la superficie.",
              ],
            },
            {
              heading: "Checklist antes de desmoldar",
              type: "checklist",
              items: [
                "Pasaron al menos 12 horas desde el vertido.",
                "La vela está fría al tacto en el centro, no solo en el borde.",
                "El molde no tiene rebabas ni cera pegada en los bordes.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Si una fórmula se rompe siempre en el mismo molde, la cera suele ser demasiado dura para ese diseño; prueba una mezcla con más aditivo flexible.",
                "Aplica una capa muy fina de spray desmoldante en moldes rígidos con mucho detalle.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "premium",
      label: "Velas premium",
      image: "assets/inspiracion/vela_premium.jpg",
      cards: [
        {
          title: "¿Qué recipientes hacen que una vela parezca de lujo?",
          intro: "El recipiente comunica valor antes de que el cliente perciba el aroma o la calidad de la cera, así que es donde más impacta la primera impresión.",
          sections: [
            {
              heading: "Elementos que elevan la percepción",
              type: "list",
              items: [
                "Vidrio grueso y con peso, no vidrio fino ni liviano: transmite calidad al tacto.",
                "Tapas de madera, metal o cerámica en lugar de plástico.",
                "Vidrio de color sólido o esmerilado (mate) en vez de transparente básico.",
                "Acabados metálicos, dorado o cobre, en el borde o la tapa.",
              ],
            },
            {
              heading: "Ejemplos reales",
              type: "list",
              items: [
                "Un frasco transparente simple se percibe como casero; el mismo contenido en un vidrio con tapa de madera y etiqueta minimalista se percibe como de marca.",
                "Los recipientes reutilizables agregan valor percibido porque el cliente los ve como una compra de largo plazo, no descartable.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Calcula siempre el costo del recipiente premium dentro de tu precio final; no absorbas ese costo para competir en precio.",
                "Un recipiente de buena calidad reduce devoluciones por rotura en el envío.",
              ],
            },
          ],
        },
        {
          title: "¿Cómo diseñar una etiqueta elegante?",
          intro: "Una etiqueta premium se distingue por lo que no tiene: exceso de texto, colores saturados o tipografías genéricas.",
          sections: [
            {
              heading: "Pasos",
              type: "steps",
              items: [
                "Usa máximo dos tipografías: una para el nombre de la vela y otra para los datos técnicos.",
                "Deja espacio en blanco alrededor del texto; no llenes toda la etiqueta.",
                "Incluye solo la información esencial: nombre, aroma, peso o volumen y tu marca.",
                "Elige una paleta de máximo dos o tres colores, coherente con tu identidad de marca.",
                "Usa papel mate, textura o detalles en dorado o plata si el presupuesto lo permite.",
              ],
            },
            {
              heading: "Ejemplos reales",
              type: "list",
              items: [
                "Las etiquetas minimalistas con solo el nombre en tipografía serif y un marco delgado funcionan mejor en catálogos premium que las etiquetas con muchas imágenes.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Prueba la etiqueta impresa sobre el recipiente real antes de imprimir en volumen: los colores cambian según el fondo del vidrio.",
                "Incluye la información de seguridad básica sin que domine visualmente la etiqueta.",
              ],
            },
          ],
        },
        {
          title: "¿Cómo calcular un precio premium sin perder competitividad?",
          intro: "Un precio premium no es cobrar más porque sí: se sostiene en costos reales más altos y en una propuesta de valor clara.",
          sections: [
            {
              heading: "Pasos",
              type: "steps",
              items: [
                "Calcula tu costo real total: cera, fragancia, recipiente, etiqueta, empaque y tiempo de trabajo.",
                "Compara tu recipiente y presentación con la competencia directa en tu mismo segmento, no con velas básicas.",
                "Aplica un margen de 2.5x a 3.5x sobre el costo total para posicionarte como premium, en lugar del margen de 1.5x a 2x típico de líneas básicas.",
                "Justifica el precio con al menos un elemento diferencial visible: recipiente reutilizable, packaging, ingredientes o edición limitada.",
              ],
            },
            {
              heading: "Ejemplo real",
              type: "list",
              items: [
                "Si el costo total de una vela es $5, una línea básica la vendería entre $7.50 y $10. Una línea premium con mejor presentación puede venderse entre $12.50 y $17.50 sin perder competitividad, siempre que el valor percibido lo respalde.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "No compitas en precio con tu propia línea básica; diferencia claramente nombre, empaque y descripción de cada línea para que el cliente entienda por qué paga más.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "florales",
      label: "Velas florales",
      image: "assets/inspiracion/vela_floral.jpg",
      cards: [
        {
          title: "¿Qué flores pueden utilizarse de forma segura?",
          intro: "No todas las flores son seguras en contacto con cera caliente o cerca de la llama: algunas se decoloran y otras representan riesgo de combustión si quedan muy cerca del pabilo.",
          sections: [
            {
              heading: "Flores recomendadas (secas o prensadas)",
              type: "list",
              items: [
                "Lavanda seca.",
                "Pétalos de rosa secos.",
                "Flor de manzanilla seca.",
                "Botones de gypsophila (\"flor de bebé\").",
                "Caléndula seca.",
              ],
            },
            {
              heading: "Pasos para usarlas de forma segura",
              type: "steps",
              items: [
                "Usa siempre flores completamente secas o prensadas, nunca frescas: la humedad genera moho dentro de la cera.",
                "Coloca las flores únicamente en el borde exterior de la vela, nunca cerca del pabilo.",
                "Deja al menos 1.5 a 2 cm de distancia entre cualquier flor y el pabilo.",
                "Si decoras toda la superficie, aplica una capa fina de cera transparente encima para sellar las flores y evitar que se quemen al encender la vela.",
              ],
            },
            {
              heading: "Checklist antes de decorar",
              type: "checklist",
              items: [
                "Las flores están completamente secas, sin humedad.",
                "Hay al menos 1.5 cm de distancia entre la flor y el pabilo.",
                "Se aplicó una capa de sellado si las flores están cerca de la superficie de combustión.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Evita flores frescas o con alto contenido de aceite natural: pueden decolorarse o generar puntos calientes al quemarse.",
              ],
            },
          ],
        },
        {
          title: "¿Qué combinaciones de colores transmiten elegancia?",
          intro: "En velas florales, la elegancia depende más del contraste controlado que de la cantidad de colores.",
          sections: [
            {
              heading: "Combinaciones recomendadas",
              type: "list",
              items: [
                "Blanco + lavanda + un toque de verde seco: combinación clásica, funciona en cualquier temporada.",
                "Terracota + flores secas en tonos mostaza y marrón: da un look otoñal sofisticado.",
                "Rosa pálido + blanco + dorado (hilo o pigmento): ideal para regalos y ocasiones especiales.",
                "Verde salvia + flores blancas: combinación neutra que se vende bien todo el año.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Limita la paleta a dos colores de flor más un color de cera; más que eso genera un efecto recargado en lugar de elegante.",
                "El fondo de cera debe ser un color neutro o muy suave para que las flores sean el punto focal.",
              ],
            },
          ],
        },
        {
          title: "¿Cómo evitar que las flores se quemen o se deterioren?",
          intro: "Las flores decorativas se dañan por tres causas principales: exposición directa a la llama, exceso de calor durante el vertido y falta de sellado.",
          sections: [
            {
              heading: "Pasos",
              type: "steps",
              items: [
                "Nunca coloques flores en el centro de la vela ni cerca del pabilo.",
                "Vierte la cera de sellado a una temperatura más baja de lo habitual, alrededor de 55°C a 60°C, para no decolorar las flores al cubrirlas.",
                "Aplica la capa de sellado en dos pasadas finas en lugar de una capa gruesa: reduce el riesgo de que la flor se mueva o se hunda.",
                "Guarda las velas terminadas lejos de la luz solar directa: la luz decolora las flores secas con el tiempo, incluso sin encender la vela.",
              ],
            },
            {
              heading: "Checklist de control de calidad",
              type: "checklist",
              items: [
                "Ninguna flor está a menos de 1.5 cm del pabilo.",
                "La capa de sellado cubre completamente la flor sin dejar aire atrapado.",
                "La vela terminada se almacena lejos de la luz solar directa.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Si las flores se oscurecen rápido después de selladas, baja aún más la temperatura de la cera de sellado en el siguiente lote.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "navidenas",
      label: "Velas navideñas",
      image: "assets/inspiracion/velas_navideñas_1.jpg",
      cards: [
        {
          title: "¿Cuándo comenzar la producción para la temporada navideña?",
          intro: "La temporada navideña concentra gran parte de las ventas anuales de velas decorativas y de regalo, por lo que conviene planificar la producción con varios meses de anticipación para evitar quiebres de stock.",
          sections: [
            {
              heading: "Calendario sugerido",
              type: "steps",
              items: [
                "Agosto: define tu catálogo navideño (aromas, moldes, colores) y haz pedidos de insumos especiales.",
                "Septiembre: comienza la producción de las líneas que más rotación tuvieron el año anterior.",
                "Octubre: producción a ritmo constante; ten stock de al menos el 40% de tu proyección de ventas navideñas.",
                "Primeras dos semanas de noviembre: refuerza producción antes del inicio de campañas de fin de año.",
                "Primeras dos semanas de diciembre: últimos pedidos personalizados con tiempo suficiente de entrega. Después de mediados de mes, vende solo el stock disponible.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Si vendes piezas personalizadas, define una fecha límite de pedidos al menos 10 a 15 días antes de Navidad y comunícala con claridad.",
                "Registra qué aromas y diseños se agotaron primero el año anterior: es tu mejor referencia para decidir cuánto producir.",
              ],
            },
          ],
        },
        {
          title: "¿Cuáles son los aromas más vendidos en Navidad y por qué?",
          intro: "Los aromas navideños más vendidos apelan a recuerdos y tradiciones (comida, árbol, especias), por eso funcionan mejor que fragancias florales o cítricas puras en esta temporada.",
          sections: [
            {
              heading: "Los más vendidos",
              type: "list",
              items: [
                "Pino o abeto: asociado directamente al árbol de Navidad; es el aroma navideño más buscado.",
                "Canela + naranja: evoca postres y bebidas típicas de la época; funciona muy bien en regalos.",
                "Vainilla + especias (nuez moscada, clavo): perfil cálido tipo galletas horneadas, muy vendido para el hogar.",
                "Pino + bayas rojas: combina el árbol con un toque frutal y diferencia tu catálogo del pino genérico.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Ofrece al menos un aroma seguro (pino o vainilla con especias) y uno diferencial (pino con bayas) para cubrir distintos gustos sin ampliar demasiado el catálogo.",
              ],
            },
          ],
        },
        {
          title: "¿Cómo crear un kit de regalo premium?",
          intro: "Un kit de regalo bien armado permite cobrar más que la suma de sus partes, porque el cliente paga por la experiencia de regalar algo ya resuelto.",
          sections: [
            {
              heading: "Elementos del kit y costo aproximado",
              type: "list",
              items: [
                "Caja rígida o de cartón con diseño navideño: aproximadamente $1.50 a $3.00.",
                "Cinta de raso o tela, no plástica: aproximadamente $0.50 a $1.00.",
                "Etiqueta o sello personalizado con el nombre de tu marca: aproximadamente $0.30 a $0.60.",
                "Tarjeta de mensaje con espacio para escribir a mano: aproximadamente $0.20 a $0.40.",
                "Relleno decorativo, como viruta de papel o ramas secas: aproximadamente $0.30 a $0.50.",
                "Costo total aproximado del empaque: entre $2.80 y $5.50, adicional al costo de la vela.",
              ],
            },
            {
              heading: "Pasos para armar el kit",
              type: "steps",
              items: [
                "Coloca la vela centrada en la caja, con relleno decorativo alrededor para que no se mueva.",
                "Cierra con la cinta formando un moño simple; evita moños muy elaborados que se deshacen en el transporte.",
                "Coloca la etiqueta de marca en un lugar visible pero no invasivo: esquina de la caja o atada a la cinta.",
                "Incluye la tarjeta de mensaje dentro o atada externamente, según el estilo de tu marca.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Cobra el kit como un producto aparte en tu lista de precios; el empaque premium es una razón válida para aumentar el precio final.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "regalo",
      label: "Velas para regalo",
      image: "assets/inspiracion/vela_de_regalo.jpg",
      cards: [
        {
          title: "¿Cómo presentar una vela para que parezca un regalo premium?",
          intro: "La presentación se construye en capas: lo que se ve primero por fuera, lo que se descubre al abrir y el detalle final del mensaje.",
          sections: [
            {
              heading: "Pasos",
              type: "steps",
              items: [
                "Elige un empaque exterior con textura, como caja mate, papel kraft o tela, en lugar de plástico transparente básico.",
                "Usa un solo color o máximo dos como hilo conductor de todo el empaque: caja, cinta y etiqueta.",
                "Agrega un elemento táctil, como cinta de tela, cordón natural o sello de cera.",
                "Incluye siempre una tarjeta o mensaje, aunque sea pequeño: es lo que transforma un producto en un regalo.",
                "Cierra el empaque de forma que el cliente tenga que abrirlo, en lugar de dejar la vela a la vista de entrada: genera una mejor experiencia de unboxing.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Fotografía el empaque cerrado y abierto por separado para mostrar la experiencia completa en tu catálogo o redes.",
              ],
            },
          ],
        },
        {
          title: "Mensaje de agradecimiento listo para copiar y entregar al cliente",
          intro: "Un mensaje de agradecimiento bien escrito refuerza la relación con el cliente y aumenta la probabilidad de que vuelva a comprar o te recomiende.",
          sections: [
            {
              heading: "Mensaje completo",
              type: "quote",
              items: [
                "Gracias por elegir [Nombre de tu marca]. Esta vela fue hecha a mano pensando en cada detalle, desde la mezcla del aroma hasta el momento en que la enciendas por primera vez. Espero que disfrutes cada minuto de luz que te regale. Si te gustó, me encantaría que lo compartieras con alguien más. ¡Gracias por apoyar un proyecto hecho con dedicación!",
              ],
            },
            {
              heading: "Versión corta (tarjetas pequeñas)",
              type: "quote",
              items: [
                "Gracias por tu compra. Esta vela fue hecha a mano especialmente para ti. Espero que la disfrutes tanto como yo disfruté crearla.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Personaliza el mensaje con el nombre del cliente cuando sea posible; aumenta de forma notable la percepción de cuidado.",
                "Ten ambas versiones listas, larga y corta, según el tamaño de tarjeta que uses.",
              ],
            },
          ],
        },
        {
          title: "¿Cómo aumentar el valor percibido sin aumentar mucho el costo?",
          intro: "El valor percibido depende más de los detalles visibles y la narrativa que del costo real de producción; hay ajustes de bajo costo que generan un salto grande en percepción.",
          sections: [
            {
              heading: "Acciones de bajo costo y alto impacto",
              type: "steps",
              items: [
                "Agrega una etiqueta con el nombre del aroma en tipografía cuidada, en lugar de solo un sticker genérico.",
                "Incluye una pequeña tarjeta con instrucciones de cuidado, como \"corta el pabilo a 0.5 cm antes de cada uso\": comunica profesionalismo sin costo relevante.",
                "Usa un color de cinta o hilo consistente con tu marca en todos los pedidos, en lugar de variar según lo que tengas disponible.",
                "Sella el empaque con un detalle simple, como un sello de cera o un sticker con tu logo, en el punto de cierre.",
                "Cuenta una historia breve del producto en la etiqueta o tarjeta, como el ingrediente principal o la inspiración del aroma: agrega valor emocional sin costo de producción.",
              ],
            },
            {
              heading: "Tips",
              type: "tips",
              items: [
                "Antes de subir precios, revisa primero si puedes mejorar la percepción con estos ajustes de bajo costo; muchas veces el problema no es el producto sino cómo se presenta.",
              ],
            },
          ],
        },
      ],
    },
  ];

  /* ---------------------------------------------------------
     STORAGE HELPERS
     --------------------------------------------------------- */
  function lsGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function lsSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable, fail silently */
    }
  }

  /* ---------------------------------------------------------
     TOAST
     --------------------------------------------------------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  }

  /* ---------------------------------------------------------
     CONFIRM MODAL
     --------------------------------------------------------- */
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  let modalResolve = null;

  function confirmDialog(title, text) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalOverlay.hidden = false;
    return new Promise((resolve) => {
      modalResolve = resolve;
    });
  }
  modalConfirmBtn.addEventListener("click", () => {
    modalOverlay.hidden = true;
    if (modalResolve) modalResolve(true);
  });
  modalCancelBtn.addEventListener("click", () => {
    modalOverlay.hidden = true;
    if (modalResolve) modalResolve(false);
  });
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.hidden = true;
      if (modalResolve) modalResolve(false);
    }
  });

  /* ---------------------------------------------------------
     WELCOME SCREEN
     --------------------------------------------------------- */
  const welcomeScreen = document.getElementById("welcome-screen");
  const appRoot = document.getElementById("app");
  const welcomeStartBtn = document.getElementById("welcome-start-btn");

  function initWelcome() {
    const welcomed = lsGet(LS_KEYS.welcomed, false);
    if (welcomed) {
      dismissWelcome({ animate: false });
    } else {
      welcomeScreen.hidden = false;
      appRoot.hidden = true;
    }
  }

  function dismissWelcome(opts) {
    opts = opts || {};
    // Belt-and-braces removal: the hidden attribute alone isn't enough if any
    // rule sets display on this element, so we also force display:none inline
    // and finally drop the node from the DOM entirely once any transition ends.
    welcomeScreen.hidden = true;
    welcomeScreen.style.display = "none";
    if (welcomeScreen.parentNode) {
      welcomeScreen.parentNode.removeChild(welcomeScreen);
    }
    appRoot.hidden = false;
    // Guarantee the app opens pinned to the very top, with no leftover scroll offset.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  welcomeStartBtn.addEventListener("click", () => {
    lsSet(LS_KEYS.welcomed, true);
    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transform = "translateY(-8px)";
    welcomeScreen.style.transition = "all 0.35s ease";
    setTimeout(() => dismissWelcome({ animate: true }), 320);
  });

  /* ---------------------------------------------------------
     NAVIGATION
     --------------------------------------------------------- */
  const screens = Array.from(document.querySelectorAll(".screen"));
  const navItems = Array.from(document.querySelectorAll(".nav-item"));

  function goToScreen(name, opts) {
    opts = opts || {};
    screens.forEach((s) => {
      s.hidden = s.dataset.screen !== name;
    });
    navItems.forEach((n) => {
      n.classList.toggle("is-active", n.dataset.nav === name);
    });
    lsSet(LS_KEYS.lastScreen, name);
    window.scrollTo(0, 0);

    if (name === "produccion" && opts.tab) {
      setProduccionTab(opts.tab);
    }
    if (name === "mas" && opts.tab) {
      setMasTab(opts.tab);
    }
  }

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => goToScreen(btn.dataset.nav));
  });

  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.classList.contains("nav-item")) return; // already bound
    el.addEventListener("click", () => {
      goToScreen(el.dataset.nav, { tab: el.dataset.tab });
    });
  });

  document.getElementById("home-progress-teaser").addEventListener("click", () => goToScreen("produccion"));

  /* ---------------------------------------------------------
     GREETING + MOTIVATIONAL QUOTE (Inicio)
     --------------------------------------------------------- */
  function setGreeting() {
    const hour = new Date().getHours();
    const el = document.getElementById("inicio-greeting-time");
    let text = "Buenas noches";
    if (hour < 12) text = "Buenos días";
    else if (hour < 19) text = "Buenas tardes";
    el.textContent = text;
  }

  function setDailyQuote() {
    const dayIndex = Math.floor(Date.now() / 86400000) % QUOTES.length;
    document.getElementById("motivational-quote").textContent = QUOTES[dayIndex];
  }

  /* ---------------------------------------------------------
     CALCULADORA
     --------------------------------------------------------- */
  const calcForm = document.getElementById("calc-form");
  const calcResetBtn = document.getElementById("calc-reset-btn");
  const calcResults = document.getElementById("calc-results");

  const calcInputs = {
    cera: document.getElementById("calc-cera"),
    esencia: document.getElementById("calc-esencia"),
    recipiente: document.getElementById("calc-recipiente"),
    pabilo: document.getElementById("calc-pabilo"),
    otros: document.getElementById("calc-otros"),
    cantidad: document.getElementById("calc-cantidad"),
    margen: document.getElementById("calc-margen"),
  };

  function money(n) {
    if (!isFinite(n)) n = 0;
    return "$" + n.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cera = parseFloat(calcInputs.cera.value) || 0;
    const esencia = parseFloat(calcInputs.esencia.value) || 0;
    const recipiente = parseFloat(calcInputs.recipiente.value) || 0;
    const pabilo = parseFloat(calcInputs.pabilo.value) || 0;
    const otros = parseFloat(calcInputs.otros.value) || 0;
    const cantidad = Math.max(1, parseFloat(calcInputs.cantidad.value) || 1);
    const margen = Math.max(0, parseFloat(calcInputs.margen.value) || 0);

    const costoTotal = cera + esencia + recipiente + pabilo + otros;
    const costoPorVela = costoTotal / cantidad;
    const precioSugerido = costoPorVela * (1 + margen / 100);
    const gananciaUnidad = precioSugerido - costoPorVela;
    const gananciaTotal = gananciaUnidad * cantidad;
    const margenObtenido = precioSugerido > 0 ? (gananciaUnidad / precioSugerido) * 100 : 0;

    document.getElementById("res-precio").textContent = money(precioSugerido);
    document.getElementById("res-costo").textContent = money(costoPorVela);
    document.getElementById("res-ganancia-unidad").textContent = money(gananciaUnidad);
    document.getElementById("res-ganancia-total").textContent = money(gananciaTotal);
    document.getElementById("res-margen-obtenido").textContent = Math.round(margenObtenido) + "%";

    // Re-trigger the reveal / shine animations even if results were already visible
    calcResults.hidden = false;
    const hero = calcResults.querySelector(".result-hero");
    const shine = calcResults.querySelector(".result-hero-shine");
    const grid = calcResults.querySelector(".result-grid");
    [hero, shine, grid].forEach((el) => {
      el.style.animation = "none";
      // force reflow so the animation restarts
      void el.offsetWidth;
      el.style.animation = "";
    });

    calcResults.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  calcResetBtn.addEventListener("click", () => {
    calcForm.reset();
    calcResults.hidden = true;
    showToast("Campos borrados");
  });

  /* ---------------------------------------------------------
     PRODUCCIÓN — checklists + tabs + celebration
     --------------------------------------------------------- */
  const listProduccionEl = document.getElementById("list-produccion");
  const listVentaEl = document.getElementById("list-venta");
  const countProduccionEl = document.getElementById("count-produccion");
  const countVentaEl = document.getElementById("count-venta");

  const celebrationOverlay = document.getElementById("celebration-overlay");
  const celebrationText = document.getElementById("celebration-text");
  const celebrationCloseBtn = document.getElementById("celebration-close-btn");

  const CELEBRATION_MESSAGES = {
    produccion: "Todo está listo para comenzar tu producción.",
    venta: "Todo está listo para tu próxima venta.",
  };

  function showCelebration(tabKey) {
    celebrationText.textContent = CELEBRATION_MESSAGES[tabKey] || CELEBRATION_MESSAGES.produccion;
    celebrationOverlay.hidden = false;
    // restart confetti animation
    const confettiSpans = celebrationOverlay.querySelectorAll(".celebration-confetti span");
    confettiSpans.forEach((s) => {
      s.style.animation = "none";
      void s.offsetWidth;
      s.style.animation = "";
    });
  }
  celebrationCloseBtn.addEventListener("click", () => { celebrationOverlay.hidden = true; });
  celebrationOverlay.addEventListener("click", (e) => {
    if (e.target === celebrationOverlay) celebrationOverlay.hidden = true;
  });

  function renderChecklist(items, storageKey, listEl, countEl, tabKey) {
    const state = lsGet(storageKey, {});
    listEl.innerHTML = "";

    items.forEach((label, idx) => {
      const checked = !!state[idx];
      const li = document.createElement("li");
      li.className = "checklist-item" + (checked ? " is-checked" : "");
      li.innerHTML = `
        <span class="checklist-box" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4.5 4.5L19 8" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="checklist-text">${label}</span>
      `;
      li.addEventListener("click", () => {
        const s = lsGet(storageKey, {});
        const wasComplete = items.every((_, i) => s[i]);
        s[idx] = !s[idx];
        lsSet(storageKey, s);
        renderChecklist(items, storageKey, listEl, countEl, tabKey);
        renderHomeProgress();
        const isCompleteNow = items.every((_, i) => s[i]);
        if (!wasComplete && isCompleteNow) {
          showCelebration(tabKey);
        }
      });
      listEl.appendChild(li);
    });

    const doneCount = items.filter((_, idx) => state[idx]).length;
    countEl.textContent = `${doneCount}/${items.length}`;
  }

  function renderChecklists() {
    renderChecklist(CHECKLIST_PRODUCCION, LS_KEYS.checklistProduccion, listProduccionEl, countProduccionEl, "produccion");
    renderChecklist(CHECKLIST_VENTA, LS_KEYS.checklistVenta, listVentaEl, countVentaEl, "venta");
  }

  function setProduccionTab(tab) {
    const tabs = document.querySelectorAll('#screen-produccion .tab');
    const panelProd = document.getElementById("panel-produccion");
    const panelVenta = document.getElementById("panel-venta");
    tabs.forEach((t) => {
      const active = t.dataset.tabTarget === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    panelProd.hidden = tab !== "produccion";
    panelVenta.hidden = tab !== "venta";
  }

  document.querySelectorAll('#screen-produccion .tab').forEach((t) => {
    t.addEventListener("click", () => setProduccionTab(t.dataset.tabTarget));
  });

  /* ---------------------------------------------------------
     HOME — progress teaser (production checklists)
     --------------------------------------------------------- */
  const MINI_CIRCUMFERENCE = 2 * Math.PI * 18; // r=18

  function renderHomeProgress() {
    const prodState = lsGet(LS_KEYS.checklistProduccion, {});
    const ventaState = lsGet(LS_KEYS.checklistVenta, {});

    const prodDone = CHECKLIST_PRODUCCION.filter((_, i) => prodState[i]).length;
    const ventaDone = CHECKLIST_VENTA.filter((_, i) => ventaState[i]).length;
    const prodPct = prodDone / CHECKLIST_PRODUCCION.length;
    const ventaPct = ventaDone / CHECKLIST_VENTA.length;

    const prodCircle = document.querySelector("#mini-ring-produccion .mini-ring-fill");
    const ventaCircle = document.querySelector("#mini-ring-venta .mini-ring-fill");
    prodCircle.style.strokeDasharray = MINI_CIRCUMFERENCE.toFixed(1);
    prodCircle.style.strokeDashoffset = (MINI_CIRCUMFERENCE * (1 - prodPct)).toFixed(1);
    ventaCircle.style.strokeDasharray = MINI_CIRCUMFERENCE.toFixed(1);
    ventaCircle.style.strokeDashoffset = (MINI_CIRCUMFERENCE * (1 - ventaPct)).toFixed(1);

    const totalDone = prodDone + ventaDone;
    const sub = document.getElementById("home-progress-sub");
    if (totalDone === 0) {
      sub.textContent = "Todavía no marcaste ningún ítem";
    } else if (prodDone === CHECKLIST_PRODUCCION.length && ventaDone === CHECKLIST_VENTA.length) {
      sub.textContent = "¡Las dos checklists están completas!";
    } else {
      sub.textContent = `Producción ${prodDone}/${CHECKLIST_PRODUCCION.length} · Venta ${ventaDone}/${CHECKLIST_VENTA.length}`;
    }
  }

  /* ---------------------------------------------------------
     INSPIRACIÓN — galería con fotografías reales + modal de
     contenido práctico
     --------------------------------------------------------- */
  const inspiracionChips = document.getElementById("inspiracion-chips");
  const inspiracionSections = document.getElementById("inspiracion-sections");
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxArt = document.getElementById("lightbox-art");
  const lightboxCategory = document.getElementById("lightbox-category");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxBody = document.getElementById("lightbox-body");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  const CHECK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4.5 4.5L19 8" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderCardSection(section) {
    if (section.type === "steps") {
      const items = section.items
        .map((text, i) => `<li><span class="modal-step-num">${i + 1}</span><span>${text}</span></li>`)
        .join("");
      return `<div class="modal-section"><p class="modal-section-heading">${section.heading}</p><ol class="modal-steps">${items}</ol></div>`;
    }
    if (section.type === "checklist") {
      const items = section.items
        .map((text) => `<li class="modal-checklist-item"><span class="modal-checklist-box">${CHECK_SVG}</span><span>${text}</span></li>`)
        .join("");
      return `<div class="modal-section"><p class="modal-section-heading">${section.heading}</p><ul class="modal-checklist">${items}</ul></div>`;
    }
    if (section.type === "tips") {
      const items = section.items.map((text) => `<li>${text}</li>`).join("");
      return `<div class="modal-section modal-section-tips"><p class="modal-section-heading">${section.heading}</p><ul class="modal-tips">${items}</ul></div>`;
    }
    if (section.type === "quote") {
      const text = section.items[0];
      const quoteId = "quote-" + Math.random().toString(36).slice(2, 9);
      return `
        <div class="modal-section">
          <p class="modal-section-heading">${section.heading}</p>
          <div class="modal-quote">
            <p class="modal-quote-text" id="${quoteId}">${text}</p>
            <button type="button" class="modal-copy-btn" data-copy-target="${quoteId}">Copiar mensaje</button>
          </div>
        </div>
      `;
    }
    // default: plain list
    const items = section.items.map((text) => `<li>${text}</li>`).join("");
    return `<div class="modal-section"><p class="modal-section-heading">${section.heading}</p><ul class="modal-list">${items}</ul></div>`;
  }

  function openLightbox(category, card) {
    lightboxArt.innerHTML = `<img src="${category.image}" alt="${category.label}">`;
    lightboxCategory.textContent = category.label;
    lightboxTitle.textContent = card.title;

    const introHtml = `<p class="modal-intro">${card.intro}</p>`;
    const sectionsHtml = card.sections.map(renderCardSection).join("");
    lightboxBody.innerHTML = introHtml + sectionsHtml;

    lightboxOverlay.hidden = false;
    lightboxOverlay.scrollTop = 0;
  }
  lightboxCloseBtn.addEventListener("click", () => { lightboxOverlay.hidden = true; });
  lightboxOverlay.addEventListener("click", (e) => {
    if (e.target === lightboxOverlay) lightboxOverlay.hidden = true;
  });
  lightboxBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".modal-copy-btn");
    if (!btn) return;
    const target = document.getElementById(btn.dataset.copyTarget);
    if (!target) return;
    const text = target.textContent;
    const done = () => {
      const original = btn.textContent;
      btn.textContent = "¡Copiado!";
      btn.classList.add("is-copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("is-copied");
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => showToast("No se pudo copiar el mensaje"));
    } else {
      showToast("No se pudo copiar el mensaje");
    }
  });

  function renderInspiracionChips() {
    inspiracionChips.innerHTML = "";
    INSPIRATION.forEach((cat, i) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tab" + (i === 0 ? " is-active" : "");
      chip.textContent = cat.label;
      chip.addEventListener("click", () => {
        const target = document.getElementById("gallery-" + cat.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll("#inspiracion-chips .tab").forEach((t) => t.classList.remove("is-active"));
        chip.classList.add("is-active");
      });
      inspiracionChips.appendChild(chip);
    });
  }

  function renderInspiracionGallery() {
    inspiracionSections.innerHTML = "";
    INSPIRATION.forEach((cat) => {
      const section = document.createElement("div");
      section.className = "gallery-section";
      section.id = "gallery-" + cat.id;

      const head = document.createElement("div");
      head.className = "gallery-section-head";
      head.innerHTML = `<span class="gallery-section-title">${cat.label}</span><span class="gallery-section-count">${cat.cards.length} guías</span>`;
      section.appendChild(head);

      const banner = document.createElement("div");
      banner.className = "gallery-banner";
      banner.innerHTML = `<img src="${cat.image}" alt="${cat.label}" loading="lazy">`;
      section.appendChild(banner);

      const list = document.createElement("div");
      list.className = "question-list";

      cat.cards.forEach((card) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "question-card";
        item.innerHTML = `
          <span class="question-card-text">
            <span class="question-card-title">${card.title}</span>
            <span class="question-card-preview">${card.intro}</span>
          </span>
          <svg class="question-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#8A8577" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        `;
        item.addEventListener("click", () => openLightbox(cat, card));
        list.appendChild(item);
      });

      section.appendChild(list);
      inspiracionSections.appendChild(section);
    });
  }

  /* ---------------------------------------------------------
     MÁS — sub tabs, accordions, safety, settings
     --------------------------------------------------------- */
  const masPanels = {
    consejos: document.getElementById("mas-consejos"),
    faq: document.getElementById("mas-faq"),
    seguridad: document.getElementById("mas-seguridad"),
    acerca: document.getElementById("mas-acerca"),
    contacto: document.getElementById("mas-contacto"),
    ajustes: document.getElementById("mas-ajustes"),
  };

  function setMasTab(tab) {
    const tabs = document.querySelectorAll('#screen-mas .tab');
    tabs.forEach((t) => {
      const active = t.dataset.masTarget === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    Object.keys(masPanels).forEach((key) => {
      masPanels[key].hidden = key !== tab;
    });
  }

  document.querySelectorAll('#screen-mas .tab').forEach((t) => {
    t.addEventListener("click", () => setMasTab(t.dataset.masTarget));
  });

  function buildAccordion(containerEl, items, iconSvg) {
    containerEl.innerHTML = "";
    items.forEach((entry) => {
      const title = entry.title || entry.q;
      const body = entry.body || entry.a;
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML = `
        <div class="accordion-head">
          <span class="accordion-icon" aria-hidden="true">${iconSvg}</span>
          <span class="accordion-title">${title}</span>
          <span class="accordion-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">${body}</div></div>
      `;
      item.querySelector(".accordion-head").addEventListener("click", () => {
        item.classList.toggle("is-open");
      });
      containerEl.appendChild(item);
    });
  }

  function renderTipsAndFaq() {
    const bulbIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.5.4.8 1 .8 1.7V16h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0012 3z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const qIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M9.5 9.2a2.5 2.5 0 114 2c-.8.6-1.4 1-1.4 2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1" fill="currentColor"/></svg>';
    buildAccordion(document.getElementById("tips-list"), TIPS, bulbIcon);
    buildAccordion(document.getElementById("faq-list"), FAQ.map((f) => ({ title: f.q, body: f.a })), qIcon);
  }

  function renderSafety() {
    const el = document.getElementById("safety-list");
    el.innerHTML = "";
    SAFETY.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      el.appendChild(li);
    });
  }

  /* Settings actions */
  document.getElementById("btn-reset-progress").addEventListener("click", async () => {
    const ok = await confirmDialog(
      "Restablecer progreso",
      "Se pondrán en cero ambas checklists de producción y venta. Esta acción no se puede deshacer."
    );
    if (!ok) return;
    lsSet(LS_KEYS.checklistProduccion, {});
    lsSet(LS_KEYS.checklistVenta, {});
    renderChecklists();
    renderHomeProgress();
    showToast("Progreso restablecido");
  });

  document.getElementById("btn-delete-data").addEventListener("click", async () => {
    const ok = await confirmDialog(
      "Eliminar todos los datos",
      "Se borrará todo lo guardado por Velas Studio en este dispositivo, incluyendo la pantalla de bienvenida. Esta acción no se puede deshacer."
    );
    if (!ok) return;
    Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
    showToast("Datos eliminados");
    setTimeout(() => window.location.reload(), 600);
  });

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  function init() {
    initWelcome();
    setGreeting();
    setDailyQuote();
    renderChecklists();
    renderHomeProgress();
    renderInspiracionChips();
    renderInspiracionGallery();
    renderTipsAndFaq();
    renderSafety();

    const lastScreen = lsGet(LS_KEYS.lastScreen, "inicio");
    // "curso" no longer exists — fall back to inicio if an old install has it saved
    const validScreens = ["inicio", "calculadora", "produccion", "inspiracion", "mas"];
    goToScreen(validScreens.includes(lastScreen) ? lastScreen : "inicio");
  }

  document.addEventListener("DOMContentLoaded", init);

  /* ---------------------------------------------------------
     SERVICE WORKER REGISTRATION
     --------------------------------------------------------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {
        /* offline install not critical to core functionality */
      });
    });
  }
})();
