function downloadPersonInfo() {
    getNewPerson()
      .then(person => {
        console.log("Person info:", person);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

function getNewPerson() {
    return new Promise((resolve, reject) => {
      fetch("https://randomuser.me/api/?results=2")
        .then(results => results.json())
        .then(response => {
          const character = response.results[0];
          const person = new Person(
            character.picture,
            character.cell,
            character.location.city,
            character.email,
            character.location.coordinates.latitude
          );
          person.showInfo();
          resolve(person); // Повертаємо об'єкт person при успішному виконанні
        })
        .catch(error => {
          reject(error); // Відхилення в разі помилки
        });
    });
  }

class Person {

    constructor(picture, cell, city, email, coordinates) {
        this.picture = picture;
        this.cell = cell;
        this.city = city;
        this.email = email;
        this.coordinates = coordinates;
    }

    showInfo() {
        const character = document.createElement('div');
        character.id = 'character';

        const picture = document.createElement('img');
        picture.src = this.picture.large;
        character.appendChild(picture);

        const cell = document.createElement('p');
        cell.innerHTML = `Cell: ${this.cell}`
        character.appendChild(cell);

        const city = document.createElement('p');
        city.innerHTML = `City: ${this.city}`;
        character.appendChild(city);

        const email = document.createElement('p');
        email.innerHTML = `Email: ${this.email}`;
        character.appendChild(email);

        const coordinates = document.createElement('p');
        coordinates.innerHTML = `Coordinates: ${this.coordinates}`;
        character.appendChild(coordinates);

        document.getElementById('characters').appendChild(character);
    }
}