interface IFaq {
  id: number;
  service: {
    id: number;
    name: string;
  };
  question: string;
  answer: string;
}

interface IFormInitialState {
  parent_service_id: string;
  child_service_id: string;
  question: string;
  answer: string;
}

export type { IFaq, IFormInitialState };
