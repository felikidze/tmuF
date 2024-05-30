interface ANSWER_MODEL {
    id: number;
    text: string;
    suggestion?: string;
}

export enum ANSWER_TYPE {
    SINGLE,
    IMAGE,
    MULTI,
}

export interface QUESTION_MODEL {
    id: number;
    title: string;
    answers?: ANSWER_MODEL[];
    answerType: ANSWER_TYPE;
    selected?: number[];
}

export type RESPONSE_QUESTION_MODEL = Omit<QUESTION_MODEL, 'selected'>;

export interface CONTEXT_DTO {
    questionId: number;
    answersIds: number[];
}

export enum ONCOLOGY_CATEGORY {
    MELANOMA,
    LUNGS,
    STOMA,
    SEX_MOMENT,
    ALL
}