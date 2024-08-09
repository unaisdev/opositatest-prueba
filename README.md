# Prueba Técnica para OpositaTest

¡Bienvenido/a a la prueba técnica de OpositaTest!

## Objetivo

El objetivo de esta prueba es evaluar tus habilidades en React Native y tu capacidad para optimizar y mejorar código existente. Se espera que proporciones sugerencias para mejorar el rendimiento, la estructura y la mantenibilidad del código. Además, es crucial que la aplicación sea compatible con versiones de Android 6 (Marshmallow) o superiores y versiones de iOS. El código proporcionado implementa una aplicación básica de visualización de libros, y tendrás que identificar áreas de mejora y aplicar tus conocimientos para optimizarlo.

## Instrucciones

1. **Revisión del Código:**

   - Analiza el código proporcionado.
   - Identifica áreas que podrían mejorarse, ya sea en términos de rendimiento, estructura del código o buenas prácticas de desarrollo.

2. **Mejoras Sugeridas:**

   - Propón mejoras específicas para optimizar el rendimiento, la legibilidad y la mantenibilidad del código.
   - Implementa estas mejoras.
   - Asegúrate de que la aplicación funcione correctamente en las diferentes plataformas.
   - Se valorara positivamente el uso de alguna micro-animación.
   - El uso de tests.
   - Se valorarán las buenas prácticas en los commits (atómicos, explicados, etc..)

3. **Compatibilidad con Android e iOS:**

   - Verifica que la aplicación sea compatible con Android e iOS.
   - Ajusta el código según las limitaciones de las versiones mencionadas para garantizar una funcionalidad óptima en ambos sistemas operativos.

4. **Pruebas y Validación:**

   - Verifica que no se hayan introducido errores o problemas de rendimiento en la aplicación.
   - Documenta los pasos para ejecutar las pruebas y validarla.

5. **Nuevas funcionabilidades (opcional)**

- Ordenación Alfabética: Se valorará muy positivamente la implementación de una funcionalidad que permita ordenar los libros alfabéticamente y que esta ordenación persista incluso si se cierra la aplicación.

6. **Entrega:**
   - Sube tus cambios a un repositorio en GitHub.
   - Incluye un archivo `README.md` en el repositorio que explique las mejoras realizadas.
   - Entrega al menos un binario de alguna de las plataformas (Android `.apk/.aab` o iOS `.ipa`).
   - Incluye instrucciones para la instalación y ejecución de la aplicación en el `README.md`.

## App

<img src="./photos/ios.png" alt="Imagen de Ejemplo 1" width="200" height="400"/>
<img src="./photos/android.png" alt="Imagen de Ejemplo 2" width="200" height="400"/>



# HOW I EMBRACE IT

## First sight, split, optimise, reduce & storytelling

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
xcodebuild -exportArchive -archivePath ~/Desktop/YourProjectName.xcarchive -exportOptionsPlist **/path/to/**ExportOptions.plist -exportPath ~/Desktop/pathExport
