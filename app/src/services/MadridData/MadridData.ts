import { default as axios, AxiosRequestConfig } from 'axios'
import * as request from 'request'
import * as csv from 'csvtojson'

const CODIGO_JAGUER_TEAM = "132752"
const CODIGO_JAGUER_GROUP = "195"

export function getRanking(): Promise<any> {

  const options = {
    host: 'datos.madrid.es',
    port: 80,
    path: '/egob/catalogo/211549-1-juegos-deportivos-actual.csv'
  };

  let a: AxiosRequestConfig;

  return axios.get('http://datos.madrid.es/egob/catalogo/211549-1-juegos-deportivos-actual.csv')


}

// export function getRankingJSON(): Promise<any> {

//   return new Promise((resolve, reject) => {
//     let clasificaciones = []

//     try {
//       csv({ delimiter: ";" })
//         .fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-1-juegos-deportivos-actual.csv'))
//         .on('done', (error) => {
//           console.log('onDone', error)
//           if (error) reject(error)
//           else resolve(clasificaciones)
//         })
//         .on('json', (json) => {
//           console.log('onJSON', json)
//           if (json['Codigo_grupo'] === CODIGO_JAGUER_GROUP) {
//             clasificaciones.push(json)
//           }
//         })
//         .on('error', (error) => {
//           console.log('Error getting Madrid ranking data.')
//           reject(error)
//         })
//     } catch (error) {
//       reject(error)
//     }

//   })
// }

type Campo = {
  campo: string
  coordenadas: {
    x: string,
    y: string
  }
}

type Partido = {
  fecha: Date
  campo: Campo
  jornada: string
  local: string
  visitante: string
  resultadoLocal: string
  resultadoVisitante: string
}


export async function getCalendarJSON(): Promise<Partido[]> {

  return await csv({ delimiter: ";" })
    .fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-3-juegos-deportivos-actual.csv'))
    .then((clasificaciones) => {
      const clasifica: Partido[] = clasificaciones
        .filter((clasificacion) => {
          return (clasificacion['Codigo_equipo1'] === CODIGO_JAGUER_TEAM) ||
            (clasificacion['Codigo_equipo2'] === CODIGO_JAGUER_TEAM)
        })
        .map((clasificacion) => (
        
        {
          fecha: buildDate(clasificacion['Fecha'], clasificacion['Hora']),
          campo: {
            campo: clasificacion['Campo'],
            coordenadas: {
              x: clasificacion['COORD_X_CAMPO'],
              y: clasificacion['COORD_Y_CAMPO']
            }
          },
          jornada: clasificacion['Jornada'],
          local: clasificacion['Equipo_local'],
          visitante: clasificacion['Equipo_visitante'],
          resultadoLocal: clasificacion['Resultado1'],
          resultadoVisitante: clasificacion['Resultado2']
        }))
        .sort((a, b) => {
          if (a.fecha > b.fecha) {
            return 1;
          } else if (a.fecha < b.fecha) {
            return -1;
          }
          return 0;
        })
      return clasifica
    })
}

const buildDate = (date: string, time: string) => {
  const dateString = date.split('-')
  const timeString = time.split(':')
  const matchDate = new Date()
  matchDate.setFullYear(Number(dateString[0]), Number(dateString[1]), Number(dateString[2]))
  matchDate.setHours(Number(timeString[0]), Number(timeString[1]))
  return matchDate
}

// export function getCalendarJSON2(): Promise<any> {

//   console.log('INTENTANDO CONSEGUIR CALENDARIO')

//   return new Promise((resolve, reject) => {
//     let clasificaciones = []

//     try {
//       csv({ delimiter: ";" })
//         .fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-3-juegos-deportivos-actual.csv'))
//         .on('done', (error) => {
//           if (error) reject(error)
//           else resolve(clasificaciones)
//         })
//         .on('json', (json) => {
//           console.log(json)
//           if (
//             json['Codigo_equipo1'] === CODIGO_JAGUER_TEAM ||
//             json['Codigo_equipo2'] === CODIGO_JAGUER_TEAM
//           ) {
//             clasificaciones.push(json)
//           }
//         })
//         .on('error', (error) => {
//           console.log('Error getting Madrid ranking data.')
//           reject(error)
//         })
//     } catch (error) {
//       reject(error)
//     }

//   })
// }