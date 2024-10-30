import { useTransitionManager } from './useTransitionManager';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWithoutTransition<T extends (...args: any[]) => void>(callback: T) {
  const transitions = useTransitionManager();

  return (...args: Parameters<T>) => {
    transitions.disable();

    callback(...args);

    window.requestAnimationFrame(transitions.enable);
  };
}
