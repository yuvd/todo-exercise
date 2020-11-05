export interface SectionProps {
	todoCards: JSX.Element[];
	setTodoCards: (todoCards: JSX.Element[]) => void;
	doneCards: JSX.Element[];
	setDoneCards: (doneCards: JSX.Element[]) => void;
}
