
export type Snack = 'Popcorn 🍿' | 'Chocolate 🍫' | 'Pizza 🍕' | 'Ice Cream 🍦' | 'Candy 🍬';

export interface ProposalState {
  hasAccepted: boolean;
  selectedSnack: Snack | null;
}
