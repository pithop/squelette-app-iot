# Squelette d'application web pour projet IoT

## Description

Squelette d'application à destination d'étudiants de Bac+3 permettant de créer une application web avec React et Firebase Realtime Database.

## Pré-requis

Pour utiliser ce projet, il vous faudra :

- Avoir installé [NodeJS](https://nodejs.org/en/download) sur votre machine
- Avoir installé [le gestionnaire de paquets Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- Un projet [Firebase](https://console.firebase.google.com/) avec Realtime Database configuré

## Configuration

Avant toute chose, configurez le projet en ajoutant les identifiants de votre projet Firebase dans le fichier `./src/App.tsx`

```ts
const firebaseConfig = {
  apiKey: [Votre apiKey],
  authDomain: [Votre authDomain],
  databaseURL: [Votre databaseUrl],
  projectId: [Votre projectId],
  storageBucket: [Votre storageBucket],
  messagingSenderId: [Votre messagingSenderId],
  appId: [Votre appId],
}
```

Dans le fichier `./firebase.json`, remplacez `"site": "hackathon"` par `"site": [NOM VOTRE PROJET FIREBASE]`.

Dans le fichier `./.firebaserc`, remplacez `"default": "hackathon"` par `"default": [NOM VOTRE PROJET FIREBASE]`.

## Lancer le projet

Il vous faudra tout d'abord installer les dépendances :

```bash
yarn
```

Une fois ceci fait, vous pourrez simplement lancer le projet avec la commande :

```bash
yarn start
```

## Lire et écrire sur la base de données

Ce squelette d'application met à votre disposition deux fonctions.

### readRealtime

Permet de lire une valeur dans la base de données.

```ts
function readRealtime(path: string, action: (data: any) => void)
```

À chaque fois que la valeur dans la base de données sera modifiée, la fonction `action` passée en argument sera exécutée à nouveau.

#### Exemple

Dans l'exemple ci-dessous, `setData` sera ré-exécutée à chaque modification de la valeur de `foo` dans la base de données

```ts
const [data, setData] = useState()

useEffect(() => {
  readRealtime("foo", setData)
})
```

### writeRealtime

Permet d'écrire une valeur dans la base de données.

```ts
type Data = boolean | string | number | { [x: string]: unknown }

function writeRealtime(path: string, data: Data | Data[])
```

#### Exemple

```ts
writeRealtime("foo", "bar").then(() => console.log("all good"))
```

## Déployer le projet

Pour déployer le projet sur Firebase Hosting, utilisez la commande

```bash
yarn deploy
```
