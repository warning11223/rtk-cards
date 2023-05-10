import { instance } from "common/api";

export const packsApi = {
  getPack: (params: GetPack) => {
    return instance.get<PackResponse>("/cards/pack", { params });
  },
  createPack: (arg: CreatePack) => {
    return instance.post<PackResponse>("/cards/pack", arg);
  },
  deletePack: (id: string) => {
    return instance.delete<PackResponse>("/cards/pack", {
      params: {
        id
      }
    });
  },
  updatePack: (arg: UpdatePack) => {
    return instance.put<PackResponse>("/cards/pack", arg);
  }
};

export type GetPack = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: number
  page?: number
  pageCount?: number
  user_id?: number
}

export type Card = {
  _id: string
  user_id: string
  user_name: string
  name: string
  private: boolean
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
}

export type PackResponse = {
  cardPacks: Card[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
}

type CreatePack = {
  name: string // если не отправить будет таким
  deckCover: string // не обязателен
  private: boolean // если не отправить будет такой
}

type UpdatePack = {
  _id: string
  name: string
}
