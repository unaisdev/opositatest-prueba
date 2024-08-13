
# Objetivo

El objetivo de esta prueba es evaluar tus habilidades en React Native y tu capacidad para optimizar y mejorar código existente. Se espera que proporciones sugerencias para mejorar el rendimiento, la estructura y la mantenibilidad del código. Además, es crucial que la aplicación sea compatible con versiones de Android 6 (Marshmallow) o superiores y versiones de iOS. El código proporcionado implementa una aplicación básica de visualización de libros, y tendrás que identificar áreas de mejora y aplicar tus conocimientos para optimizarlo.


# Estructura de Carpetas

```plaintext
├── src/
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── storage/
│   ├── types/
│   ├── utils/
```

# Librerías desinstaladas

- `lodash`: no compensa el uso que se le da en este caso. Para ello, utilizamos las funciones nativas de la API de JavaScript (filter, sort...).

# Librerías instaladas

- `axios`: manejo de peticiones asíncronas
- `@react-navigation/native`: manejo de la navegación entre pantallas
- `@tanstack/react-query`: gestiond de estado, caching, refetch, isLoading, error...
- `react-native-mmkv`: persistencia de datos
- `react-native-reanimated`: animaciones
- `zustand`: estado global


# Deliverables (.apk & .ipa)

Están en la raiz, una carpeta llamada '/deliverables'.


# Como levantar el proyecto

### 1. Clona el Repositorio

```cmd
git clone https://github.com/unaisdev/opositatest-prueba.git 

cd opositatestprueba
```

### 2. Instala las Dependencias

> Asegúrate de tener npm, Yarn o bun instalado en tu máquina. 

Instala las dependencias con uno de los siguientes comandos:

```bash
yarn
npm i
bun i
```

### 3. Configuración del Entorno
Asegúrate de tener instaladas las siguientes herramientas, si no, puedes seguir la guía de [React Native oficial](https://reactnative.dev/docs/set-up-your-environment):

- Node.js >= v18.19.0
- Watchman (para macOS) 2024.01.15.00
- JDK 17.0.9 (zulu)
- Android Studio Hedgehog | 2023.1.1 Patch 1 (December 26, 2023)
- Android SDK 34
- Xcode (macOS) Version 15.2 (15C500b)

> Puedes saber qué versiones del entorno tienes mediante: `npx react-native info`

### 4. Ejecutar la Aplicación en Android
Conecta un dispositivo Android o abre un emulador.

>  Si usas VSCode, te recomiendo la extensión de [Android Emulator](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate) y así tener un shortcut (Cmd + Shift + P > Emulator) para lanzarlos.

Luego, ejecuta:

```bash
yarn android
```

### 5. Ejecutar la Aplicación en iOS

Navega al directorio iOS
Abre una terminal y navega al directorio `/ios`:

```bash
cd ios
```

Dentro del directorio `/ios`, ejecuta el siguiente comando para instalar las dependencias:

```bash
pod install
```

Ejecuta la aplicación:

```bash
yarn ios
```

### 6. Iniciar el Servidor de Desarrollo

```bash
yarn start
```

### 7. Ejecutar Tests
Si deseas ejecutar los tests del proyecto, puedes hacerlo con:

```bash
yarn test
```

### 8. Generar una Build de Producción para Android
Si deseas generar una build de producción para Android, ejecuta:

```bash
yarn build:android
```

\
\
\
 .

# Notas personales

Para generar la build en iOS (.ipa), sin tener una cuenta de developer pagada y poder probarla en producción desde un dispositivo físico, debes hacer click en el schema de tu app > Targets (el de "...Test" también) > Signing & Capabilities > En todos los stages (debug, release...), check 'Automatically manage signing' & setear tu cuenta

## Limpiar build anterior (opcional)
xcodebuild clean -workspace YourProjectName.xcworkspace -scheme YourProjectName -configuration Release

## Generar el archivo .xcarchive
xcodebuild archive -workspace YourProjectName.xcworkspace -scheme YourProjectName -configuration Release -sdk iphoneos -archivePath ~/Desktop/YourProjectName.xcarchive

## Generar ExportOptions.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
   <dict>
      <key>method</key>
      <string>development</string>
      <key>provisioningProfiles</key>
      <dict>
         <key>org.reactjs.native.example.opositatestprueba</key>
         <string>Unai Canales</string>
      </dict>
   </dict>
</plist>
```

## Exportar el archivo .ipa
xcodebuild -exportArchive -archivePath ~/Desktop/opositatestprueba.xcarchive -exportOptionsPlist **/path/to/**ExportOptions.plist -exportPath ~/Desktop/**pathExport**