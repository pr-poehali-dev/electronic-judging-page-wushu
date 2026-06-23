import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/0a57a3a1-a3a7-4fc8-9ea3-5708ec24ae6a/files/e33bd3da-bc31-488a-8097-ed31b323f4db.jpg';

const gallery = [
  {
    src: 'https://cdn.poehali.dev/projects/0a57a3a1-a3a7-4fc8-9ea3-5708ec24ae6a/files/654f0d90-a1bd-4803-ac08-24f47539151b.jpg',
    caption: 'Судейская бригада с пультами',
  },
  {
    src: 'https://cdn.poehali.dev/projects/0a57a3a1-a3a7-4fc8-9ea3-5708ec24ae6a/files/a215745f-9903-4a5b-88a5-68ee4ff2c47b.jpg',
    caption: 'Поединок на турнире',
  },
  {
    src: 'https://cdn.poehali.dev/projects/0a57a3a1-a3a7-4fc8-9ea3-5708ec24ae6a/files/91c0aa1d-0b1f-4089-8c23-ee298a1ed947.jpg',
    caption: 'Электронное табло результата',
  },
  {
    src: 'https://cdn.poehali.dev/projects/0a57a3a1-a3a7-4fc8-9ea3-5708ec24ae6a/files/3421ffe8-9cc6-4770-a6d0-4a91798230dc.jpg',
    caption: 'Объявление победителя',
  },
];

const problems = [
  { icon: 'EyeOff', title: 'Субъективность', text: 'Оценки судей расходятся, а ручной подсчёт скрывает реальную картину боя.' },
  { icon: 'Clock', title: 'Задержки', text: 'Бумажные протоколы и сверка баллов тормозят турнир и нервируют команды.' },
  { icon: 'TriangleAlert', title: 'Споры и ошибки', text: 'Опротестования решений из-за человеческого фактора подрывают доверие.' },
  { icon: 'FileX', title: 'Нет прозрачности', text: 'Зрители и тренеры не видят, как формируется итоговый счёт поединка.' },
];

const features = [
  { icon: 'Users', title: 'Синхронное судейство', text: 'Несколько судей выставляют оценки одновременно — система мгновенно сводит результат.' },
  { icon: 'Zap', title: 'Результат за секунды', text: 'Итоговый счёт раунда виден сразу после удара гонга. Никаких бумаг.' },
  { icon: 'ShieldCheck', title: 'Защита от споров', text: 'Каждое действие фиксируется с таймкодом — полный аудит поединка.' },
  { icon: 'Monitor', title: 'Табло для зала', text: 'Живой счёт выводится на большой экран для зрителей и комментаторов.' },
  { icon: 'Wifi', title: 'Работает без интернета', text: 'Локальная сеть на площадке — стабильно даже в спортзале без связи.' },
  { icon: 'ChartColumn', title: 'Аналитика и архив', text: 'Статистика бойцов, история турниров и выгрузка протоколов в один клик.' },
];

const steps = [
  { num: '01', title: 'Судьи подключаются', text: 'Каждый судья получает планшет или пульт со своим профилем.' },
  { num: '02', title: 'Оценивают в реальном времени', text: 'Баллы за удары, броски и приёмы выставляются параллельно.' },
  { num: '03', title: 'Система сводит результат', text: 'Алгоритм усредняет и проверяет оценки по правилам саньда.' },
  { num: '04', title: 'Счёт на табло', text: 'Объективный итог мгновенно появляется на экране зала.' },
];

const cases = [
  { tag: 'Чемпионат региона', title: '64 боя за день', text: 'Турнир на 4 ринга прошёл без единого спора по баллам. Экономия 3 часов.', stat: '0', statLabel: 'опротестований' },
  { tag: 'Кубок федерации', title: '5 судей онлайн', text: 'Синхронная работа бригады судей ускорила поединки в 2 раза.', stat: '2×', statLabel: 'быстрее' },
  { tag: 'Первенство клуба', title: 'Трансляция счёта', text: 'Зрители следили за баллами в прямом эфире на табло и в стриме.', stat: '100%', statLabel: 'прозрачность' },
];

const kits = [
  {
    name: 'Беспроводная',
    icon: 'Wifi',
    tag: 'Мобильность',
    price: 'Узнать цену',
    period: '',
    desc: 'Для выездных турниров и залов без кабельной инфраструктуры',
    hardware: ['5 беспроводных судейских пультов', '3 светодиодные лампы результата (Wi-Fi)', 'Центральный роутер с точкой доступа', 'Планшет-табло для главного судьи'],
    software: ['Синхронизация до 50 мс', 'Работает в локальной сети без интернета', 'Заряда батарей на 8 часов'],
    highlight: false,
  },
  {
    name: 'Проводная',
    icon: 'Cable',
    tag: 'Надёжность',
    price: 'Узнать цену',
    period: '',
    desc: 'Для стационарных площадок и официальных соревнований',
    hardware: ['5 проводных судейских пультов (USB)', '3 лампы результата (кабель)', 'Центральный коммутатор', 'Планшет-табло для главного судьи'],
    software: ['Синхронизация до 5 мс', 'Нет радиопомех — стабильность 100%', 'Не требует зарядки пультов'],
    highlight: true,
  },
  {
    name: 'Офлайн',
    icon: 'HardDrive',
    tag: 'Автономность',
    price: 'Узнать цену',
    period: '',
    desc: 'Полностью автономный комплект без сетевой инфраструктуры',
    hardware: ['5 автономных пультов с дисплеем', '3 лампы результата (Bluetooth)', 'Мини-сервер на базе Raspberry Pi', 'Экранный модуль табло (HDMI)'],
    software: ['Работает без роутера и интернета', 'Хранит историю боёв локально', 'Экспорт результатов на флешку'],
    highlight: false,
  },
];

const Index = () => {
  const [judges, setJudges] = useState([8.2, 8.5, 7.9]);
  const [total, setTotal] = useState(8.2);
  const [selectedKit, setSelectedKit] = useState('Проводная');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const chooseKit = (name: string) => {
    setSelectedKit(name);
    document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const id = setInterval(() => {
      const next = [0, 1, 2].map(() => +(7 + Math.random() * 2.5).toFixed(1));
      setJudges(next);
      setTotal(+(next.reduce((a, b) => a + b, 0) / next.length).toFixed(1));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary flex items-center justify-center glow-red">
              <Icon name="Swords" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide">SANDA<span className="text-primary">SCORE</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-colors">Проблема</a>
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#cases" className="hover:text-foreground transition-colors">Кейсы</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a>
          </nav>
          <Button asChild className="font-display uppercase tracking-wider">
            <a href="#buy">Купить</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center diag-clip">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Ушу саньда" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        </div>
        <div className="absolute inset-0 grid-texture opacity-30" />
        <div className="container relative z-10 pt-24 pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Электронное судейство ушу саньда
            </div>
            <h1 className="font-display font-bold uppercase leading-[0.95] text-5xl sm:text-6xl lg:text-7xl mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Точность<br />каждого <span className="text-primary">удара</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Система синхронного судейства, где несколько судей оценивают бой одновременно, а итоговый счёт появляется на табло за секунды.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="font-display uppercase tracking-wider text-base h-14 px-8 glow-red">
                <a href="#buy">Купить систему</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-display uppercase tracking-wider text-base h-14 px-8 border-border">
                <a href="#features">Как это работает</a>
              </Button>
            </div>
            <div className="flex gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[['0', 'споров по баллам'], ['2×', 'быстрее турниры'], ['5+', 'судей онлайн']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-3xl text-primary">{n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE SYNC DEMO */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 glow-red animate-scale-in">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-primary font-medium text-sm uppercase tracking-widest">Live · синхронизация</span>
                <h2 className="font-display font-bold uppercase text-3xl md:text-4xl mt-2 mb-4">Оценки судей в реальном времени</h2>
                <p className="text-muted-foreground">Каждый судья выставляет балл независимо. Система мгновенно сводит результат по правилам саньда — без задержек и ручного подсчёта.</p>
              </div>
              <div className="flex-1 w-full">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {judges.map((j, i) => (
                    <div key={i} className="bg-secondary border border-border rounded p-4 text-center animate-flash" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="text-xs text-muted-foreground uppercase mb-1">Судья {i + 1}</div>
                      <div className="font-display font-bold text-3xl tabular-nums">{j.toFixed(1)}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-primary rounded p-6 text-center glow-red">
                  <div className="text-xs text-primary-foreground/80 uppercase tracking-widest mb-1">Итоговый счёт раунда</div>
                  <div className="font-display font-bold text-5xl text-primary-foreground tabular-nums animate-pulse-score">{total.toFixed(1)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Проблема</span>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mt-2">Старое судейство тормозит спорт</h2>
            <p className="text-muted-foreground mt-4">Ручной подсчёт баллов в саньда порождает споры, ошибки и потерю времени на каждом турнире.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problems.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={p.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg uppercase mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION / HOW */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-accent font-medium text-sm uppercase tracking-widest">Решение</span>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mt-2">Как работает SANDA<span className="text-primary">SCORE</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <div className="font-display font-bold text-6xl text-stroke mb-3">{s.num}</div>
                <h3 className="font-display font-semibold text-lg uppercase mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Возможности</span>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mt-2">Всё для честного боя</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-lg p-7 hover:border-primary/50 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded bg-primary flex items-center justify-center mb-5">
                  <Icon name={f.icon} size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl uppercase mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-accent font-medium text-sm uppercase tracking-widest">Реальные турниры</span>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mt-2">Проверено на ринге</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {cases.map((c) => (
              <div key={c.title} className="bg-background border border-border rounded-lg p-8 flex flex-col hover:border-primary/50 transition-colors">
                <span className="text-xs uppercase tracking-widest text-primary font-medium mb-4">{c.tag}</span>
                <h3 className="font-display font-bold text-2xl uppercase mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{c.text}</p>
                <div className="mt-6 pt-6 border-t border-border flex items-baseline gap-2">
                  <span className="font-display font-bold text-4xl text-primary">{c.stat}</span>
                  <span className="text-sm text-muted-foreground uppercase">{c.statLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* GALLERY */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Фото с турниров</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="group relative rounded-lg overflow-hidden aspect-square bg-secondary border border-border hover:border-primary/50 transition-all"
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all flex items-end p-3 opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-foreground leading-tight">{img.caption}</span>
                  </div>
                  <div className="absolute top-2 right-2 w-7 h-7 rounded bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ZoomIn" size={14} className="text-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded border border-border bg-card flex items-center justify-center hover:border-primary transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={20} />
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded border border-border bg-card flex items-center justify-center hover:border-primary transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded border border-border bg-card flex items-center justify-center hover:border-primary transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}
          >
            <Icon name="ChevronRight" size={20} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].caption}
              className="w-full max-h-[75vh] object-contain rounded-lg animate-scale-in"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">{gallery[lightbox].caption}</p>
              <span className="text-xs text-muted-foreground font-display uppercase">{lightbox + 1} / {gallery.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* KITS */}
      <section id="pricing" className="py-24">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Комплектации</span>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mt-2">Выберите вариант системы</h2>
            <p className="text-muted-foreground mt-4">Каждый комплект включает 5 судейских пультов и лампы для показа результата. Отличается тип подключения.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {kits.map((k) => (
              <div key={k.name} className={`rounded-lg flex flex-col border overflow-hidden transition-all ${k.highlight ? 'bg-primary border-primary glow-red md:scale-[1.04]' : 'bg-card border-border'}`}>
                {k.highlight && (
                  <div className="bg-background/20 px-8 py-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                    <span className="text-xs uppercase tracking-widest font-semibold text-primary-foreground">Рекомендуем</span>
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className={`w-14 h-14 rounded flex items-center justify-center mb-5 ${k.highlight ? 'bg-background/20' : 'bg-primary/10'}`}>
                    <Icon name={k.icon} size={28} className={k.highlight ? 'text-primary-foreground' : 'text-primary'} />
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-medium mb-1 ${k.highlight ? 'text-primary-foreground/70' : 'text-primary'}`}>{k.tag}</span>
                  <h3 className={`font-display font-bold text-3xl uppercase mb-2 ${k.highlight ? 'text-primary-foreground' : ''}`}>{k.name}</h3>
                  <p className={`text-sm mb-6 ${k.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{k.desc}</p>

                  <div className={`text-xs uppercase tracking-widest font-medium mb-3 ${k.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>Оборудование</div>
                  <ul className="space-y-2 mb-5">
                    {k.hardware.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <Icon name="Package" size={16} className={k.highlight ? 'text-primary-foreground shrink-0 mt-0.5' : 'text-primary shrink-0 mt-0.5'} />
                        <span className={k.highlight ? 'text-primary-foreground' : ''}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`text-xs uppercase tracking-widest font-medium mb-3 ${k.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>Характеристики</div>
                  <ul className="space-y-2 flex-1 mb-8">
                    {k.software.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" size={16} className={k.highlight ? 'text-primary-foreground shrink-0 mt-0.5' : 'text-primary shrink-0 mt-0.5'} />
                        <span className={k.highlight ? 'text-primary-foreground' : ''}>{s}</span>
                      </li>
                    ))}
                  </ul>

                  <Button onClick={() => chooseKit(k.name)} variant={k.highlight ? 'secondary' : 'default'} className="font-display uppercase tracking-wider h-12">
                    Выбрать — {k.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="py-24 bg-card border-t border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-widest">Оформление покупки</span>
              <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mt-2 mb-6">Подключите<br />систему</h2>
              <p className="text-muted-foreground mb-8 max-w-md">Выберите комплектацию, заполните данные — мы свяжемся для уточнения деталей и выставим счёт.</p>

              <div className="bg-background border border-border rounded-lg p-6 mb-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Ваш заказ</div>
                {kits.filter((k) => k.name === selectedKit).map((k) => (
                  <div key={k.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={k.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl uppercase">{k.name} комплектация</div>
                      <div className="text-xs text-muted-foreground">5 пультов + 3 лампы · {k.tag}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  ['ShieldCheck', 'Безопасная оплата'],
                  ['Headphones', 'Поддержка и обучение'],
                  ['RefreshCw', 'Отмена в любой момент'],
                ].map(([icon, val]) => (
                  <div key={val} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center">
                      <Icon name={icon} size={20} className="text-primary" />
                    </div>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <form className="bg-background border border-border rounded-lg p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium mb-2 block">Комплектация</label>
                <div className="grid grid-cols-3 gap-2">
                  {kits.map((k) => (
                    <button
                      type="button"
                      key={k.name}
                      onClick={() => setSelectedKit(k.name)}
                      className={`h-12 rounded border font-display uppercase text-sm tracking-wide transition-colors ${selectedKit === k.name ? 'bg-primary border-primary text-primary-foreground' : 'bg-secondary border-border text-muted-foreground hover:border-primary/50'}`}
                    >
                      {k.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Имя</label>
                <Input placeholder="Как к вам обращаться" className="bg-secondary border-border h-12" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Телефон или email</label>
                <Input placeholder="+7 ___ ___-__-__" className="bg-secondary border-border h-12" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Организация / турнир</label>
                <Input placeholder="Федерация, клуб, событие" className="bg-secondary border-border h-12" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Комментарий к заказу</label>
                <Textarea placeholder="Особые пожелания, сроки запуска" className="bg-secondary border-border min-h-[90px]" />
              </div>
              <Button type="submit" size="lg" className="w-full font-display uppercase tracking-wider h-12 glow-red">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Купить — {selectedKit}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с условиями оферты</p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <Icon name="Swords" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold tracking-wide">SANDA<span className="text-primary">SCORE</span></span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SANDASCORE · Электронное судейство ушу саньда</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;