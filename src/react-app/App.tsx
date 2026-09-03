import React from "react";
type Match = {
  id: number;
  league: string;
  time: string;
  home: string;
  away: string;
  homeOdd: number;
  drawOdd: number;
  awayOdd: number;
};

type Bet = {
  matchId: number;
  label: string;
  odd: number;
  match: string;
};

const matches: Match[] = [
  {
    id: 1,
    league: "UEFA Champions League",
    time: "20:00",
    home: "Real Madrid",
    away: "Manchester City",
    homeOdd: 2.1,
    drawOdd: 3.5,
    awayOdd: 2.8,
  },
  {
    id: 2,
    league: "La Liga",
    time: "18:30",
    home: "Barcelona",
    away: "Atletico Madrid",
    homeOdd: 1.75,
    drawOdd: 3.8,
    awayOdd: 4.2,
  },
  {
    id: 3,
    league: "Premier League",
    time: "21:00",
    home: "Liverpool",
    away: "Arsenal",
    homeOdd: 2.0,
    drawOdd: 3.4,
    awayOdd: 3.1,
  },
  {
    id: 4,
    league: "Serie A",
    time: "19:45",
    home: "Inter",
    away: "AC Milan",
    homeOdd: 1.9,
    drawOdd: 3.3,
    awayOdd: 3.6,
  },
];

export default function App() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [stake, setStake] = useState("10");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("football");
  const [menuOpen, setMenuOpen] = useState(false);

  const addBet = (
    match: Match,
    label: string,
    odd: number
  ) => {
    const newBet: Bet = {
      matchId: match.id,
      label,
      odd,
      match: `${match.home} - ${match.away}`,
    };

    setBets((current) => {
      const exists = current.some(
        (bet) =>
          bet.matchId === match.id &&
          bet.label === label
      );

      if (exists) {
        return current.filter(
          (bet) =>
            !(
              bet.matchId === match.id &&
              bet.label === label
            )
        );
      }

      return [...current, newBet];
    });
  };

  const removeBet = (index: number) => {
    setBets((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const totalOdd =
    bets.length > 0
      ? bets.reduce((total, bet) => total * bet.odd, 1)
      : 0;

  const stakeNumber = Number(stake) || 0;
  const possibleWin = stakeNumber * totalOdd;

  const filteredMatches = matches.filter((match) =>
    `${match.home} ${match.away} ${match.league}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-xl font-black text-slate-950">
              V
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Vira<span className="text-green-400">bet</span>
              </h1>
              <p className="text-xs text-slate-400">
                Football • Odds • Live
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            <button className="font-semibold text-green-400">
              Accueil
            </button>
            <button className="font-semibold text-slate-300 hover:text-white">
              Football
            </button>
            <button className="font-semibold text-slate-300 hover:text-white">
              Live
            </button>
            <button className="font-semibold text-slate-300 hover:text-white">
              Promotions
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-800">
              Connexion
            </button>

            <button className="hidden rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-green-400 sm:block">
              Inscription
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border border-slate-700 px-3 py-2 md:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-800 bg-slate-900 p-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <button>Accueil</button>
              <button>Football</button>
              <button>Live</button>
              <button>Promotions</button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-r from-green-950 via-slate-950 to-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <span className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
              ⚡ VIRABET
            </span>

            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Tous les matchs.
              <br />
              <span className="text-green-400">
                Toutes les cotes.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-lg text-slate-400">
              Retrouvez vos matchs préférés et construisez
              votre ticket en quelques secondes.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-xl bg-green-500 px-6 py-3 font-black text-slate-950 hover:bg-green-400">
                Voir les matchs
              </button>

              <button className="rounded-xl border border-slate-700 px-6 py-3 font-bold hover:bg-slate-800">
                En direct 🔴
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-bold">
                  🔴 Match en vedette
                </span>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
                  LIVE
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-400">
                  Champions League
                </p>

                <div className="my-6 flex items-center justify-center gap-5">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">
                      ⚽
                    </div>
                    <p className="mt-2 font-bold">
                      Real Madrid
                    </p>
                  </div>

                  <span className="text-2xl font-black text-green-400">
                    VS
                  </span>

                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">
                      ⚽
                    </div>
                    <p className="mt-2 font-bold">
                      Man City
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">1</p>
                    <p className="font-bold">2.10</p>
                  </div>
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">X</p>
                    <p className="font-bold">3.50</p>
                  </div>
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">2</p>
                    <p className="font-bold">2.80</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* SPORTS */}
        <div className="mb-7 flex gap-3 overflow-x-auto pb-2">
          {[
            ["football", "⚽ Football"],
            ["live", "🔴 Live"],
            ["basketball", "🏀 Basketball"],
            ["tennis", "🎾 Tennis"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`whitespace-nowrap rounded-xl px-5 py-3 font-bold ${
                activeTab === id
                  ? "bg-green-500 text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une équipe ou un championnat..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 outline-none placeholder:text-slate-500 focus:border-green-500"
            />
          </div>

          <button className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4 font-bold hover:bg-slate-800">
            ⚙ Filtres
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
          {/* MATCHES */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">
                  Matchs du jour
                </h3>
                <p className="text-sm text-slate-500">
                  Sélectionnez vos cotes
                </p>
              </div>

              <span className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-slate-400">
                {filteredMatches.length} matchs
              </span>
            </div>

            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-green-400">
                        {match.league}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Aujourd'hui • {match.time}
                      </p>
                    </div>

                    <span className="text-xs text-slate-500">
                      1X2
                    </span>
                  </div>

                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex-1 text-right font-bold">
                      {match.home}
                    </div>

                    <div className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-black text-slate-400">
                      VS
                    </div>

                    <div className="flex-1 font-bold">
                      {match.away}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["1", match.homeOdd],
                      ["X", match.drawOdd],
                      ["2", match.awayOdd],
                    ].map(([label, odd]) => {
                      const selected = bets.some(
                        (bet) =>
                          bet.matchId === match.id &&
                          bet.label === label
                      );

                      return (
                        <button
                          key={label}
                          onClick={() =>
                            addBet(
                              match,
                              String(label),
                              Number(odd)
                            )
                          }
                          className={`rounded-xl border p-3 transition ${
                            selected
                              ? "border-green-500 bg-green-500/20 text-green-400"
                              : "border-slate-700 bg-slate-800 hover:border-green-500"
                          }`}
                        >
                          <span className="block text-xs text-slate-400">
                            {label}
                          </span>
                          <span className="font-black">
                            {Number(odd).toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BET SLIP */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 bg-slate-800/50 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black">
                    🎫 Mon ticket
                  </h3>

                  <span className="rounded-full bg-green-500 px-2.5 py-1 text-xs font-black text-slate-950">
                    {bets.length}
                  </span>
                </div>
              </div>

              {bets.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="mb-4 text-5xl">🎫</div>
                  <p className="font-bold">
                    Votre ticket est vide
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Cliquez sur une cote pour l'ajouter.
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-80 space-y-3 overflow-y-auto p-4">
                    {bets.map((bet, index) => (
                      <div
                        key={`${bet.matchId}-${bet.label}`}
                        className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                      >
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold text-green-400">
                              {bet.match}
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                              Sélection: {bet.label}
                            </p>
                          </div>

                          <button
                            onClick={() => removeBet(index)}
                            className="text-slate-500 hover:text-red-400"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="mt-2 text-right font-black">
                          {bet.odd.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 border-t border-slate-800 p-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Côte totale
                      </span>
                      <span className="font-black text-green-400">
                        {totalOdd.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-400">
                        Mise
                      </label>

                      <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                        <input
                          type="number"
                          min="1"
                          value={stake}
                          onChange={(e) =>
                            setStake(e.target.value)
                          }
                          className="w-full bg-transparent px-4 py-3 outline-none"
                        />
                        <span className="flex items-center px-4 text-slate-500">
                          TND
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Gain potentiel
                      </span>
                      <span className="text-xl font-black text-green-400">
                        {possibleWin.toFixed(2)} TND
                      </span>
                    </div>

                    <button className="w-full rounded-xl bg-green-500 py-4 font-black text-slate-950 transition hover:bg-green-400">
                      Valider le ticket
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-black text-white">
              Vira<span className="text-green-400">bet</span>
            </span>
            <span className="ml-3">
              © 2026 — Tous droits réservés.
            </span>
          </div>

          <div className="flex gap-5">
            <button>Conditions</button>
            <button>Confidentialité</button>
            <button>Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
