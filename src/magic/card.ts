  import chalk from "chalk";

  export enum CardColor {
    WHITE = "white",
    BLUE = "blue",
    BLACK = "black",
    RED = "red",
    GREEN = "green",
    COLORLESS = "colorless",
    MULTICOLORED = "multicolored",
  }

  export enum CardType {
    LAND = "Land",
    CREATURE = "Creature",
    ENCHANTMENT = "Enchantment",
    SORCERY = "Sorcery",
    INSTANT = "Instant",
    ARTIFACT = "Artifact",
    PLANESWALKER = "Planeswalker",
  }

  export enum CardRarity {
    COMMON = "common",
    UNCOMMON = "uncommon",
    RARE = "rare",
    MYTHIC = "mythic",
  }

  export interface CardInterface {
    id: number;
    name: string;
    mana: number;
    cardColor: CardColor;
    cardType: CardType;
    cardRarity: CardRarity;
    rules: string;
    powerAndResistance: [number, number] | null;
    loyalty: number | null;
    value: number;
  }

  export class Card implements CardInterface {
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
      // Check if the card is a creature or planeswalker and assign properties accordingly
      if (this.cardType === CardType.CREATURE) {
        if (powerAndResistance === null) {
          throw new Error(
            "Creature card must have powerAndResistance attribute defined.",
          );
        }
        // If it's a creature, powerAndResistance should be an array with two elements [power, resistance]
        this.powerAndResistance = powerAndResistance;
      } else if (this.cardType === CardType.PLANESWALKER) {
        if (loyalty === null) {
          throw new Error(
            "Planeswalker card must have loyalty attribute defined.",
          );
        }
        // If it's a planeswalker, loyalty represents the loyalty marks
        this.loyalty = loyalty;
      }
      this.value = value;
    }

    public attributes(): string {
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
  }
