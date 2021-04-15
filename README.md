## Recipes - projekt na przedmiot Frontend Development

Autor: Piotr Ostrowski

#### Instrukcja włączenia aplikacji
Wymagania:
 - nodejs
 - yarn
 - baza MongoDB na Dockerze:
	- adres: 127.0.0.1
	- port: 27017
	- nazwa: recipes
- wolne porty 3000 i 5000

Instalacja:

    cd webapp/ && yarn install
    cd ..
    cd api/ && npm install
    npm run dev