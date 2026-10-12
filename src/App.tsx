import { useEffect, useState } from "react";
import {
  Home, FlaskConical, FolderGit2, GitCommitHorizontal, Boxes, Mail, FileText, Download,
  Github, Linkedin, MapPin, Code2, Layers, Cloud, Bot, ExternalLink, Terminal as TermIcon, BadgeCheck,
} from "lucide-react";
import Terminal from "./Terminal";
import { profile, stats, research, projects, experience, education, skills, type SkillGroup } from "./data";

const NAV = [
  { id: "top", file: "hero.tsx", Icon: Home },
  { id: "research", file: "research.md", Icon: FlaskConical },
  { id: "projects", file: "projects.tsx", Icon: FolderGit2 },
  { id: "experience", file: "experience.log", Icon: GitCommitHorizontal },
  { id: "skills", file: "skills.json", Icon: Boxes },
  { id: "contact", file: "contact.sh", Icon: Mail },
];

const skillIcon: Record<SkillGroup["icon"], typeof Code2> = {
  code: Code2, layers: Layers, cloud: Cloud, bot: Bot, flask: FlaskConical,
};

function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(words[0]); return; }
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1800 : empty ? 300 : deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) { setDeleting(false); setI((n) => n + 1); }
      else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return (
    <p className="typed" aria-label={words.join(", ")}>
      <span aria-hidden="true">{text}</span><span className="caret" aria-hidden="true" />
    </p>
  );
}

function SectionHead({ file, title, intro }: { file: string; title: string; intro?: string }) {
  return (
    <header className="section-head">
      <p className="file-path">~/portfolio/{file}</p>
      <h2>{title}</h2>
      {intro && <p className="intro">{intro}</p>}
    </header>
  );
}

export default function App() {
  const active = useActiveSection();

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>

      <aside className="sidebar" aria-label="Sections">
        <div className="brand"><TermIcon size={20} /> <span>{"<"}{profile.short} {"/>"}</span></div>
        <nav>
          {NAV.map(({ id, file, Icon }) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined}>
              <Icon size={17} /> <span>{file}</span>
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noreferrer" className="nav-resume"><FileText size={17} /> <span>resume.pdf</span></a>
        </nav>
        <a className="dl" href={profile.resume} download><Download size={16} /> ./resume --dl</a>
      </aside>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-main">
            <p className="badge"><span className="pulse" /> {profile.status}</p>
            <h1>{profile.name}</h1>
            <Typewriter words={profile.roles} />
            <p className="pitch">{profile.pitch}</p>
            <p className="meta"><span><MapPin size={16} /> {profile.location}, open to relocating</span><span><BadgeCheck size={16} /> {profile.workAuth}</span></p>
            <div className="cta">
              <a className="btn primary" href={profile.resume} download><Download size={17} /> Download resume</a>
              <a className="btn" href={`mailto:${profile.email}`}><Mail size={17} /> Email me</a>
              <a className="icon-btn" href={profile.github} aria-label="GitHub"><Github size={19} /></a>
              <a className="icon-btn" href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={19} /></a>
            </div>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
          </div>
          <div className="hero-side">
            <div className="window photo">
              <div className="window-bar"><span className="dots"><i /><i /><i /></span><span className="window-title">profile.jpg</span></div>
              {profile.photo
                ? <img src={profile.photo} alt={`Photo of ${profile.name}`} />
                : <div className="initials" aria-hidden="true">{profile.short}</div>}
            </div>
            <Terminal />
          </div>
        </section>

        <section id="research">
          <SectionHead file="research.md" title="Research" intro="Graduate research at Oregon State on evaluating LLMs and checking program behavior." />
          <div className="studies">
            {research.map((r) => (
              <article key={r.title} className="study">
                <p className="question">{r.question}</p>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <ul className="chips">{r.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <p className="status">{r.status}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionHead file="projects.tsx" title="Projects" />
          <div className="grid projects">
            {projects.map((p) => (
              <article key={p.title} className="card">
                <p className="tag">{p.tag}</p>
                <h3>
                  {p.link ? <a href={p.link}>{p.title} <ExternalLink size={15} /></a> : p.title}
                </h3>
                <p>{p.body}</p>
                <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience">
          <SectionHead file="experience.log" title="Experience" />
          <ol className="log">
            {experience.map((j) => (
              <li key={j.org + j.role}>
                <p className="when">{j.when}</p>
                <h3>{j.role} <span className="org">at {j.org}</span></h3>
                {j.points.length > 0 && <ul>{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
              </li>
            ))}
          </ol>
          <h3 className="sub">Education</h3>
          <ul className="edu">
            {education.map((e) => (
              <li key={e.degree}><strong>{e.degree}</strong>, {e.school}{e.when && <span className="when-inline">, {e.when}</span>}</li>
            ))}
          </ul>
        </section>

        <section id="skills">
          <SectionHead file="skills.json" title="Skills" intro="What I've used in real projects, research, or production." />
          <div className="grid skills">
            {skills.map((g) => {
              const Icon = skillIcon[g.icon];
              return (
                <article key={g.name} className="card skill">
                  <h3><span className="ico"><Icon size={20} /></span>{g.name}</h3>
                  <ul className="chips">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="contact">
          <SectionHead file="contact.sh" title="Get in touch" />
          <p className="intro">I'm looking for new-grad software engineering roles starting after December 2026, and I'm authorized to work in the US. Email is the fastest way to reach me.</p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email}</a>
            <a className="icon-btn" href={profile.github} aria-label="GitHub"><Github size={19} /></a>
            <a className="icon-btn" href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={19} /></a>
          </div>
          <p className="foot">Built with React and TypeScript. Try typing <code>help</code> in the terminal up top.</p>
        </section>
      </main>
    </div>
  );
}
