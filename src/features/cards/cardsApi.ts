import { instance } from "common/api";

export const cardsApi = {
  getCards: (params: CardRequest) => {
    return instance.get<CardResponse>("/cards/card", { params });
  },
  createCard: (arg: CreateRequest) => {
    return instance.post("/cards/card", arg);
  },
  deleteCard: (id: string) => {
    return instance.delete("/cards/card", {
      params: {
        id
      }
    });
  },
  updateCard: (arg: UpdateRequest) => {
    return instance.put("/cards/card", arg);
  },
  gradeCard: (arg: { grade: number, card_id: string } ) => {
    return instance.put<UpdatedGrade>("/cards/grade", arg);
  }
};

export type CardRequest = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type CardType = {
  answer: string
  answerImg: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  questionImg: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}

export type CardResponse = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: string
  packDeckCover: string
  packName: string
  packPrivate: boolean
  packUpdated: string
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type CreateRequest = {
  card: {
    cardsPack_id: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
  }
}

export type UpdateRequest = {
  card: {
    _id: string
    question: string
    answer: string
  }
}

export type UpdatedGrade = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
