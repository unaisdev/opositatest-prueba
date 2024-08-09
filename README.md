
## Objetivo

El objetivo de esta prueba es evaluar tus habilidades en React Native y tu capacidad para optimizar y mejorar código existente. Se espera que proporciones sugerencias para mejorar el rendimiento, la estructura y la mantenibilidad del código. Además, es crucial que la aplicación sea compatible con versiones de Android 6 (Marshmallow) o superiores y versiones de iOS. El código proporcionado implementa una aplicación básica de visualización de libros, y tendrás que identificar áreas de mejora y aplicar tus conocimientos para optimizarlo.

_ - _ -_ - _ -_ - _ -_ - _ -_ - _ -_ - _ -_

# Como lo manejamos

## First sight, split, optimise & reduce. The storytelling.

De primeras encontré que utilizaba 'lodash', una librería antigua que proporciona métodos que ya vienen tiempo atrás implementados en el estándar de JavaScript. Quizás alguna funcion puede ser interesante pero no merece la pena instalar una librería para hacer uso de una única función... 

Me puse bastante nervioso viendo el tamaño del render y pensando, creo que voy a entender bien lo que es la lógica de la app. y quedarme solamente con los estilos. 

Manos a la obra con la definición de la navegación, una primera pantalla para la lista y una segunda del detalle. Para esto instalamos @react-native/navigation, un gestor de navegación robusto, que ofrece la experiencia de navegación nativa a ambas plataformas. Creamos también el hook para consumir el objeto de navegación, ya que las routeProps las recibimos en el mismo componente.

Creamos dichas pantallas para añadir a la navegación, con sus respectivos componentes y hooks.
Componetizamos un poco por aquí y otro por allá, un AppLayout para estandarizar los márgenes de las pantallas y tener en cuenta que la app se vea bien, el item de la lista de libros, cuando la lista está vacía, el botón de sorting...
Creamos unos útiles para hacer el filtrado y sorting de los libros.

Pasamos a querer añadir los libros a una lista de favoritos, también cuando entramos al detalle del libro, necesitamos saber de los ultimos libros a los que hemos accedido (recientes). Para esto necesitamos un gestor de estados global, existen muchas opciones para gestionar el estado, contextos, reducers, Redux... pero me decanté por Zustand, es muy completo, ligero y también nos permite persistir la información de los stores con MMKV, por ejemplo, para hacer aún más segura y performántica la aplicación, comparándolo con AsyncStorage, por ejemplo.

Entonces creamos el tipo principal de Book a partir de la respuesta del request. Generamos el servicio para la petición y lo cacheamos para reducir lo máximo posible las llamadas a la API por posibles reloads, volver a tener que hacer la misma consulta, estados de loading, errores... Todo esto lo podríamos gestionar con un hook global que llama al servicio y tiene sus useStates, pero para reinventar la rueda tenemos @tanstack/react-query, una librería muy popular por gestionar todo lo mencionado y muchas cosas más, staleTime, tiempo en la cache, optimistic updates...

He implementado estas librerías para hacer que el proyecto fuese lo más óptimo posible, tanto en produccion, como en la experiencia de desarrollo. 

# Deliverables (.apk & .ipa)

**Están en la raiz, una carpeta llamada '/deliverables'.**


# How to Run It

### 1. Clona el Repositorio

git clone https://github.com/unaisdev/opositatest-prueba.git
cd opositatestprueba

###2. Instala las Dependencias

> Asegúrate de tener Yarn instalado en tu máquina. 

Instala las dependencias del proyecto con el siguiente comando:

```bash
yarn install
```

### 3. Configuración del Entorno
Asegúrate de tener instaladas las siguientes herramientas:

- Node.js >= 18.0.0
- Watchman (para macOS)
- Android Studio con Android SDK instalado
- Xcode (para iOS)
- Si trabajas en macOS y deseas ejecutar la aplicación en iOS, asegúrate de que Xcode esté instalado y configurado correctamente.

### 4. Ejecutar la Aplicación en Android
Conecta un dispositivo Android o abre un emulador. Si usas VSCode, te recomiendo la extensión de Android Emulator para tener un shortcut para lanzarlos. Luego, ejecuta:

```bash
yarn android
```

Esto compilará y ejecutará la aplicación en un dispositivo o emulador Android.

### 5. Ejecutar la Aplicación en iOS

#### Configuración de CocoaPods para iOS

Para configurar y gestionar las dependencias de iOS en tu proyecto de React Native, sigue estos pasos:

 1. segúrate de Tener CocoaPods Instalado

Primero, asegúrate de tener CocoaPods instalado en tu sistema. Si no lo tienes, puedes instalarlo con el siguiente comando:

```bash
sudo gem install cocoapods
```

2. Navega al Directorio iOS
Abre una terminal y navega al directorio ios de tu proyecto React Native:

```bash
cd ios
```

3. Ejecuta pod install
Dentro del directorio ios, ejecuta el siguiente comando para instalar las dependencias definidas en el archivo Podfile:

```bash
pod install
```

Asegúrate de tener un simulador de iOS abierto o un dispositivo conectado. Luego, ejecuta:

```bash
yarn ios
```

Esto compilará y ejecutará la aplicación en el simulador o dispositivo iOS.

### 6. Iniciar el Servidor de Desarrollo
Puedes iniciar el servidor de desarrollo (Metro) con el siguiente comando:

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

# Notes

Para generar la build en iOS (.ipa), sin tener una cuenta de developer pagada y poder probarla en producción desde un dispositivo físico, debes hacer click en el schema de tu app > Targets (el de "...Test" también) > Signing & Capabilities > Check 'Automatically manage signing' & setear tu cuenta

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
xcodebuild -exportArchive -archivePath ~/Desktop/YourProjectName.xcarchive -exportOptionsPlist **/path/to/**ExportOptions.plist -exportPath ~/Desktop/**pathExport**
