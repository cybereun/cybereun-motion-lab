import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Braces,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Copy,
  Github,
  Layers3,
  LoaderCircle,
  MousePointer2,
  Orbit,
  Search,
  Sparkles,
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
  buttons: { label: 'Buttons', eyebrow: 'Micro interactions', icon: MousePointer2 },
  spreads: { label: 'Card Spreads', eyebrow: 'Spatial layouts', icon: Layers3 },
  carousels: { label: '3D Carousels', eyebrow: 'Depth systems', icon: Orbit },
  loaders: { label: 'Loaders', eyebrow: 'Kinetic feedback', icon: LoaderCircle },
} satisfies Record<Category, { label: string; eyebrow: string; icon: typeof MousePointer2 }>;

const accentOptions = ['#57a5ff', '#54d6ff', '#8b7cff'];

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

const allItemCount =
  buttonsData.length
  + cardsData.length
  + loaderGroups.reduce((count, group) => count + group.loaders.length, 0);

export function MotionWorkspace({ onExit }: MotionWorkspaceProps) {
  const [category, setCategory] = useState<Category>('buttons');
  const [selectedId, setSelectedId] = useState('button-1');
  const [query, setQuery] = useState('');
  const [scale, setScale] = useState(100);
  const [glow, setGlow] = useState(72);
  const [speed, setSpeed] = useState(140);
  const [accent, setAccent] = useState(accentOptions[0]);
  const [copied, setCopied] = useState(false);

  const categoryItems = useMemo(() => toItems(category), [category]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return categoryItems;
    return categoryItems.filter((item) =>
      `${item.label} ${item.description}`.toLowerCase().includes(normalizedQuery),
    );
  }, [categoryItems, query]);

  const selectedItem =
    filteredItems.find((item) => item.id === selectedId)
    ?? filteredItems[0]
    ?? categoryItems[0];
  const selectedIndex = Math.max(0, filteredItems.findIndex((item) => item.id === selectedItem?.id));

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
  };

  const moveSelection = (direction: -1 | 1) => {
    if (!filteredItems.length) return;
    const nextIndex = (selectedIndex + direction + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[nextIndex].id);
  };

  const copySelectedCode = async () => {
    if (!selectedItem) return;
    let code = '';
    if (selectedItem.kind === 'button') code = getComponentCode(selectedItem.config);
    if (selectedItem.kind === 'card') code = getCardComponentCode(selectedItem.config);
    if (selectedItem.kind === 'loader') {
      const componentName = selectedItem.config.component.displayName
        ?? selectedItem.config.component.name;
      code = loadersCode[componentName] ?? `npx @subhanhq/amicro@latest add ${selectedItem.config.kebabName}`;
    }
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <motion.main
      className="atlas"
      aria-label="Kinetic Atlas workspace"
      style={{ '--atlas-accent': accent, '--atlas-glow': glow / 100 } as CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <aside className="atlas-rail">
        <button className="atlas-brand" onClick={onExit} aria-label="Return to intro">
          <img src="/cybereun-icon.png" alt="" />
          <span>CM</span>
        </button>

        <nav className="atlas-categories" aria-label="Component categories">
          {(Object.keys(categoryMeta) as Category[]).map((key) => {
            const Icon = categoryMeta[key].icon;
            return (
              <button
                key={key}
                className={category === key ? 'is-active' : ''}
                onClick={() => selectCategory(key)}
                title={categoryMeta[key].label}
                aria-label={categoryMeta[key].label}
                aria-current={category === key ? 'page' : undefined}
              >
                <Icon />
                <span>{categoryMeta[key].label}</span>
              </button>
            );
          })}
        </nav>

        <div className="atlas-rail-links">
          <a
            href="https://www.threads.com/@gogo_lebi"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit @gogo_lebi on Threads"
          >
            <span className="threads-mark" aria-hidden="true" />
            <span>Threads</span>
          </a>
          <a
            href="https://github.com/cybereun/cybereun-motion-lab"
            target="_blank"
            rel="noreferrer"
            aria-label="Open cybereun-motion-lab on GitHub"
          >
            <Github />
            <span>GitHub</span>
          </a>
        </div>
      </aside>

      <section className="atlas-main">
        <header className="atlas-header">
          <div>
            <p>CYBEREUN MOTION LAB / 2026</p>
            <h1>Kinetic Atlas</h1>
          </div>
          <label className="atlas-search">
            <Search />
            <span className="sr-only">Search current collection</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${categoryMeta[category].label.toLowerCase()}`}
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="atlas-status">
            <span />
            <div>
              <strong>LIVE LIBRARY</strong>
              <small>{allItemCount} MOTIONS</small>
            </div>
          </div>
        </header>

        <div className="atlas-canvas">
          <div className="atlas-stage" aria-live="polite">
            <div className="atlas-grid" aria-hidden="true" />
            <div className="atlas-orbit atlas-orbit-one" aria-hidden="true" />
            <div className="atlas-orbit atlas-orbit-two" aria-hidden="true" />

            <div className="atlas-stage-meta">
              <p>{categoryMeta[category].eyebrow}</p>
              <span>Drag · hover · click</span>
            </div>

            <div className="atlas-index">
              <strong>{String(selectedIndex + 1).padStart(3, '0')}</strong>
              <span>/ {String(filteredItems.length).padStart(3, '0')}</span>
            </div>

            {selectedItem ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  className="atlas-preview"
                  style={{ transform: `scale(${scale / 100})` }}
                  initial={{ opacity: 0, scale: 0.86, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -12 }}
                  transition={{ duration: Math.max(0.2, 230 / speed), ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="atlas-preview-aura"
                    animate={{ scale: [0.94, 1.06, 0.94], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: Math.max(1.2, 400 / speed), repeat: Infinity }}
                  />
                  <div className="atlas-preview-content">
                    <ItemPreview item={selectedItem} />
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="atlas-empty">No motion found.</div>
            )}

            <div className="atlas-title">
              <span>{categoryMeta[category].label}</span>
              <h2>{selectedItem?.label ?? 'No results'}</h2>
              <p>{selectedItem?.description}</p>
            </div>

            <div className="atlas-stage-nav">
              <button onClick={() => moveSelection(-1)} aria-label="Previous component">
                <ChevronLeft />
              </button>
              <button onClick={() => moveSelection(1)} aria-label="Next component">
                <ChevronRight />
              </button>
            </div>
          </div>

          <aside className="atlas-inspector" aria-label="Inspector panel">
            <div className="inspector-heading">
              <div>
                <p>LIVE CONTROLS</p>
                <h2>Inspector</h2>
              </div>
              <CircleDot />
            </div>

            <ControlSlider label="Motion speed" value={speed} min={80} max={240} unit="%" onChange={setSpeed} />
            <ControlSlider label="Preview scale" value={scale} min={70} max={130} unit="%" onChange={setScale} />
            <ControlSlider label="Ambient glow" value={glow} min={10} max={100} unit="%" onChange={setGlow} />

            <div className="inspector-block">
              <div className="inspector-label">
                <span>Accent signal</span>
                <strong>{accent.toUpperCase()}</strong>
              </div>
              <div className="accent-options">
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

            <div className="inspector-data">
              <div><span>Engine</span><strong>Motion / React</strong></div>
              <div><span>Interaction</span><strong>{selectedItem?.kind ?? '—'}</strong></div>
              <div><span>Status</span><strong className="status-ready">Ready</strong></div>
            </div>

            <button className="copy-code" onClick={copySelectedCode} disabled={!selectedItem}>
              {copied ? <Check /> : <Copy />}
              <span>{copied ? 'Copied to clipboard' : 'Copy component code'}</span>
            </button>
            <a
              className="open-repository"
              href="https://github.com/cybereun/cybereun-motion-lab"
              target="_blank"
              rel="noreferrer"
            >
              View source <ArrowUpRight />
            </a>
          </aside>
        </div>

        <section className="atlas-filmstrip" aria-label="Component filmstrip">
          <div className="filmstrip-label">
            <span>COLLECTION</span>
            <strong>{categoryMeta[category].label}</strong>
            <small>{filteredItems.length} entries</small>
          </div>
          <div className="filmstrip-track">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={selectedItem?.id === item.id ? 'is-active' : ''}
                aria-current={selectedItem?.id === item.id ? 'true' : undefined}
              >
                <span className="filmstrip-number">{String(index + 1).padStart(2, '0')}</span>
                <span className={`filmstrip-art is-${item.kind}`}>
                  {item.kind === 'button' && <MousePointer2 />}
                  {item.kind === 'card' && <Layers3 />}
                  {item.kind === 'loader' && <LoaderCircle />}
                </span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>
        </section>
      </section>
    </motion.main>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="inspector-block">
      <span className="inspector-label">
        <span>{label}</span>
        <strong>{value}{unit}</strong>
      </span>
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
  const shared = {
    hovered: true,
    className: 'atlas-card-demo',
  };
  const cardStyle = 'bg-[#123d72] border border-blue-200/20';

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
