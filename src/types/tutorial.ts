export interface TutorialAction {
  type: 'highlight' | 'toggle' | 'open' | 'navigate';
  target: string;
  text: string;
}

export interface TutorialPage {
  title: string;
  what: string;
  why: string;
  how: string;
  image?: string;
  actions?: TutorialAction[];
}

export interface TutorialCategory {
  id: string;
  name: string;
  pages: TutorialPage[];
}

export interface TutorialData {
  categories: TutorialCategory[];
}
