import { Character, Bowerman } from "./character";

describe("Character class tests", () => {
  test("Создание персонажа с корректными параметрами", () => {
    const character = new Character("Hero", "Bowman");
    expect(character).toEqual({
      name: "Hero",
      type: "Bowman",
      health: 100,
      level: 1,
      attack: 0,
      defence: 0,
    });
  });

  test("Ошибка при некорректном имени", () => {
    expect(() => new Character("A", "Bowman")).toThrow(
      "Имя должно быть строкой от 2 до 10 символов."
    );
  });

  test("Ошибка при недопустимом типе", () => {
    expect(() => new Character("Hero", "Warrior")).toThrow(
      "Недопустимый тип персонажа."
    );
  });

  test("levelUp: успешное повышение уровня", () => {
    const bowman = new Bowerman("Hero");
    bowman.levelUp();
    expect(bowman.level).toBe(2);
    expect(bowman.attack).toBe(30); // 25 * 1.2
    expect(bowman.defence).toBe(30); // 25 * 1.2
    expect(bowman.health).toBe(100);
  });

  test("levelUp: ошибка при health = 0", () => {
    const bowman = new Bowerman("Hero");
    bowman.health = 0;
    expect(() => bowman.levelUp()).toThrow(
      "Нельзя повысить уровень умершего персонажа."
    );
  });

  test("damage: корректное уменьшение здоровья", () => {
    const bowman = new Bowerman("Hero");
    bowman.damage(20);
    expect(bowman.health).toBe(85); // 100 - 20 * (1 - 25 / 100)
  });

  test("damage: здоровье не уходит в минус", () => {
    const bowman = new Bowerman("Hero");
    bowman.damage(200);
    expect(bowman.health).toBe(0);
  });

  test("damage: метод не вызывает ошибок при health = 0", () => {
    const bowman = new Bowerman("Hero");
    bowman.health = 0;
    expect(() => bowman.damage(20)).not.toThrow();
    expect(bowman.health).toBe(0);
  });
});
