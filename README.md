# 📖 MyHealth frontend

## Yleiskuvaus sovelluksesta

MyHealth on päiväkirjamainen sovellus, joka mahdollistaa käyttäjän päivittäisten merkintöjen tallentamisen,
muokkaamisen ja tarvittaessa poistamisen. Sovellus hyödyntää Node.js ja Express.js - pohjaista REST API:a, joka kommunikoi MySql- tietokannan kanssa. 
Käyttäjäautentikointi on toteutettu JWT-Tokenin avulla.

---

## Projektin rakenne
```

ProjektiFE/
│── index.html   # Pääsivu
│── public/
│   ├── img/       # Kuvakansio
│   │   ├── brain.jpeg
│   │   ├── diary.jpg
│   │   ├── Heart_logo.png
│   │   ├── hero_image.jpg
│   │   ├── Index.png
│   │   ├── Kirjautuminen.png
│   │   ├── OmatTiedot.png
│   │   ├── Päivänhyvinvointimittari.png
│── src/
│   ├── css/       # Tyylitiedostot
│   │   ├── analysis.css
│   │   ├── meistä.css
│   │   ├── modal.css
│   │   ├── style.css
│   ├── js/        # JavaScript-tiedostot
│   │   ├── analysis.js
│   │   ├── auth.js
│   │   ├── diary.js
│   │   ├── entries.js
│   │   ├── fetch.js
│   │   ├── main.js
│   │   ├── users.js
│   ├── pages/     # HTML-sivut
│   │   ├── Analyysi.html
│   │   ├── Kirjaudu.html
│   │   ├── OmatTiedot.html
│── favicon.ico  # Sovelluksen ikoni
│── package-lock.json
│── package.json
│── README.md
```
---
## Kuvia käyttöliittymästä

![Etusivu](public/img/Index.png)
**Etusivu**

![Kirjautuminen](public/img/Kirjautuminen.png)
**Kirjautuminen**

![OmatTiedot](public/img/OmatTiedot.png)
**Omien merkintöjen tarkastelu ja lisääminen**

![Päivänhyvinvointimittari](public/img/Päivänhyvinvointimittari.png)
**Päivän hyvinvointimittari**




## Muuta  
Frontend on rakennettu seuraavilla teknologioilla:  
- **JavaScript**  
- **HTML**  
- **CSS**  
- **Node.js & Express.js** (taustajärjestelmä)
- **MySQL** (tietokanta)  
- **JWT (JSON Web Token)** käyttäjäautentikointiin

---
