import { instance } from "common/api";

export const packsApi = {
  getPack: (params: GetPack) => {
    return instance.get<PackResponse>("/cards/pack", { params });
  },
  createPack: (arg: CardsPack) => {
    return instance.post<NewCardPack>("/cards/pack", arg);
  },
  deletePack: (id: string) => {
    return instance.delete<PackResponse>("/cards/pack", {
      params: {
        id
      }
    });
  },
  updatePack: (arg: UpdatePack) => {
    return instance.put<CardsPack>("/cards/pack", arg);
  }
};

export type GetPack = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type Card = {
  cardsCount: number
  created: string
  deckCover: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
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

export type CardsPack = {
  cardsPack: {
    name: string // если не отправить будет таким
    deckCover?: string // не обязателен
    private: boolean // если не отправить будет такой
  }
}

export type UpdatePack = {
  cardsPack: {
    _id: string
    name: string
    deckCover?: string
  }
}

export type NewCardPack = {
  cardsCount: number
  created: string
  deckCover: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
  token: string
  tokenDeathTime: number
}
