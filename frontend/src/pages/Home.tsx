import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TRENDING = [
  {
    id: '1',
    num: '01',
    initials: 'AK',
    color: { bg: '#dcfce7', text: '#166534' },
    author: 'Arjun Kapoor',
    title: 'Why Cloudflare Workers are changing how we think about backends',
    time: '6 min read',
  },
  {
    id: '2',
    num: '02',
    initials: 'SR',
    color: { bg: '#fef9c3', text: '#854d0e' },
    author: 'Sneha Rao',
    title: 'The quiet power of serverless databases in 2026',
    time: '4 min read',
  },
  {
    id: '3',
    num: '03',
    initials: 'PV',
    color: { bg: '#ede9fe', text: '#5b21b6' },
    author: 'Priya Verma',
    title: 'Caching strategies that actually make a difference for users',
    time: '5 min read',
  },
];



const STAFF_PICKS = [
  {
    id: '1',
    initials: 'AK',
    color: { bg: '#dcfce7', text: '#166534' },
    title: 'The real cost of a direct postgresql:// on Cloudflare',
    author: 'Arjun Kapoor',
  },
  {
    id: '2',
    initials: 'PV',
    color: { bg: '#ede9fe', text: '#5b21b6' },
    title: 'How I structured my Hono routes for a clean deployed API',
    author: 'Priya Verma',
  },
  {
    id: '3',
    initials: 'SR',
    color: { bg: '#fef9c3', text: '#854d0e' },
    title: 'Skeleton screens are UX, not just aesthetics',
    author: 'Sneha Rao',
  },
];

const WHO_TO_FOLLOW = [
  {
    initials: 'AK',
    color: { bg: '#dcfce7', text: '#166534' },
    name: 'Arjun Kapoor',
    desc: 'Full-stack · CF Workers',
  },
  {
    initials: 'PV',
    color: { bg: '#ede9fe', text: '#5b21b6' },
    name: 'Priya Verma',
    desc: 'Serverless · Hono.js',
  },
  {
    initials: 'SR',
    color: { bg: '#fef9c3', text: '#854d0e' },
    name: 'Sneha Rao',
    desc: 'Frontend · React',
  },
];



function Avatar({
  initials,

  size = 24,
}: {
  initials: string;
  color: { bg: string; text: string };
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#75787a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();


  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: '#fff',
        minHeight: '100vh',
        color: '#1a1a1a',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 40px',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontFamily: "'Georgia', serif",
          }}
        >
          Speech<span style={{ color: '#16a34a' }}>.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {['Our story', 'Membership', 'Write', 'Sign in'].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 14,
                color: '#6b7280',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            >
              {l}
            </span>
          ))}
          <Link to="/signup">
            <button
              style={{
                fontSize: 13,
                padding: '7px 18px',
                borderRadius: 999,
                border: 'none',
                background: '#111',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Get started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <div
          style={{
            padding: '56px 40px',
            borderRight: '1px solid #e5e5e5',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#16a34a',
              fontFamily: 'system-ui, sans-serif',
              marginBottom: 16,
            }}
          >
            Human stories & ideas
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              marginBottom: 18,
            }}
          >
            Ideas that
            <br />
            move the world
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#6b7280',
              lineHeight: 1.7,
              maxWidth: 400,
              marginBottom: 32,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            A place to read, write, and deepen your understanding of things that matter most to you.
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link to="/blogs">
              <button
                style={{
                  padding: '11px 28px',
                  borderRadius: 999,
                  background: '#6b737b',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: 14,
                  cursor: 'pointer',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                Start reading
              </button>
            </Link>
            <span
              style={{
                fontSize: 14,
                color: '#6b7280',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Learn more →
            </span>
          </div>
        </div>

        {/* Trending */}
        <div
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#9ca3af',
              fontFamily: 'system-ui, sans-serif',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            Trending on Speech
          </div>
          {TRENDING.map((post, i) => (
            <div
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              style={{
                display: 'flex',
                gap: 16,
                padding: '16px 0',
                borderBottom: i < TRENDING.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#d1d5db',
                  minWidth: 32,
                  lineHeight: 1,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {post.num}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Avatar initials={post.initials} color={post.color} size={22} />
                  <span
                    style={{ fontSize: 12, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}
                  >
                    {post.author}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>
                  {post.title}
                </div>
                <div
                  style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'system-ui, sans-serif' }}
                >
                  {post.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics bar */}


      {/* Main content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          padding: '0 40px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Feed */}


        {/* Sidebar */}
        <div style={{ padding: '32px 0 32px 32px' }}>
          {/* Staff picks */}
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: 0.2,
              }}
            >
              Staff picks
            </div>
            {STAFF_PICKS.map((pick, i) => (
              <div
                key={pick.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: i < STAFF_PICKS.length - 1 ? 18 : 0,
                  paddingBottom: i < STAFF_PICKS.length - 1 ? 18 : 0,
                  borderBottom: i < STAFF_PICKS.length - 1 ? '1px solid #f3f4f6' : 'none',
                  cursor: 'pointer',
                }}
              >
                <Avatar initials={pick.initials} color={pick.color} size={26} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 3 }}>
                    {pick.title}
                  </div>
                  <div
                    style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'system-ui, sans-serif' }}
                  >
                    {pick.author}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Who to follow */}
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: 0.2,
              }}
            >
              Who to follow
            </div>
            {WHO_TO_FOLLOW.map((person) => (
              <div
                key={person.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initials={person.initials} color={person.color} size={32} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{person.name}</div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#9ca3af',
                        fontFamily: 'system-ui, sans-serif',
                      }}
                    >
                      {person.desc}
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    fontSize: 12,
                    padding: '5px 14px',
                    borderRadius: 999,
                    border: '1px solid #d1d5db',
                    background: 'none',
                    cursor: 'pointer',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}


        </div>
      </div>
    </div>
  );
}
