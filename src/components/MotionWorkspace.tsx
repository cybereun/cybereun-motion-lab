import { useEffect, useMemo, useState, type CSSProperties, type ElementType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Braces,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Github,
  Layers3,
  LoaderCircle,
  MousePointer2,
  Orbit,
  Search,
  Settings2,
  X,
} from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import { CardArc5 } from './cards/CardArc5';
import { CardArc7 } from './cards/CardArc7';
import { CardLongArc5 } from './cards/CardLongArc5';
import { CardLinearSpread } from './cards/CardLinearSpread';
import { CardCornerFan } from './cards/CardCornerFan';
import { CardStampArc } from './cards/CardStampArc';
import { CardCascadeStagger } from './cards/CardCascadeStagger';
import { CardScatterSpread } from './cards/CardScatterSpread';
import { CardWheelFan } from './cards/CardWheelFan';
import { CardCarousel } from './cards/CardCarousel';
import { CardCoverFlow } from './cards/CardCoverFlow';
import { CardTimeMachine } from './cards/CardTimeMachine';
import { buttonsData, type ButtonConfig } from '../data/buttons';
import { cardsData, type CardConfig } from '../data/cards';
import { loaderGroups, type LoaderConfig } from '../data/loaders';
import { getCardComponentCode, getComponentCode } from '../utils/codeGenerator';
import { loadersCode } from '../utils/loadersCode';

type Category = 'buttons' | 'spreads' | 'carousels' | 'loaders';

type WorkspaceItem =
  | { id: string; kind: 'button'; label: string; description: string; config: ButtonConfig }
  | { id: string; kind: 'card'; label: string; description: string; config: CardConfig }
  | { id: string; kind: 'loader'; label: string; description: string; config: LoaderConfig };

type MotionWorkspaceProps = {
  onExit: () => void;
};

const categoryMeta = {
  buttons: { label: 'Buttons', count: 35, icon: MousePointer2, accent: '#8b7cff' },
  spreads: { label: 'Card Spreads', count: 12, icon: Layers3, accent: '#55d8ff' },
  carousels: { label: '3D Carousels', count: 3, icon: Orbit, accent: '#a678ff' },
  loaders: { label: 'Loaders', count: 128, icon: LoaderCircle, accent: '#52d5e8' },
} satisfies Record<Category, {
  label: string;
  count: number;
  icon: typeof MousePointer2;
  accent: string;
}>;

const accentOptions = ['#56a8ff', '#53d8e8', '#8b7cff'];
const pageSize = 12;

function toItems(category: Category): WorkspaceItem[] {
  if (category === 'buttons') {
    return buttonsData.map((config) => ({
      id: `button-${config.id}`,
      kind: 'button',
      label: config.label,
      description: `${config.interactionType.replaceAll('-', ' ')} motion button`,
      config,
    }));
  }

  if (category === 'loaders') {
    return loaderGroups.flatMap((group) =>
      group.loaders.map((config) => ({
        id: `loader-${config.kebabName}`,
        kind: 'loader' as const,
        label: config.name,
        description: `${group.title} · animated feedback`,
        config,
      })),
    );
  }

  return cardsData
    .filter((card) =>
      category === 'carousels'
        ? card.category === 'carousels'
        : (card.category ?? 'spreads') === 'spreads',
    )
    .map((config) => ({
      id: `card-${config.id}`,
      kind: 'card' as const,
      label: config.label,
      description: config.description,
      config,
    }));
}

const allItems = (Object.keys(categoryMeta) as Category[]).flatMap((category) =>
  toItems(category).map((item) => ({ ...item, category })),
);

export function MotionWorkspace({ onExit }: MotionWorkspaceProps) {
  const [category, setCategory] = useState<Category>('buttons');
  const [selectedId, setSelectedId] = useState('button-1');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [scale, setScale] = useState(112);
  const [glow, setGlow] = useState(62);
  const [accent, setAccent] = useState(accentOptions[0]);
  const [copied, setCopied] = useState(false);

  const categoryItems = useMemo(() => toItems(category), [category]);
  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return categoryItems;
    return allItems
      .filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(normalizedQuery))
      .map(({ category: _category, ...item }) => item);
  }, [categoryItems, query]);

  const visibleItems = searchResults.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.max(1, Math.ceil(searchResults.length / pageSize));
  const selectedItem =
    searchResults.find((item) => item.id === selectedId)
    ?? searchResults[0]
    ?? categoryItems[0];
  const navigationItems = query ? searchResults : categoryItems;
  const selectedIndex = Math.max(0, navigationItems.findIndex((item) => item.id === selectedItem?.id));
  const displayCategory =
    (Object.keys(categoryMeta) as Category[]).find((key) =>
      toItems(key).some((item) => item.id === selectedItem?.id),
    ) ?? category;
  const previewFactor =
    selectedItem?.kind === 'button' ? 1.75
    : selectedItem?.kind === 'loader' ? 1.45
    : 1.05;

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const selectCategory = (nextCategory: Category) => {
    const nextItems = toItems(nextCategory);
    setCategory(nextCategory);
    setSelectedId(nextItems[0]?.id ?? '');
    setQuery('');
    setPage(0);
  };

  const selectItem = (item: WorkspaceItem) => {
    const matchingCategory = (Object.keys(categoryMeta) as Category[]).find((key) =>
      toItems(key).some((candidate) => candidate.id === item.id),
    );
    if (matchingCategory) setCategory(matchingCategory);
    setSelectedId(item.id);
  };

  const moveSelection = (direction: -1 | 1) => {
    if (!navigationItems.length) return;
    const nextIndex = (selectedIndex + direction + navigationItems.length) % navigationItems.length;
    setSelectedId(navigationItems[nextIndex].id);
    setPage(Math.floor(nextIndex / pageSize));
  };

  const copySelectedCode = async () => {
    if (!selectedItem) return;
    let code = '';
    if (selectedItem.kind === 'button') code = getComponentCode(selectedItem.config);
    if (selectedItem.kind === 'card') code = getCardComponentCode(selectedItem.config);
    if (selectedItem.kind === 'loader') {
      const componentName = selectedItem.config.component.displayName ?? selectedItem.config.component.name;
      code = loadersCode[componentName] ?? `npx @subhanhq/amicro@latest add ${selectedItem.config.kebabName}`;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.main
      className={controlsOpen ? 'gallery has-controls' : 'gallery'}
      aria-label="Motion Gallery Studio"
      style={{
        '--gallery-accent': accent,
        '--gallery-glow': glow / 100,
      } as CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="gallery-header">
        <button className="gallery-brand" onClick={onExit} aria-label="Return to intro">
          <img src="/cybereun-icon.png" alt="" />
          <strong>CYBEREUN MOTION LAB</strong>
        </button>
        <div className="gallery-name">Motion Gallery</div>
        <label className="gallery-search">
          <Search />
          <span className="sr-only">Search 178 motions</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder="Search 178 motions"
          />
        </label>
        <nav className="gallery-social" aria-label="Social links">
          <a href="https://github.com/cybereun/cybereun-motion-lab" target="_blank" rel="noreferrer">
            <Github /> GitHub
          </a>
          <a
            href="https://www.threads.com/@gogo_lebi"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit @gogo_lebi on Threads"
          >
            <span className="threads-mark" aria-hidden="true" /> Threads
          </a>
        </nav>
      </header>

      <div className="gallery-body">
        <aside className="component-browser" aria-label="Component browser">
          <div className="browser-heading">
            <div>
              <span>COMPONENT BROWSER</span>
              <strong>{query ? `${searchResults.length} results` : categoryMeta[category].label}</strong>
            </div>
            <Settings2 />
          </div>

          <nav className="browser-categories" aria-label="Component categories">
            {(Object.keys(categoryMeta) as Category[]).map((key) => {
              const Icon = categoryMeta[key].icon;
              return (
                <button
                  key={key}
                  className={category === key && !query ? 'is-active' : ''}
                  onClick={() => selectCategory(key)}
                  title={categoryMeta[key].label}
                  aria-label={categoryMeta[key].label}
                  aria-current={category === key && !query ? 'page' : undefined}
                >
                  <Icon />
                  <span>{categoryMeta[key].count}</span>
                </button>
              );
            })}
          </nav>

          <div className="browser-list">
            {visibleItems.map((item, index) => (
              <button
                key={item.id}
                className={selectedItem?.id === item.id ? 'browser-item is-active' : 'browser-item'}
                onClick={() => selectItem(item)}
                aria-current={selectedItem?.id === item.id ? 'true' : undefined}
              >
                <PreviewGlyph item={item} index={page * pageSize + index} />
                <span className="browser-item-copy">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                <ArrowUpRight />
              </button>
            ))}
            {!visibleItems.length && <p className="browser-empty">검색 결과가 없습니다.</p>}
          </div>

          <div className="browser-pagination">
            <button
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              aria-label="Previous browser page"
            >
              <ChevronLeft />
            </button>
            <span>{page + 1} / {totalPages}</span>
            <button
              onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Next browser page"
            >
              <ChevronRight />
            </button>
          </div>
        </aside>

        <section className="gallery-stage" aria-live="polite">
          <div className="stage-topline">
            <div>
              <span>{categoryMeta[displayCategory].label.toUpperCase()}</span>
              <strong>{String(selectedIndex + 1).padStart(2, '0')} / {String(navigationItems.length).padStart(2, '0')}</strong>
            </div>
            <div className="stage-actions">
              <button className="stage-copy" onClick={copySelectedCode}>
                {copied ? <Check /> : <Copy />}
                {copied ? 'Copied' : 'Copy code'}
              </button>
              <button className="stage-controls" onClick={() => setControlsOpen(true)}>
                <Settings2 /> Controls
              </button>
            </div>
          </div>

          <div className="stage-heading">
            <h1>{selectedItem?.label ?? 'No results'}</h1>
            <p>{selectedItem?.description ?? '다른 검색어를 입력해 보세요.'}</p>
          </div>

          <div className="focused-preview">
            <div className="preview-lines" aria-hidden="true" />
            <div className="preview-floor" aria-hidden="true" />
            {selectedItem && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  className="focused-preview-content"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="focused-preview-scale"
                    style={{ transform: `scale(${(scale / 100) * previewFactor})` }}
                  >
                    <ItemPreview item={selectedItem} />
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
            <span className="preview-hint">Hover or press to preview</span>
          </div>

          <div className="stage-switcher">
            <button onClick={() => moveSelection(-1)} aria-label="Previous component">
              <ArrowLeft /> Previous
            </button>
            <button onClick={() => moveSelection(1)} aria-label="Next component">
              Next <ChevronRight />
            </button>
          </div>
        </section>
      </div>

      <nav className="collection-summary" aria-label="Collection summary">
        {(Object.keys(categoryMeta) as Category[]).map((key) => {
          const Icon = categoryMeta[key].icon;
          return (
            <button key={key} onClick={() => selectCategory(key)} className={category === key ? 'is-active' : ''}>
              <Icon style={{ color: categoryMeta[key].accent }} />
              <span><strong>{categoryMeta[key].label}</strong><small>{categoryMeta[key].count}</small></span>
            </button>
          );
        })}
      </nav>

      <AnimatePresence>
        {controlsOpen && (
          <motion.aside
            className="controls-drawer"
            aria-label="Motion controls"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="controls-heading">
              <div><span>LIVE CONTROLS</span><h2>Preview settings</h2></div>
              <button onClick={() => setControlsOpen(false)} aria-label="Close controls"><X /></button>
            </div>
            <ControlSlider label="Preview scale" value={scale} min={78} max={140} onChange={setScale} />
            <ControlSlider label="Ambient glow" value={glow} min={10} max={100} onChange={setGlow} />
            <div className="control-block">
              <span>Accent color</span>
              <div className="control-accents">
                {accentOptions.map((option) => (
                  <button
                    key={option}
                    style={{ background: option }}
                    className={accent === option ? 'is-active' : ''}
                    onClick={() => setAccent(option)}
                    aria-label={`Use ${option} accent`}
                  />
                ))}
              </div>
            </div>
            <a
              href="https://github.com/cybereun/cybereun-motion-lab"
              target="_blank"
              rel="noreferrer"
              className="drawer-source"
            >
              View source on GitHub <ArrowUpRight />
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function PreviewGlyph({ item, index }: { item: WorkspaceItem; index: number }) {
  if (item.kind === 'button') {
    const Icon = typeof item.config.icon1 === 'string' ? MousePointer2 : item.config.icon1 as ElementType;
    return (
      <span className={`preview-glyph button-glyph variant-${index % 4}`}>
        <Icon />
      </span>
    );
  }

  if (item.kind === 'card') {
    return (
      <span className={`preview-glyph card-glyph variant-${index % 4}`}>
        <i /><i /><i />
      </span>
    );
  }

  return (
    <span className={`preview-glyph loader-glyph variant-${index % 6}`}>
      <i /><i /><i />
    </span>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="control-block">
      <span>{label}<strong>{value}%</strong></span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ItemPreview({ item }: { item: WorkspaceItem }) {
  if (item.kind === 'button') {
    return <AnimatedButton config={item.config} layoutMode="grid" theme="dark" />;
  }

  if (item.kind === 'loader') {
    const Loader = item.config.component;
    return <Loader theme="dark" />;
  }

  return <CardPreview card={item.config} />;
}

function CardPreview({ card }: { card: CardConfig }) {
  const shared = { hovered: true, className: 'gallery-card-demo' };
  const cardStyle = 'bg-[#174b82] border border-blue-200/25';

  switch (card.interactionType) {
    case 'card-arc-5': return <CardArc5 {...shared} cardClassName={cardStyle} />;
    case 'card-arc-7': return <CardArc7 {...shared} cardClassName={cardStyle} />;
    case 'card-long-arc-5': return <CardLongArc5 {...shared} cardClassName={cardStyle} />;
    case 'card-linear-spread': return <CardLinearSpread {...shared} cardClassName={cardStyle} />;
    case 'card-corner-fan': return <CardCornerFan {...shared} cardClassName={cardStyle} />;
    case 'card-stamp-arc': return <CardStampArc {...shared} cardClassName={cardStyle} />;
    case 'card-cascade-stagger': return <CardCascadeStagger {...shared} cardClassName={cardStyle} />;
    case 'card-scatter-spread': return <CardScatterSpread {...shared} cardClassName={cardStyle} />;
    case 'card-wheel-fan': return <CardWheelFan {...shared} cardClassName={cardStyle} />;
    case 'card-carousel': return <CardCarousel {...shared} />;
    case 'card-cover-flow': return <CardCoverFlow {...shared} />;
    case 'card-time-machine': return <CardTimeMachine {...shared} />;
    case 'card-carousel-mono': return <CardCarousel {...shared} isMonochrome />;
    case 'card-cover-flow-mono': return <CardCoverFlow {...shared} isMonochrome />;
    case 'card-time-machine-mono': return <CardTimeMachine {...shared} isMonochrome />;
    default: return <Braces />;
  }
}
