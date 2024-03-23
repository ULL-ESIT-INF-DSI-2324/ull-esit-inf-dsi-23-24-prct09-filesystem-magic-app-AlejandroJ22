[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/T5K9tzcv)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/build.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/build.yml)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/coveralls.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-AlejandroJ22/actions/workflows/node.js.yml)


Implementar el metodo plantilla y hook!!!


Al principio en el programa se intento usar un array de objetos del tipo carta, pero al final se optó por usar un mapa de cartas  basado en su id

Uso:
node dist/src/magic/magic-app.js add --user "ale" --id 1 --name "Black Lotus" --mana 0 --color "colorless" --type "Artifact" --rarity "mythic" --rules "T: Sacrifice Black Lotus: Add three mana of any one color to your mana pool." --value 20000

Nota: se prefiere el uso de console.log para indicar los fallos ya que al estar orientado a comandos no nos hace falta un control tan preciso del flujo de errores como si el programa se ejecutase continuamente y porque daba problemas con el uso de chalk o de yargs.