> ⭐ Versión : **^0.0.9**

<h1 align="center">🕸 SakuraBot-MD</h1>
<p align="center">
    <img src="https://stellarwa.xyz/files/1757378468505.jpeg">
</p>

---

## 🪻 Descripción 

Sakura Bot es un bot de WhatsApp multifuncional basado en `baileys`. Este bot ofrece una variedad de características para mejorar tu experiencia en WhatsApp.

---

## 🪻 Características

- Respuestas automáticas
- Gestión de grupos
- Juegos interactivos
- Integración con APIs externas

---

## Instalación por Termux
> [!IMPORTANT]
> **No garantizamos un funcionamiento perfecto en Termux, aunque trabajamos constantemente para asegurar una buena compatibilidad. Si experimentas lentitud o errores, por favor envía una solicitud con la evidencia correspondiente para que nuestro equipo pueda solucionarlo. Si el problema persiste, te recomendamos considerar los servicios de alojamiento de bots de nuestros patrocinadores.**

<details>
  <summary><b>🍄 Instalación Manual</b></summary>

> *Comandos para instalar de forma manual*
```bash
termux-setup-storage
```
```bash
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
```
```bash
git clone https://github.com/DevAlexJs/SakuraBot-MD && cd SakuraBot-MD
```
```bash
yarn install
```
```bash
npm install
```
```bash
npm start
```
> *Si aparece **(Y/I/N/O/D/Z) [default=N] ?** use la letra **"y"** y luego **"ENTER"** para continuar con la instalación.*
</details>

<details>
  <summary><b>🪻 Comandos para mantener más tiempo activo el Bot</b></summary>

> *Ejecutar estos comandos dentro de la carpeta SakuraBot-MD*
```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 
``` 
#### Opciones Disponibles
> *Esto eliminará todo el historial que hayas establecido con PM2:*
```bash 
pm2 delete index
``` 
> *Si tienes cerrado Termux y quiere ver de nuevo la ejecución use:*
```bash 
pm2 logs 
``` 
> *Si desea detener la ejecución de Termux use:*
```bash 
pm2 stop index
``` 
> *Si desea iniciar de nuevo la ejecución de Termux use:*
```bash 
pm2 start index
```
---- 
### En caso de detenerse
> _Si despues que ya instalastes tu bot y termux te salta en blanco, se fue tu internet o reiniciaste tu celular, solo realizaras estos pasos:_
```bash
cd && cd SakuraBot-MD && npm start
```
----
### Obtener nuevo código QR 
> *Detén el bot, haz click en el símbolo (ctrl) [default=z] usar la letra "z" + "ENTER" hasta que salga algo verdes similar a: `SakuraBot-MD $`*
> **Escribe los siguientes comando uno x uno :**
```bash 
cd && cd SakuraBot-MD && rm -rf sessions/session-bot && npm run qr
```
----
### Obtener nuevo código de teléfono 
```bash 
cd && cd SakuraBot-MD && rm -rf sessions/session-bot && npm run code
```
</details>

<details>
<summary><b>🫛 Actualizar SakuraBot</b></summary>

> **Utiliza esta opción únicamente si deseas actualizar a la última versión de SakuraBot. Hemos implementado un método ingenioso mediante comandos para realizar la actualización, pero ten en cuenta que al usarla se eliminarán todos los archivos de la versión actual y se reemplazarán con los de la nueva versión. Solo se conservará la base de datos, por lo que será necesario volver a vincular el Bot.**  

**Comandos para actualizar SakuraBot-MD de forma automática**

```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/DevAlexJs/SakuraBot-MD/master/update.sh | bash 
```
#### Para que no pierda su progreso en SakuraBot, estos comandos realizarán un respaldo de su `database.json` y se agregará a la versión más reciente.
> *Estos comandos solo funcionan para TERMUX, REPLIT, LINUX*
</details>

## 🪻 Contribuciones

Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Empuja tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

#### 🫛 Patrocinadores del Proyecto

<details>
<summary><strong>☁️ Sky Ultra Plus</strong> — Hosting</summary>

<div align="center">
  <a href="https://skyultraplus.com">
    <img src="https://qu.ax/wbJoB.png" alt="Sky Ultra Plus Logo" height="125px">
  </a>
</div>

### 🌱 Enlaces Oficiales
| Servicio | Enlace |
|------------|-----------|
| Página Oficial | [Visitar](https://skyultraplus.com) |
| Dashboard | [Abrir](https://dash.skyultraplus.com) |
| Panel de Control | [Abrir](https://panel.skyultraplus.com) |
| Estado de Servicios | [Ver](https://skyultraplus.com/estado)

### 👥 Comunidad y Contacto
| Canal / Chat | Enlace |
|------------------|-----------|
| WhatsApp Canal | [Unirse](https://whatsapp.com/channel/0029VakUvreFHWpyWUr4Jr0g) |
| WhatsApp Grupo | [Unirse](https://chat.whatsapp.com/E6iWpvGuJ8zJNPbN3zOr0D) |
| Discord | [SkyUltraPlus](https://discord.gg/6saUm5cw) |
| GataDios | [WhatsApp](https://wa.me/message/B3KTM5XN2JMRD1) |
| Russell | [WhatsApp](https://api.whatsapp.com/send/?phone=15167096032&text&type=phone_number&app_absent=0) 

</details>

---

### 🐼 DESARROLLADORES
<a href="https://github.com/DevAlexJs/SakuraBot-MD/graphs/contributors">
<img src="https://contrib.rocks/image?repo=DevAlexJs/SakuraBot-MD" /> 
</a>