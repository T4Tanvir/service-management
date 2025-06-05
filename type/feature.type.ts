interface IFeature {
  id: number;
  service: {
    id: number;
    name: string;
  };
  feature_text: string;
}

interface IFormInitialState {
  parent_service_id: string;
  child_service_id: string;
  feature_text: string;
}

export type { IFeature, IFormInitialState };
