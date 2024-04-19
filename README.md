# AbmUsers

Este proyecto esta separado en front y back respectivamente por carpetas, cada una tiene su readme para poder levantar el proyecto

## FRONT

Utiliza Angular v17 con algunas librerias como Angular Material

### Installation

Instalar las dependencias con npm

```bash
  cd abm-front
  npm install
```
    
### Deployment

Levantar el proyecto, por default es sobre el puerto 4200, para cambiar solo agregar --port= y el puerto a continuacion

```bash
  ng serve -o
```

## BACK

Utiliza NodeJS con Express y Typescript.Contiene librerias como express-validators, cors y dotenv

### Installation

Instalar las dependencias con npm

```bash
  cd abm-back
  npm install
```
    
### Deployment

Primero hay que configurar el .env con el example que hay

Ejemplo de .env 

`PORT=3000`
`DBPORT=3400`
`DBNAME=test`
`DBUSER=root`
`DBPASS=1234`

PORT es donde se van a escuchar las peticiones y el DBPORT es el puerto de la base de datos

Para levantar el proyecto solo ejecutar el siguiente comando

```bash
  npm run dev
```