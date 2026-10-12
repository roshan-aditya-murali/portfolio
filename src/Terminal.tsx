import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile, projects, research, skills } from "./data";

type Line = { kind: "cmd" | "out"; content: ReactNode };

const Prompt = () => (
  <span className="t-prompt">
    {profile.handle}@{profile.host}<span className="t-dim">:~$</span>
  </span>
);

const KV = ({ k, v }: { k: string; v: ReactNode }) => (
  <div><span className="t-key">{k}</span>: {v}</div>
);
const Str = ({ children }: { children: string }) => <span className="t-str">"{children}"</span>;

function whoami(): ReactNode {
  return (
    <>
      <KV k="name" v={profile.name} />
      <KV k="location" v={profile.location} />
      <KV k="education" v={profile.education} />
      <KV k="work_auth" v={<Str>{profile.workAuth}</Str>} />
      <KV k="focus" v={<>[<Str>full-stack</Str>, <Str>LLM agents</Str>, <Str>program analysis</Str>]</>} />
      <KV k="status" v={<Str>{profile.status}</Str>} />
    </>
  );
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function run(raw: string): ReactNode | "clear" {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return null;
    case "help":
      return (
        <>
          <div>Try one of these:</div>
          {[
            ["whoami", "who I am"],
            ["projects", "things I've built"],
            ["research", "what I'm studying"],
            ["skills", "tools I use"],
            ["contact", "how to reach me"],
            ["resume", "open my resume"],
            ["clear", "clear the screen"],
          ].map(([c, d]) => (
            <div key={c}><span className="t-key t-pad">{c}</span><span className="t-dim">{d}</span></div>
          ))}
        </>
      );
    case "whoami":
    case "whoami --verbose":
      return whoami();
    case "projects":
    case "ls projects":
      scrollTo("projects");
      return projects.map((p) => <div key={p.title}><span className="t-str">●</span> {p.title}</div>);
    case "research":
      scrollTo("research");
      return research.map((r) => <div key={r.title}><span className="t-str">●</span> {r.title}</div>);
    case "skills":
      scrollTo("skills");
      return skills.map((s) => <div key={s.name}><span className="t-key">{s.name}</span>: {s.items.slice(0, 4).join(", ")}…</div>);
    case "contact":
      scrollTo("contact");
      return <div>Email <a href={`mailto:${profile.email}`}>{profile.email}</a></div>;
    case "resume":
      window.open(profile.resume, "_blank");
      return <div>Opening resume.pdf…</div>;
    case "clear":
      return "clear";
    case "sudo hire roshan":
    case "sudo hire-me":
      return <div className="t-str">Permission granted. Scroll to contact.sh to finish the job.</div>;
    default:
      return <div><span className="t-err">command not found:</span> {raw}. Type <span className="t-key">help</span>.</div>;
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "cmd", content: "whoami --verbose" },
    { kind: "out", content: whoami() },
    { kind: "out", content: <div className="t-dim">Type <span className="t-key">help</span> to explore.</div> },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [lines]);

  const submit = () => {
    const out = run(input);
    if (out === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "cmd", content: input }, ...(out ? [{ kind: "out" as const, content: out }] : [])]);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setHIndex(-1);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      setHIndex(i); setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(i); setInput(i < 0 ? "" : history[i]);
    }
  };

  return (
    <div className="window terminal" onClick={() => inputRef.current?.focus()}>
      <div className="window-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="window-title">whoami.sh</span>
      </div>
      <div className="t-body" ref={bodyRef} aria-live="polite">
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i} className="t-line"><Prompt /> {l.content}</div>
          ) : (
            <div key={i} className="t-out">{l.content}</div>
          )
        )}
        <label className="t-line t-input-row">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            aria-label="Terminal command. Type help for a list."
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
        </label>
      </div>
    </div>
  );
}
