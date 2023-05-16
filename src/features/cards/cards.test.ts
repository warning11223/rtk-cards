import { CardRequest, CardResponse, CardType } from "features/cards/cardsApi";
import { cardsReducer, cardsThunks } from "features/cards/cardsSlice";

describe("cardsReducer", () => {
  const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: ""
  };

  it("should fetchCards work correctly", () => {
    const response: CardResponse = {
      cards: [
        {
          answer: 'string',
          question: 'string',
          cardsPack_id: 'string',
          grade: 1,
          shots: 1,
          user_id: 'string',
          created: 'string',
          updated: 'string',
          _id: 'string'
        }
      ],
      cardsTotalCount: 111,
      page: 11,
      minGrade: 11,
      pageCount: 11,
      packUserId: "12",
      maxGrade: 11
    };

    const params: CardRequest = {
      page: 11,
      pageCount: 11,
      cardsPack_id: "11",
      cardQuestion: "12",
      max: 11,
      min: 11,
      sortCards: "12",
      cardAnswer: "12"
    };

    const action = cardsThunks.getCards.fulfilled({ data: response }, "requestId", { ...params });

    const state = cardsReducer(initialState, action);

    expect(state).toEqual(response)

  });
});
