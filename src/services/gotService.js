export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    //Тут подставим такую ссылку иначе первая страница в большинстве своем будет выдавать полупустные результаты. Все из-за недоделаного API
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  };
  getAllHouses = async () => {
    const res = await this.getResource("/houses");
    return res.map(this._transformHouse);
  };
  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  };
  getAllBooks = async () => {
    const res = await this.getResource("/books");
    return res.map(this._transformBook);
  };
  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  };

  _extractId = (item) => {
    //Функция с регулярным выражением. Вытягивает из ссылки цифры в конце и использует их как id
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  _transformCharacter = (char) => {
    //Метод который будет трансформировать полученные данные в удобный для нас массив объектов, который легче
    // обрабатывать будет
    return {
      id: this._extractId(char),
      name: char.name || "no api info",
      gender: char.gender || "no api info",
      born: char.born || "no api info",
      died: char.died || "no api info",
      culture: char.culture || "no api info",
    };
  };
  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }
  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }
}
