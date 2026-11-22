import { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle, ArrowUpRight, Github } from 'lucide-react';
import { profile } from '../../data/profile';
import { sendContactMessage } from '../../services/api';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const empty = { name: '', email: '', subject: '', message: '', website: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject.';
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus({ type: 'loading', text: '' });
    try {
      await sendContactMessage(values);
      setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      setValues(empty);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      const offline = err instanceof TypeError;
      setStatus({
        type: 'error',
        text: offline ? 'Could not reach the server. Please check your connection and try again.' : err.message,
      });
    }
  };

  const field =
    'w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-lime focus:outline-none transition';

  const { email, phone, location } = profile.contact;

  return (
    <section id="contact" className="relative border-t border-line/40">
      
      {/* Infinite Marquee Banner (signature from reference site) */}
      <div className="overflow-hidden border-b border-line bg-surface py-5 select-none" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8 font-mono text-sm uppercase tracking-widest text-muted">
          <span>LET'S WORK TOGETHER ✦ AVAILABLE FOR OPPORTUNITIES ✦ TURNING IDEAS INTO CODE ✦ REACH OUT TODAY ✦</span>
          <span>LET'S WORK TOGETHER ✦ AVAILABLE FOR OPPORTUNITIES ✦ TURNING IDEAS INTO CODE ✦ REACH OUT TODAY ✦</span>
          <span>LET'S WORK TOGETHER ✦ AVAILABLE FOR OPPORTUNITIES ✦ TURNING IDEAS INTO CODE ✦ REACH OUT TODAY ✦</span>
        </div>
      </div>

      <div className="section">
        <SectionHeading
          eyebrow="11 / Contact"
          title="Let's Start a Conversation"
          subtitle="Whether you have an upcoming project, a collaborative idea, or a full-time opportunity, feel free to reach out."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Contact Details & Links */}
          <Reveal className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-ink">
                Direct Contact Channels
              </h3>
              <p className="mt-2 text-sm text-muted">
                I typically respond within 24 hours.
              </p>

              <ul className="mt-6 space-y-4">
                {email && (
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-center justify-between rounded-xl border border-line/60 bg-bg p-4 transition hover:border-lime/40"
                    >
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-lime" />
                        <span className="text-sm font-medium text-ink">{email}</span>
                      </div>
                      <ArrowUpRight size={16} className="text-muted transition group-hover:text-lime" />
                    </a>
                  </li>
                )}

                {phone && (
                  <li>
                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center justify-between rounded-xl border border-line/60 bg-bg p-4 transition hover:border-lime/40"
                    >
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-lime" />
                        <span className="text-sm font-medium text-ink">{phone}</span>
                      </div>
                      <ArrowUpRight size={16} className="text-muted transition group-hover:text-lime" />
                    </a>
                  </li>
                )}

                {location && (
                  <li className="flex items-center gap-3 rounded-xl border border-line/60 bg-bg p-4 text-sm text-muted">
                    <MapPin size={18} className="text-lime shrink-0" />
                    <span>{location}</span>
                  </li>
                )}
              </ul>

              <div className="mt-6 border-t border-line/60 pt-6">
                <a
                  href="https://github.com/SaifulIslamSifat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-line bg-bg p-4 text-sm font-semibold text-ink transition hover:border-lime/40"
                >
                  <div className="flex items-center gap-3">
                    <Github size={18} className="text-lime" />
                    <span>GitHub Profile</span>
                  </div>
                  <ArrowUpRight size={16} className="text-muted" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. John Doe"
                    value={values.name}
                    onChange={onChange}
                    className={field}
                  />
                  {errors.name && <p className="mt-1 font-mono text-xs text-rose-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    value={values.email}
                    onChange={onChange}
                    className={field}
                  />
                  {errors.email && <p className="mt-1 font-mono text-xs text-rose-400">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry / Opportunity"
                  value={values.subject}
                  onChange={onChange}
                  className={field}
                />
                {errors.subject && <p className="mt-1 font-mono text-xs text-rose-400">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, timeline, or requirements..."
                  value={values.message}
                  onChange={onChange}
                  className={field}
                />
                {errors.message && <p className="mt-1 font-mono text-xs text-rose-400">{errors.message}</p>}
              </div>

              {/* Bot Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="btn-primary w-full sm:w-auto"
                >
                  <Send size={15} />
                  <span>{status.type === 'loading' ? 'Sending Message…' : 'Send Message'}</span>
                </button>
              </div>

              <div role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
                {status.type === 'success' && (
                  <p className="flex items-center gap-2 text-lime font-mono text-xs">
                    <CheckCircle2 size={16} /> {status.text}
                  </p>
                )}
                {status.type === 'error' && (
                  <p className="flex items-center gap-2 text-rose-400 font-mono text-xs">
                    <AlertCircle size={16} /> {status.text}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
