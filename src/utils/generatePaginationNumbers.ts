

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

  // si el numero es menor a 7 vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3, puntos suspensivos y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // si la pagina actual esta entra las ultimas 
  // mostrar las primeras dos y las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // Si la pagina actual esta en otro lugar medio
  //mostrar la primera pagina, puntos suspensivos y la pagina actual y demas
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}