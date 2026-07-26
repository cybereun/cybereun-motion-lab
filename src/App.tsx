import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { IntroPage } from './components/IntroPage';
import { MotionWorkspace } from './components/MotionWorkspace';

type AppProps = {
  initiallyEntered?: boolean;
};

export default function App({ initiallyEntered = false }: AppProps) {
  const [hasEntered, setHasEntered] = useState(initiallyEntered);

  return (
    <AnimatePresence mode="wait">
      {hasEntered ? (
        <MotionWorkspace onExit={() => setHasEntered(false)} />
      ) : (
        <IntroPage
          onEnter={() => {
            window.scrollTo(0, 0);
            setHasEntered(true);
          }}
        />
      )}
    </AnimatePresence>
  );
}
