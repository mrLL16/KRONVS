"use client";

import { useState } from "react";
import { fixedLists, labels, longFields } from "@/content/labels";

type Json = string | number | boolean | Json[] | { [key: string]: Json };
type PageInfo = { slug: string; title: string; path: string; data: Json };

const label = (key: string) => labels[key] ?? key;

// Novo item de lista = cópia do primeiro com todos os textos vazios.
function blankLike(value: Json): Json {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length ? [blankLike(value[0])] : [];
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, blankLike(v)]));
}

function Field({ name, value, onChange }: { name: string; value: string; onChange: (v: string) => void }) {
  const Tag = longFields.has(name) || value.length > 90 ? "textarea" : "input";
  return (
    <label className="block space-y-1">
      <span className="text-xs text-white/60">{label(name)}</span>
      <Tag
        value={value}
        rows={Tag === "textarea" ? 4 : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-300"
      />
    </label>
  );
}

function Node({ name, value, onChange }: { name: string; value: Json; onChange: (v: Json) => void }) {
  if (typeof value === "string") {
    return <Field name={name} value={value} onChange={onChange} />;
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-white/80">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {label(name)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block space-y-1">
        <span className="text-xs text-white/60">{label(name)}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-300"
        />
      </label>
    );
  }

  if (Array.isArray(value)) {
    const fixed = fixedLists.has(name);
    const set = (next: Json[]) => onChange(next);
    const move = (i: number, d: number) => {
      const next = [...value];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      set(next);
    };
    return (
      <fieldset className="space-y-3 rounded border border-white/10 p-3">
        <legend className="px-2 text-sm font-medium text-teal-200">{label(name)}</legend>
        {value.map((item, i) => (
          <div key={i} className="space-y-2 rounded bg-white/[0.03] p-3">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="mr-auto">Item {i + 1}</span>
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded border border-white/15 px-2 py-1 disabled:opacity-30">↑</button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="rounded border border-white/15 px-2 py-1 disabled:opacity-30">↓</button>
              {!fixed && (
                <button type="button" onClick={() => set(value.filter((_, j) => j !== i))} className="rounded border border-red-400/40 px-2 py-1 text-red-300">Remover</button>
              )}
            </div>
            <Node name={name} value={item} onChange={(v) => set(value.map((x, j) => (j === i ? v : x)))} />
          </div>
        ))}
        {fixed ? (
          <p className="text-xs text-white/40">Quantidade fixa: o layout do site depende desse número de itens.</p>
        ) : (
          <button
            type="button"
            onClick={() => set([...value, value.length ? blankLike(value[0]) : ""])}
            className="rounded border border-teal-300/40 px-3 py-1 text-sm text-teal-200"
          >
            + Adicionar item
          </button>
        )}
      </fieldset>
    );
  }

  return (
    <fieldset className="space-y-3 rounded border border-white/10 p-3">
      <legend className="px-2 text-sm font-medium text-teal-200">{label(name)}</legend>
      {Object.entries(value).map(([key, child]) => (
        <Node key={key} name={key} value={child} onChange={(v) => onChange({ ...value, [key]: v })} />
      ))}
    </fieldset>
  );
}

export function ContentEditor({ pages }: { pages: PageInfo[] }) {
  const [current, setCurrent] = useState(pages[0].slug);
  const [drafts, setDrafts] = useState<Record<string, Json>>(() => Object.fromEntries(pages.map((p) => [p.slug, p.data])));
  const [saved, setSaved] = useState<Record<string, string>>(() => Object.fromEntries(pages.map((p) => [p.slug, JSON.stringify(p.data)])));
  const [status, setStatus] = useState("");

  const page = pages.find((p) => p.slug === current)!;
  const draft = drafts[current];
  const dirty = JSON.stringify(draft) !== saved[current];

  async function save() {
    setStatus("Salvando…");
    const res = await fetch(`/api/content/${current}`, { method: "PUT", body: JSON.stringify(draft) });
    if (res.ok) {
      setSaved((s) => ({ ...s, [current]: JSON.stringify(draft) }));
      setStatus("Salvo em content/" + current + ".json");
    } else {
      setStatus("Erro ao salvar");
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 pb-10 pt-32 text-white">
      <header className="space-y-2">
        <h1 className="text-2xl">Conteúdo do site (somente local)</h1>
        <p className="text-sm text-white/60">Edite os textos, clique em Salvar e veja no site. Para publicar, faça commit de content/*.json.</p>
      </header>

      <nav className="flex gap-2">
        {pages.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => { setCurrent(p.slug); setStatus(""); }}
            className={`rounded border px-3 py-1 text-sm ${p.slug === current ? "border-teal-300 text-teal-200" : "border-white/15"}`}
          >
            {p.title}
            {JSON.stringify(drafts[p.slug]) !== saved[p.slug] ? " •" : ""}
          </button>
        ))}
      </nav>

      <div className="sticky top-24 z-10 flex items-center gap-3 bg-black/80 py-3 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={!dirty}
          className="rounded bg-teal-300 px-4 py-2 text-sm font-medium text-black disabled:opacity-40"
        >
          Salvar {page.title}
        </button>
        <a href={page.path} target="_blank" rel="noreferrer" className="text-sm text-teal-200 underline">Ver no site ↗</a>
        <span className="text-sm text-white/60">{dirty ? "Alterações não salvas" : status}</span>
      </div>

      {Object.entries(draft as Record<string, Json>).map(([key, value]) => (
        <Node key={key} name={key} value={value} onChange={(v) => setDrafts((d) => ({ ...d, [current]: { ...(d[current] as object), [key]: v } as Json }))} />
      ))}
    </main>
  );
}
