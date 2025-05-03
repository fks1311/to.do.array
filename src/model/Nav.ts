export interface NavAtom {
  nav: string;
  pendingCount: number;
  completedCount?: number;
}

export interface NavItem {
  icon: React.ReactNode;
  nav: string;
  pendingCount: number;
}
