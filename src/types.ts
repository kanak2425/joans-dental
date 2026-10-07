export type ToothLayerKey = 'overview' | 'enamel' | 'dentin' | 'pulp' | 'root' | 'emerged';

export interface ToothLayerInfo {
  id: ToothLayerKey;
  title: string;
  subtitle: string;
  description: string;
  clinicalFact: string;
  cameraZ: number;
  cameraY: number;
  cameraX: number;
  targetY: number;
  cutawayProgress: number; // 0: solid, 1: fully split/transparent to see inside
  colorTheme: string;
}

export type ServiceId = 'complete' | 'partial' | 'repairs' | 'adjustments';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  anatomicalConnection: string;
  highlightPart: 'full' | 'dentin' | 'enamel' | 'root';
  benefits: string[];
  duration: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  quote: string;
  highlight: string;
  serviceReceived: string;
}
