import { Card } from "./card.js";

import fs from "fs";
import chalk from "chalk";

export class CardCollection {
  public readonly username: string;
  private readonly collectionPath: string;
  private cards: Map<number, Card>;

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

  // La lectura debe de terminar antes de que se sigan leyendo datos
  loadCards(): void {
    try {
      const data = fs.readFileSync(this.collectionPath);
      const parsedData = JSON.parse(data.toString());
      for (const cardData of parsedData) {
        const card = new Card(
          cardData.id,
          cardData.name,
          cardData.mana,
          cardData.cardColor,
          cardData.cardType,
          cardData.cardRarity,
          cardData.rules,
          cardData.powerAndResistance,
          cardData.loyalty,
          cardData.value,
        );
        this.cards.set(card.id, card);
      }
    } catch (err) {
      console.log(
        chalk.red(`Error`) +
          `: no se ha conseguido leer el fichero ` +
          chalk.green(`${this.collectionPath}`),
      );
    }
  }

  writeCards(): void {
    const cardsData = JSON.stringify([...this.cards.values()], null, 2);
    // console.log(JSON.stringify([...this.cards.values()], null, 2));
    fs.writeFile(this.collectionPath, cardsData, (err) => {
      if (err) {
        console.log(
          chalk.red(`Error`) +
            `: No se pudo escribir en el archivo ${this.collectionPath}.`,
        );
      } else {
        console.log(
          `Estado de la colección ` +
            chalk.green(`escrito correctamente`) +
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
    this.writeCards();
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
      console.log(
        chalk.red(`Error`) +
          `: No existe una carta con el ID especificado en la colección.`,
      );
    }
    this.writeCards();
  }

  removeCard(cardId: number): void {
    if (this.cards.has(cardId)) {
      this.cards.delete(cardId);
      console.log(
        `La carta con ID ${cardId} ha sido ` +
          chalk.green(`eliminada correctamente`) +
          ` de la colección.`,
      );
      this.writeCards();
    } else {
      console.log(
        chalk.red(`Error`) +
          `: No existe una carta con el ID especificado en la colección.`,
      );
    }
  }

  listCards(): string {
    let cardList = chalk.green("Cartas en la colección:\n");
    this.cards.forEach((card) => {
      cardList += card.attributes();
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
