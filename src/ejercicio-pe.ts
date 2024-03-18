/**
 * Clase abstracta FilterMapReduce.
 */
export abstract class FilterMapReduce {
  /**
   * Constructor de la clase FilterMapReduce
   * 
   * @param listNumbers lista de números que se usará para calcular las operaciones.
   */
  constructor(protected listNumbers: number[] = []) {}

  /**
   * Aplica una función lógica a la lista de números.
   * 
   * @param filterFunction predicado lógico al cual será sujeto cada elemento de la lista
   * @returns lista de los números que cumplen con el predicado lógico.
   */
  public Filter(filterFunction: (x: number) => boolean): number[] {
    const results: number[] = [];
    this.listNumbers.forEach((element) => {
      if (filterFunction(element)) {
        results.push(element);
      }
    });
    return results;
  }
  /**
   * Aplica un mapeado basado en una función tomada por parametros. 
   * @note La clave de cada valor siempre serán los índices originales de la posición de cada elemento.
   * 
   * @param mapFunction función de mapeado.
   * @returns mapeado de la lista.
   */
  public Map(mapFunction: (x: number) => number): Map<number, number> {
    const results: Map<number, number> = new Map();
    let index: number = 0;
    this.listNumbers.forEach((element) => {
      if (mapFunction(element)) {
        results.set(index, element);
      }
      ++index;
    });
    return results;
  }

  /**
   * Método abstracto para aplicar la función reduce tradicional de diferentes maneras en las clases hijas.
   * 
   * @returns el resultado de la operación.
   */
  protected abstract Reduce(): number;
}

/**
 * Clase FilterMapAddReduce que extiende de FilterMapReduce.
 */
export class FilterMapAddReduce extends FilterMapReduce {
  /**
   * Constructor de la clase FilterMapAddReduce que extiende de FilterMapReduce.
   *
   * @param listNumbers lista de números que se usará para calcular las operaciones.
   */
  constructor(protected listNumbers: number[] = []) {
    super(listNumbers);
  }

  /**
   * Funcion que de calcula la suma de todos los elementos de la lista.
   *
   * @returns La suma de todos los elementos.
   */
  public Reduce(): number {
    let sum = 0;
    this.listNumbers.forEach((element) => {
      sum += element;
    });
    return sum;
  }
}

/**
 * Clase FilterMapSubReduce que extiende de FilterMapReduce.
 */
export class FilterMapSubReduce extends FilterMapReduce {
  /**
   * Constructor de la clase FilterMapSubReduce.
   *
   * @param listNumbers lista de números que se usará para calcular las operaciones.
   */
  constructor(protected listNumbers: number[] = []) {
    super(listNumbers);
  }

  /**
   * Funcion que toma todos los números de una lista excepto el primero y le resta a ese mismo los demás.
   *
   * @returns el resultado de la resta del los demás números al primero.
   */
  public Reduce(): number {
    let result = this.listNumbers[0];
    if (this.listNumbers.length < 1) {
      return 0;
    }
    for (let i = 1; i < this.listNumbers.length; i++) {
      result -= this.listNumbers[i];
    }
    return result;
  }
}

/**
 * Clase FilterMapProdReduce que extiende de FilterMapReduce.
 */
export class FilterMapProdReduce extends FilterMapReduce {
  /**
   * Constructor de la clase FilterMapProdReduce.
   *
   * @param listNumbers lista de números que se usará para calcular las operaciones.
   */
  constructor(protected listNumbers: number[] = []) {
    super(listNumbers);
  }
  /**
   * Función que multiplica cada elemento de la lista por el siguiente y así sucesivamente.
   *
   * @returns el producto final de la multiplicación.
   */
  public Reduce(): number {
    let result = 1;
    this.listNumbers.forEach((element) => {
      result *= element;
    });
    return result;
  }
}

/**
 * Clase FilterMapDivReduce que extiende de FilterMapReduce.
 */
export class FilterMapDivReduce extends FilterMapReduce {
  /**
   * Constructor de la clase FilterMapDivReduce.
   *
   * @param listNumbers lista de números que se usará para calcular las operaciones.
   */
  constructor(protected listNumbers: number[] = []) {
    super(listNumbers);
  }

  /**
   * Función que parte de un denominador principal, el primer elemento de la lista y
   * lo continua dividiendo una y otra vez por los demás elementos de la lista.
   *
   * @returns resultado final de la continua división de cada elemento de la lista.
   */
  public Reduce(): number {
    let result = this.listNumbers[0];
    if (this.listNumbers.length < 1) {
      return 0;
    }
    for (let i = 1; i < this.listNumbers.length; i++) {
      if (this.listNumbers[i] === 0) {
        throw new Error("Division by zero error");
      }
      result /= this.listNumbers[i];
    }
    return result;
  }
}
