[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/T5K9tzcv)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/build.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/build.yml)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/coveralls.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/node.js.yml)

# Informe práctica 9 - Aplicación para coleccionistas de cartas Magic.

![Imagen Magic](images/magic.jpg)

## Alejandro Javier Aguiar Pérez
> [alu0101487168@ull.edu.es](mailto:alu0101487168@ull.edu.es)

## Índice
1. [Resumen](#resumen)
2. [Chalk](#chalk)
3. [Yargs](#yargs)
4. [Node.js](#node.js)
5. [Magic App](#magic-app)
    - [Clase Card](#clase-card)
    - [Clase CardCollection](#clase-cardcollection)
    - [Comandos](#comandos)
6. [Ejercicio PE](#ejercicio-pe)
7. [Posibles mejoras](#posibles-mejoras)
8. [Referencias](#referencias)

## Resumen

Está práctica consistía en desarrollar una aplicación para coleccionistas de cartas Magic que permita almacenar y gestionar información sobre las cartas de un usuario. La aplicación deberá permitir añadir, modificar, eliminar, listar y leer la información de las cartas, y la información se almacenará en archivos JSON. Además, la interacción con la aplicación se realizará exclusivamente desde la línea de comandos, sin un menú interactivo.

Los requisitos detallados de la aplicación son los siguientes:

- **Gestión de usuarios**: la aplicación permitirá que múltiples usuarios interactúen, pero no simultáneamente.

- **Información de cartas**: cada carta se describirá con información como ID, nombre, coste de maná, color, tipo, rareza, reglas, poder/resistencia (si es una criatura), lealtad (si es un planeswalker) y valor de mercado.

- **Operaciones de colección**:
    - Añadir una carta.
    - Modificar una carta existente.
    - Eliminar una carta de la colección.
    - Listar las cartas existentes.
    - Mostrar información detallada de una carta específica.

- **Persistencia de datos**: la información de las cartas se guardará en archivos JSON, uno por cada usuario, en un directorio específico.

- **Interfaz de línea de comandos**: la interacción con la aplicación se realizará mediante comandos y opciones desde la línea de comandos, utilizando el paquete yargs.

- **Colores en los comandos de la consola**: se utilizará el paquete chalk para mostrar mensajes informativos en verde y mensajes de error en rojo en la consola.

- **Pruebas y Documentación**:
    - Se deberá seguir una metodología de desarrollo dirigido por pruebas/comportamiento (TDD/BDD).
    - Se incluirán pruebas unitarias para verificar el correcto funcionamiento del código y la robustez ante entradas no válidas.
    - Se documentará el código utilizando TypeDoc.
    - Se implementarán flujos de trabajo de GitHub Actions para realizar pruebas en diferentes entornos, enviar datos de cobertura a Coveralls y analizar la calidad y seguridad del código con Sonar Cloud.

> **[Volver al índice](#índice)**

## Chalk

El paquete *chalk* es una herramienta utilizada en Node.js para dar formato y colorear texto en la consola. Permite resaltar mensajes de salida, hacerlos más legibles y mejorar la apariencia general de las impresiones por consola. Es especialmente útil para diferenciar mensajes informativos de mensajes de error, o para destacar cierta información importante.

Un ejemplo de como usar *chalk* puede ser el siguiente:

```ts
import chalk from "chalk";

// Colorear texto
console.log(chalk.blue("Este texto es azul"));
console.log(chalk.red("Este texto es rojo"));
console.log(chalk.green("Este texto es verde"));

// Combinar estilos
console.log(chalk.blue.bold("Este texto es azul y negrita"));
console.log(chalk.red.underline("Este texto es rojo y subrayado"));

// Cambiar el color de fondo
console.log(chalk.bgYellow.black("Texto con fondo amarillo"));

// Combinar múltiples estilos
console.log(chalk.red.bold.bgWhite.underline("Texto rojo, negrita, subrayado y con fondo blanco"));
```

Aunque en este proyecto he decidido no ahondar demasiado en el uso de chalk ya que no creo que es lo que pretende para esta práctica, así que solo coloree de diferentes maneras los mensajes informativos como se requería.

> **[Volver al índice](#índice)**

## Yargs

El paquete *yargs* es una herramienta en Node.js que facilita la creación de interfaces de línea de comandos (CLI) de manera sencilla y flexible. Permite definir comandos, opciones y argumentos para tus aplicaciones de línea de comandos de una manera intuitiva y fácil de usar. *yargs* simplifica la tarea de analizar y procesar los argumentos pasados por línea de comandos en la aplicación.

Un ejemplo de como usar yargs puede ser el siguiente, extraído directamente desde su página web:

```ts
// For ESM imports
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()
```

Tampoco decidí ahondar demasiado en su uso, tan solo lo necesario.

> **[Volver al índice](#índice)**

## Node.js

La API síncrona de Node.js para trabajar con el sistema de archivos proporciona métodos que permiten realizar operaciones de lectura y escritura de archivos de forma síncrona, lo que significa que bloquean la ejecución del programa hasta que la operación se complete.

Algunos de los métodos más comunes proporcionados por esta API son:

1. *fs.readFileSync(path[, options])*: Este método lee de forma síncrona el contenido de un archivo en el sistema de archivos y devuelve los datos como un objeto Buffer o una cadena, dependiendo de si se especifican las opciones de codificación. Es importante tener en cuenta que este método bloqueará la ejecución del programa hasta que se complete la lectura del archivo.

2. *fs.writeFileSync(file, data[, options])*: Este método es similar al anterior, pero se utiliza para escribir datos en un archivo de forma síncrona. Si el archivo ya existe, su contenido será reemplazado. Si el archivo no existe, se creará uno nuevo. Al igual que readFileSync, bloquea la ejecución del programa hasta que se complete la escritura del archivo.

*Nota: en este programa sólo se lee el archivo .JSON de manera síncrona, mientras la escritura es asíncrona.

> **[Volver al índice](#índice)**

## Magic App

El programa es una aplicación de **línea de comandos** diseñada para permitir a los usuarios gestionar colecciones de cartas del juego Magic: The Gathering. La aplicación permite a los usuarios realizar diversas operaciones sobre sus colecciones, como **añadir**, **modificar**, **eliminar**, **listar** y **leer** información sobre las cartas.

La aplicación utiliza el paquete *yargs* para parsear los argumentos de la línea de comandos y gestionar los diferentes comandos y opciones asociados a cada operación. Cada comando tiene un manejador asociado que ejecuta el código correspondiente a la operación solicitada por el usuario.

La información de las cartas se almacena en archivos JSON en el sistema de archivos del usuario, utilizando la **API síncrona de Node.js** para trabajar con el sistema de ficheros. Cada usuario tiene su propio archivo JSON que contiene la información de su colección de cartas.

La aplicación también utiliza el paquete *chalk* para mostrar mensajes **informativos** y de **error** en diferentes colores en la consola, lo que ayuda a mejorar la legibilidad y la presentación de la información para el usuario.

Los elementos más importantes que constituyen el programa son los siguientes:

> **[Volver al índice](#índice)**

### Clase Card

La clase *Card* representa una carta del juego Magic: The Gathering y tiene las siguientes opciones de diseño:

- **Constructor**: La clase tiene propiedades públicas que representan las características de una carta, como su ID, nombre, coste de mana, color, tipo, rareza, reglas, poder y resistencia (solo para *CRIATURAS*), lealtad (solo para *PLANESWALKERS*) y valor. Estas propiedades se inicializan en el constructor y son accesibles desde fuera de la clase. También cuenta con la **validación de atributos específicos** como lo son el poder y la resistencia para las *CRIATURAS*, o la lealtad para los *PLANESWALKERS*

```ts
/**
 * Constructor de la clase Card.
 * @param id El ID de la carta.
 * @param name El nombre de la carta.
 * @param mana El coste de mana de la carta.
 * @param cardColor El color de la carta.
 * @param cardType El tipo de la carta.
 * @param cardRarity La rareza de la carta.
 * @param rules Las reglas de la carta.
 * @param powerAndResistance El poder y resistencia de la carta (solo para criaturas).
 * @param loyalty La lealtad de la carta (solo para planeswalkers).
 * @param value El valor de la carta.
 */
constructor(
public id: number,
public name: string,
public mana: number,
public cardColor: CardColor,
public cardType: CardType,
public cardRarity: CardRarity,
public rules: string,
public powerAndResistance: [number, number] | null,
public loyalty: number | null,
public value: number,
) {
  this.id = id;
  this.name = name;
  this.mana = mana;
  this.cardColor = cardColor;
  this.cardType = cardType;
  this.cardRarity = cardRarity;
  if (this.cardType === CardType.CREATURE) {
    if (powerAndResistance === null) {
      throw new Error(
        "Una carta del tipo CRIATURA debe de tener asociada un atributo de fuerza/resistencia.",
      );
    }
    this.powerAndResistance = powerAndResistance;
  } else if (this.cardType === CardType.PLANESWALKER) {
    if (loyalty === null) {
      throw new Error(
        "Una carta del tipo PLANESWALKER debe de tener asociada un atributo de lealtad.",
      );
    }
    this.loyalty = loyalty;
  }
  this.value = value;
}
```

- **Método de representación de atributos**: la clase proporciona un método *attributes()* que devuelve una cadena con todas las características de la carta formateadas. Este método utiliza el paquete *chalk* para resaltar el color del texto en función del color de la carta.

```ts
/**
 * Método que devuelve una representación en cadena de las características de la carta.
 * @returns Una cadena que contiene las características de la carta.
 */
attributes(): string {
  let attributes = "Card Attributes:\n";
  attributes += `ID: ${this.id}\n`;
  attributes += `Name: ${this.name}\n`;
  attributes += `Mana: ${this.mana}\n`;
  attributes += `Color: `;
  switch (this.cardColor) {
    case CardColor.WHITE:
      attributes += chalk.white(this.cardColor) + "\n";
      break;
    case CardColor.BLUE:
      attributes += chalk.blue(this.cardColor) + "\n";
      break;
    case CardColor.BLACK:
      attributes += chalk.black(this.cardColor) + "\n";
      break;
    case CardColor.RED:
      attributes += chalk.red(this.cardColor) + "\n";
      break;
    case CardColor.GREEN:
      attributes += chalk.green(this.cardColor) + "\n";
      break;
    case CardColor.COLORLESS:
      attributes += chalk.gray(this.cardColor) + "\n";
      break;
    case CardColor.MULTICOLORED:
      attributes += chalk.yellow(this.cardColor) + "\n";
      break;
    default:
      attributes += this.cardColor + "\n";
  }
  attributes += `Type: ${this.cardType}\n`;
  attributes += `Rarity: ${this.cardRarity}\n`;
  attributes += `Rules: ${this.rules}\n`;
  if (this.powerAndResistance !== null)
    attributes += `Power: ${this.powerAndResistance[0]}, Resistance: ${this.powerAndResistance[1]}\n`;
  if (this.loyalty !== null) attributes += `Loyalty: ${this.loyalty}\n`;
  attributes += `Value: ${this.value}\n`;
  return attributes;
}
```

> **[Volver al índice](#índice)**

### Clase CardCollection

Esta clase representa una colección de cartas en el juego de Magic: The Gathering. Al principio en el programa se intento usar un array de objetos del tipo carta, pero al final se optó por usar un mapa de cartas  basado en su id, ya que la implementaciónd de los métodos necesarios es mucho más cómodo así. Esta clase cuenta con:

- **Interfaz pública**: La clase implementa una interfaz *CardCollectionInterface* que describe los métodos públicos que puede utilizar un usuario para interactuar con la colección de cartas. Estos métodos incluyen *addCard()*, *updateCard()*, *removeCard()*, *listCards()* y *showCardInfo()*.

```ts
/**
 * Interfaz que describe los métodos públicos de la clase CardCollection.
 */
export interface CardCollectionInterface {
  /**
   * Método que añade una nueva carta a la colección.
   * @param newCard La nueva carta que se va a añadir.
   */
  addCard(newCard: Card): void;

  /**
   * Método que actualiza una carta en la colección.
   * @param modifiedCard La carta modificada que se va a actualizar.
   */
  updateCard(modifiedCard: Card): void;

  /**
   * Método que elimina una carta de la colección.
   * @param cardId El ID de la carta que se va a eliminar.
   */
  removeCard(cardId: number): void;

  /**
   * Método que devuelve una cadena con la lista de cartas en la colección.
   * @returns Una cadena con la lista de cartas en la colección.
   */
  listCards(): string;

  /**
   * Método que devuelve información detallada de una carta específica en la colección.
   * @param cardId El ID de la carta de la cual se quiere obtener la información.
   * @returns Una cadena con la información detallada de la carta.
   */
  showCardInfo(cardId: number): string;
}
```

- **Constructor**: El constructor de *CardCollection* toma el nombre de usuario asociado a la colección y crea un mapa para almacenar las cartas. También inicializa la ruta del archivo de la colección y carga las cartas desde el archivo si existe.

```ts
/**
 * El nombre de usuario asociado a la colección.
 */
public readonly username: string;
/**
 * La ruta del archivo de la colección.
 */
private readonly collectionPath: string;
/**
 * Mapa que contiene las cartas en la colección, donde la clave es el ID de la carta.
 */
private cards: Map<number, Card>;

/**
 * Constructor de la clase CardCollection.
 * @param username El nombre de usuario asociado a la colección.
 */
constructor(username: string) {
  this.username = username;
  this.collectionPath = `./collections/${this.username}.json`;
  this.cards = new Map<number, Card>();

  // Si el archivo de colección no existe, escribirlo
  if (!fs.existsSync(this.collectionPath)) {
    this.writeCards();
  }
  this.loadCards();
}
```

- **Métodos de carga y escritura**: La clase tiene dos métodos *loadCards()* y *writeCards()* para cargar las cartas desde el archivo y escribir las cartas en el archivo, respectivamente. Estos métodos utilizan la **API síncrona de Node.js** para trabajar con el sistema de archivos.
typescript. Antes apunte como nota que la escritura se hace de manera asíncrona pero la lectura de manera síncrona y es que luego de toparme con varios errores me dí cuenta de que el programa no esperaba a leer los datos para inicializar el mapa de cartas, por lo que siempre estaba vacío dicho mapa, debido a la naturaleza no bloqueante de Node.js. Para arreglar esto simplemente cambié la función de lectura asíncrona a una síncrona y ya. Decidí dejar la escritura como asíncrona ya que con Node.js no se va a dar el caso en el que la escritura se realice antes que las operaciones que realice sobre el mapa de cartas.

- **Métodos de interacción con la colección**: Los métodos *addCard()*, *updateCard()*, *removeCard()*, *listCards()* y *showCardInfo()* permiten al usuario **agregar**, **actualizar**, **eliminar**, **listar** y **ver** información detallada de las cartas en la colección. Si la función modifica algo de la colección se hace una llamada a *writeCards()* para guardar el estado de la colección en el .JSON.

**Nota**: se prefiere el uso de *console.log()* para indicar los fallos ya que al estar orientado a comandos no nos hace falta un control tan preciso del flujo de errores como si el programa se ejecutase continuamente y porque daba problemas con el uso de *chalk*.

> **[Volver al índice](#índice)**

### Comandos

En este apartado no me voy a parar durante demasiado tiempo ya que no hay mucho que destacar, simplemente se crean diferentes comandos con varios argumentos con los que poder usar la clase *CardCollection* ya mencionada. En resumen, es un fichero que declara esos diferentes comandos y hace de traductor entre los argumentos introducidos por el usuario y la colección de cartas.

Si se quieren ver los comandos que se pueden usar con el programa basta con ejecutar el siguiente comando desde la carpeta main del proyecto:

```bash
node dist/src/magic/magic-app.js --help
```

> **[Volver al índice](#índice)**

## Ejercicio PE

El ejercicio planteado en la modificación de la práctica semanal fue el de usar el patrón de diseño *Template Method* para una clase que buscaba el poder realizar de diferentes maneras el método reduce() de array.prototype() para una lista de números, aunque no me acordé de usar el *método plantilla* ni de agrergar los *hooks*. En su lugar creé clase abstracta llamada *FilterMapReduce* y varias clases concretas que extienden esta clase base.

La clase abstracta *FilterMapReduce* proporciona métodos para filtrar, mapear y reducir una lista de números. Los métodos Filter y Map están implementados en la clase base, mientras que el método *Reduce()* es un método abstracto que debe ser implementado por las clases hijas.

Las clases concretas que extienden *FilterMapReduce* son *FilterMapAddReduce*, *FilterMapSubReduce*, *FilterMapProdReduce* y *FilterMapDivReduce*, cada una implementando el método Reduce de manera diferente para realizar una operación de **suma**, **resta**, **producto** o **división**, respectivamente, en la lista de números.

> **[Volver al índice](#índice)**

## Posibles mejoras

Una de las posibles mejoras sobre este proyecto de coleccion de cartas de Magic podría ser la capacidad de imprimir de mejor manera los errores que ocurren en la ejecución del programa, las pruebas unitarias creo que cumplen su papel pero se debería de trabajar más en ellas ya que no cubren ni siquiera el 90% del porgrama y otra queja posible que se podría abordar en un futuro sería el de ir modificando el .JSON en lugar de borrarlo todo y volverlo a cargar de cero, ya que es un problema bastante grave de rendimiento.

> **[Volver al índice](#índice)**

## Referencias

[Chalk](https://www.npmjs.com/package/chalk)
[Yargs](https://www.npmjs.com/package/yargs)
[Node.js](https://nodejs.org/docs/latest/api/fs.html)
[Apuntes asignatura sobre Node.js](https://ull-esit-inf-dsi-2324.github.io/nodejs-theory/nodejs-filesystem-childproc.html)

> **[Volver al índice](#índice)**