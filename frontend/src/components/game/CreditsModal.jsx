import React from 'react';

// === EASY-EDIT REGISTRY ===
// As people donate, add their names below. Order matters (top = most recent).
// Pass each as { name, tier, note }. tier is one of 'honored' | 'patron'.
const SUPPORTERS = [
    // Example entry (uncomment & replace as donations come in):
    // { name: 'Jane Doe',     tier: 'honored', note: 'first to bring the offering' },
    // { name: 'A Kind Stranger', tier: 'patron'  },
];

const HONORED = SUPPORTERS.filter(s => s.tier === 'honored');
const PATRONS = SUPPORTERS.filter(s => s.tier === 'patron');

// Five reserved slots in the Honored list until real names land
const reservedSlots = Math.max(0, 5 - HONORED.length);

export default function CreditsModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-[2px]" data-testid="credits-modal">
            <div className="surface-parchment frame-ornate w-[min(720px,94%)] max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-end px-6 pt-4">
                    <button data-testid="credits-close" onClick={onClose} className="icon-btn !text-[var(--fl-light)] !bg-transparent !border-[var(--fl-gold)]/55">
                        Close ✕
                    </button>
                </div>

                <div className="credits-scroll flex-1 overflow-y-auto px-8 pb-10 text-center">
                    <h2 className="font-script text-5xl text-[var(--fl-candle-soft)] mb-0 leading-none glow-candle">Fluffy</h2>
                    <p className="font-display uppercase tracking-[0.36em] text-[var(--fl-light)]/65 text-xs mt-2 mb-8">— Nine Lives, Nine Legends —</p>

                    <Section title="A Note from the Writer">
                        <P>This is a small game about a cat with an enormous imagination<br/>and the ordinary home that contains him.</P>
                        <P>Every kingdom is a room.<br/>Every prophecy is probably a misunderstanding.<br/>Every legend is completely true, according to Fluffy.</P>
                    </Section>

                    <Section title="Created By">
                        <P><Big>The DreamCode Gamer</Big><br/><span className="opacity-80">(Edward Heath)</span></P>
                        <P><a className="credits-link" href="https://bsky.app/profile/mjpalmer.bsky.social" target="_blank" rel="noopener noreferrer">BlueSky · @mjpalmer.bsky.social</a></P>
                    </Section>

                    <Section title="Based on Characters and Concepts By">
                        <P><Big>Edward Heath</Big><br/><span className="opacity-65 italic">and</span><br/><Big>Mr. Palmer</Big></P>
                    </Section>

                    <Section title="Special Thanks">
                        <P>The incredible team at<br/><Big><a className="credits-link" href="https://emergent.sh" target="_blank" rel="noopener noreferrer">Emergent Agent</a></Big><br/><span className="opacity-75 text-sm">emergentagent.com</span></P>
                        <P className="italic opacity-85">For helping bring a ridiculous cat's adventures to life.</P>
                    </Section>

                    <Section title="Starring">
                        <Cast role="Fluffy"                       as="as Himself" />
                        <Cast role="The Vacuum"                   as="in a difficult role" />
                        <Cast role="Pen-Gwyn the Pretender"       as="who denies everything" />
                        <Cast role="Grumbleknot the Stone Sage"   as="standing very still" />
                        <Cast role="The Human Servants"           as="doing their best" />
                        <Cast role="The Food Bowl"                as="as Destiny" />
                    </Section>

                    <Section title="Honored Supporters" subtitle="The brave souls who contributed offerings to the Apartment Kingdom.">
                        {HONORED.length === 0 && reservedSlots === 0 && (
                            <P className="opacity-70 italic">Supporter names will appear here in future updates.</P>
                        )}
                        <ul className="credits-list">
                            {HONORED.map((s, i) => (
                                <li key={`h-${i}`}>
                                    <span className="credits-name">{s.name}</span>
                                    {s.note && <span className="credits-note"> — {s.note}</span>}
                                </li>
                            ))}
                            {Array.from({ length: reservedSlots }).map((_, i) => (
                                <li key={`r-${i}`} className="credits-reserved">Reserved</li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="Patrons of the Realm" subtitle="For those who helped keep the kingdom running.">
                        {PATRONS.length === 0
                            ? <P className="opacity-70 italic">Future donor names will be listed here.</P>
                            : <ul className="credits-list">
                                {PATRONS.map((s, i) => (
                                    <li key={`p-${i}`}>
                                        <span className="credits-name">{s.name}</span>
                                        {s.note && <span className="credits-note"> — {s.note}</span>}
                                    </li>
                                ))}
                              </ul>
                        }
                    </Section>

                    <Section title="In Memory Of">
                        <P className="italic">Every cardboard box that was destroyed<br/>in the making of this legend.</P>
                    </Section>

                    <Section title="Final Word" hideRule>
                        <P><Big>Nine lives.</Big></P>
                        <P><Big>Nine legends.</Big></P>
                        <P><Big>One extremely dramatic housecat.</Big></P>
                    </Section>

                    <p className="font-display uppercase tracking-[0.4em] text-[var(--fl-light)]/40 text-[0.62rem] mt-10">— FIN —</p>
                </div>
            </div>
        </div>
    );
}

const Section = ({ title, subtitle, children, hideRule }) => (
    <section className="credits-section">
        <h3 className="font-display uppercase tracking-[0.28em] text-[var(--fl-blood)] text-[0.78rem] mb-1">{title}</h3>
        {!hideRule && <div className="credits-rule" />}
        {subtitle && <p className="font-dialogue italic text-[var(--fl-light)]/70 text-sm mt-2 mb-4">{subtitle}</p>}
        <div className="credits-body">{children}</div>
    </section>
);

const P = ({ children, className = '' }) => (
    <p className={`font-dialogue text-[var(--fl-light)] text-base leading-relaxed my-2 ${className}`}>{children}</p>
);

const Big = ({ children }) => (
    <span className="font-script text-2xl text-[var(--fl-candle-soft)] glow-faint">{children}</span>
);

const Cast = ({ role, as }) => (
    <div className="my-1.5">
        <span className="font-script text-xl text-[var(--fl-candle-soft)]">{role}</span>
        <span className="font-dialogue italic text-[var(--fl-light)]/75 text-base ml-2">{as}</span>
    </div>
);
