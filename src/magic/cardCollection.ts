import { Card } from "./card.js";

import fs from "fs";
import chalk from "chalk";

export class CardCollection {
  public readonly username: string;
  private readonly collectionPath: string;
  private cards: Map<number, Card>;

  constructor(username: string) {
    this.username = username;

    this.collectionPath = `../collections/${this.username}`;
    // Si el directorio no está ya creado, lo creamos.
    if (!fs.existsSync(this.collectionPath)) {
      fs.mkdirSync(this.collectionPath);
    }
    this.cards = new Map<number, Card>();
    this.loadCards();
  }

  loadCards(): void {
    fs.readFile(this.collectionPath, (err, data) => {
      if (err) {
        throw new Error(
          chalk.red(`Error`) +
            `: no se ha conseguido leer el fichero ` +
            chalk.green(`${this.collectionPath}`),
        );
      } else {
        const parsedData = JSON.parse(data.toString());
        for (const card of parsedData) {
          this.cards.set(card.id, card);
        }
      }
    });
  }

  writeCards(): void {
    const cardsData = JSON.stringify([...this.cards.values()], null, 2);
    fs.writeFile(this.collectionPath, cardsData, (err) => {
      if (err) {
        throw new Error(
          chalk.red(`Error`) +
            `: No se pudo escribir en el archivo ${this.collectionPath}.`,
        );
      } else {
        console.log(
          `Cartas ` +
            chalk.green(`escritas correctamente`) +
            ` en el archivo ${this.collectionPath}.`,
        );
      }
    });
  }

  addCard(newCard: Card): void {
    if (this.cards.has(newCard.id)) {
      throw new Error(
        chalk.red(`Error`) +
          `: Ya existe una carta con el mismo ID en la colección.`,
      );
    } else {
      this.cards.set(newCard.id, newCard);
      console.log(
        `La carta ha sido ` +
          chalk.green(`añadida correctamente`) +
          ` a la colección.`,
      );
    }
    this.writeCards;
  }

  updateCard(modifiedCard: Card): void {
    if (this.cards.has(modifiedCard.id)) {
      this.cards.set(modifiedCard.id, modifiedCard);
      console.log(
        `La carta ha sido ` +
          chalk.green(`modificada correctamente`) +
          ` en la colección.`,
      );
    } else {
      throw new Error(
        chalk.red(`Error`) +
          `: No existe una carta con el ID especificado en la colección.`,
      );
    }
    this.writeCards;
  }

  removeCard(cardId: number): void {
    if (this.cards.has(cardId)) {
      this.cards.delete(cardId);
      console.log(
        `La carta con ID ${cardId} ha sido ` +
          chalk.green(`eliminada correctamente`) +
          ` de la colección.`,
      );
    } else {
      throw new Error(
        chalk.red(`Error`) +
          `: No existe una carta con el ID especificado en la colección.`,
      );
    }
    this.writeCards;
  }

  listCards(): string {
    let cardList = chalk.green("Cartas en la colección:\n");
    this.cards.forEach((card) => {
      cardList += `${card.attributes()}\n`;
    });
    return cardList;
  }

  showCardInfo(cardId: number): string {
    const card = this.cards.get(cardId);
    if (card) {
      return chalk.green("Información de la carta:\n") + card.attributes();
    } else {
      return (
        chalk.red(`Error`) +
        `: No existe una carta con el ID especificado en la colección.`
      );
    }
  }
}
