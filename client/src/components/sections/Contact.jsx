import { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { profile } from '../../data/profile';
import { sendContactMessage } from '../../services/api';
import SectionHeading from '../ui/SectionHeading';
import SocialLinks from '../ui/SocialLinks';
import Reveal from '../ui/Reveal';

const empty = { name: '', email: '', subject: '', message: '', website: '' }; // `website` = honeypot

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
      setStatus({ type: 'success', text: 'Thank you! Your message has been sent.' });
      setValues(empty);
    } catch (err) {
      // Server-side field errors (422) are shown next to the matching inputs.
      if (err.errors) setErrors(err.errors);
      const offline = err instanceof TypeError; // fetch network failure
      setStatus({
        type: 'error',
        text: offline ? 'Could not reach the server. Please check your connection and try again.' : err.message,
      });
    }
  };

  const field = 'w-full rounded-xl border border-line/15 bg-surface/60 px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-cyan focus:outline-none';
  const { email, phone, location } = profile.contact;

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="08 / Contact"
        title="Have a Project or an Idea?"
        subtitle="Let's connect and explore how technology and creativity can turn ideas into meaningful digital experiences."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="space-y-4 lg:col-span-2">
          <ul className="space-y-3">
            {email && (
              <li className="glass flex items-center gap-3 rounded-2xl p-4"><Mail className="text-cyan" size={20} aria-hidden="true" /><a href={`mailto:${email}`}>{email}</a></li>
            )}
            {phone && (
              <li className="glass flex items-center gap-3 rounded-2xl p-4"><Phone className="text-cyan" size={20} aria-hidden="true" /><a href={`tel:${phone}`}>{phone}</a></li>
            )}
            {location && (
              <li className="glass flex items-center gap-3 rounded-2xl p-4"><MapPin className="text-cyan" size={20} aria-hidden="true" />{location}</li>
            )}
          </ul>
          <SocialLinks />
        </Reveal>

        <Reveal className="lg:col-span-3">
          <form onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-3xl p-6 sm:p-8">
            {[
              ['name', 'Full Name', 'text', 'name'],
              ['email', 'Email', 'email', 'email'],
              ['subject', 'Subject', 'text', 'off'],
            ].map(([key, label, type, auto]) => (
              <div key={key}>
                <label htmlFor={key} className="mb-1.5 block text-sm font-medium">{label}</label>
                <input
                  id={key} name={key} type={type} autoComplete={auto}
                  value={values[key]} onChange={onChange}
                  aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-err` : undefined}
                  className={field}
                />
                {errors[key] && <p id={`${key}-err`} className="mt-1 text-sm text-red-400">{errors[key]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                id="message" name="message" rows={5}
                value={values.message} onChange={onChange}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined}
                className={field}
              />
              {errors.message && <p id="message-err" className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>

            {/* Honeypot: hidden from people, filled by bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
            </div>

            <button type="submit" disabled={status.type === 'loading'} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
              <Send size={16} aria-hidden="true" />
              {status.type === 'loading' ? 'Sending…' : 'Send Message'}
            </button>

            <div role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
              {status.type === 'success' && (
                <p className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={18} aria-hidden="true" />{status.text}</p>
              )}
              {status.type === 'error' && (
                <p className="flex items-center gap-2 text-red-400"><AlertCircle size={18} aria-hidden="true" />{status.text}</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
