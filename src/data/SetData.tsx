/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Set {
  id: string,
  name: string,
  series: string,
  printedTotal: number,
  total: number,
  legalities: {
    unlimited: string,
    standard: string,
    expanded: string
  },
  ptcgoCode: string,
  releaseDate: string,
  updatedAt: string,
  images: {
    symbol: string,
    logo: string
  }
}

export const mappedSet = (item: any) => {
  return {
    id: item.id,
    name: item.name,
    series: item.series,
    printedTotal: item.printedTotal,
    total: item.total,
    legalities: {
      unlimited: item.unlimited,
      standard: item.standard,
      expanded: item.expanded
    },
    ptcgoCode: item.ptcgoCode,
    releaseDate: item.releaseDate,
    updatedAt: item.updatedAt,
    images: {
      symbol: item.images,
      logo: item.logo
    }
  }
}