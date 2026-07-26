import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { IntroPage } from './components/IntroPage';
import { MotionWorkspace } from './components/MotionWorkspace';
import OriginalGalleryApp from './OriginalGalleryApp';

type AppProps = {
  initiallyEntered?: boolean;
};

type LibraryView = 'overview' | 'detail';
type OverviewPage = 'home' | 'cli' | 'skills';

export default function App({ initiallyEntered = false }: AppProps) {
  const [hasEntered, setHasEntered] = useState(initiallyEntered);
  const [libraryView, setLibraryView] = useState<LibraryView>('overview');
  const [overviewPage, setOverviewPage] = useState<OverviewPage>('home');

  return (
    <AnimatePresence mode="wait">
      {hasEntered ? (
        <div className="dual-view-shell">
          {(libraryView === 'detail' || overviewPage === 'home') && (
            <nav className="library-view-switcher" aria-label="Library view">
              <button
                className={libraryView === 'overview' ? 'is-active' : ''}
                onClick={() => setLibraryView('overview')}
                aria-current={libraryView === 'overview' ? 'page' : undefined}
              >
                전체 보기
              </button>
              <button
                className={libraryView === 'detail' ? 'is-active' : ''}
                onClick={() => setLibraryView('detail')}
                aria-current={libraryView === 'detail' ? 'page' : undefined}
              >
                개별 보기
              </button>
            </nav>
          )}
          {libraryView === 'overview' ? (
            <OriginalGalleryApp initiallyEntered onPageChange={setOverviewPage} />
          ) : (
            <MotionWorkspace onExit={() => setHasEntered(false)} />
          )}
        </div>
      ) : (
        <IntroPage
          onEnter={() => {
            window.scrollTo(0, 0);
            setHasEntered(true);
            setLibraryView('overview');
            setOverviewPage('home');
          }}
        />
      )}
    </AnimatePresence>
  );
}
