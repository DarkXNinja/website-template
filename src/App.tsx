import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { contactInfo, formOptions, heroContent, navLinks, services, aboutText, reasons, reviews } from './data/siteConfig';
import { ReviewCard } from './components/ReviewCard';
import { SectionHeading } from './components/SectionHeading';
import { ServiceCard } from './components/ServiceCard';

const SceneBackground = lazy(() => import('./components/SceneBackground').then(module => ({ default: module.SceneBackground })));

const aboutImage = new URL('./assets/hairitage2.webp', import.meta.url).href;

const fadeInUp = {
  hidden: { opacity: 0, y: 45 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: formOptions[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus('idle');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setStatus('error');
      setErrorMessage('Please complete all required fields before submitting.');
      return;
    }
    setStatus('success');
    setErrorMessage('');
    setFormData({ name: '', phone: '', service: formOptions[0], message: '' });
  };

  return (
    <div className="min-h-screen bg-ink text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#home" className="text-lg font-semibold tracking-[0.2em] uppercase text-white">
            The Hairitage
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <a href={`tel:${heroContent.phone}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      </header>

      <section id="home" className="relative min-h-[100vh] overflow-hidden bg-ink">
        <Suspense fallback={null}>
          <SceneBackground />
        </Suspense>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.92))]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl gap-10 px-6 py-24 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6 text-center lg:text-left">
            <motion.p variants={fadeInUp} className="mx-auto inline-flex items-center justify-center gap-3 rounded-full border border-slate-600 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.32em] text-copper-200 md:mx-0">
              Farmington’s premium modern barbershop
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              {heroContent.headline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-base leading-8 text-slate-200 md:mx-0 md:text-lg">
              {heroContent.subtitle} A luxury grooming destination for effortless confidence, clean edges, and modern style.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row md:justify-start">
              <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-copper px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-[#a56a38]">
                Book Appointment
              </a>
              <a href={`tel:${heroContent.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-copper/40 hover:bg-white/15">
                Call Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={fadeInUp} className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 shadow-soft">
            <img src={heroContent.heroImage} alt="A premium barbershop interior" className="h-80 w-full object-cover transition duration-700 ease-out hover:scale-105 md:h-full" />
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-slate-300">
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 animate-bounce">
              ↓
            </span>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Scroll</p>
          </div>
        </div>
      </section>

      <section id="services" className="bg-charcoal/90 px-6 py-20 md:px-10">
        <SectionHeading eyebrow="Services" title="Barber services built for modern style" description="A premium lineup of fades, shaves, and grooming packages designed for local customers." />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map(service => (
            <motion.div key={service.title} variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.25 }}>
              <ServiceCard title={service.title} description={service.description} price={service.price} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="about" className="bg-ink px-6 py-20 md:px-10">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl lg:p-14">
            <p className="text-copper-300 uppercase tracking-[0.3em] text-sm font-semibold">Craftsmanship</p>
            <h2 className="text-4xl font-semibold text-white">Modern grooming with premium precision.</h2>
            <p className="text-slate-300 leading-8">{aboutText}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#0f151f]/80 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-copper-300">Consistency</p>
                <p className="mt-3 text-slate-300">Every haircut and shave is delivered with thoughtful technique and dependable quality.</p>
              </div>
              <div className="rounded-3xl bg-[#0f151f]/80 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-copper-300">Culture</p>
                <p className="mt-3 text-slate-300">A premium urban environment that feels comfortable, polished, and unmistakably modern.</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="overflow-hidden rounded-[2rem] bg-slate-900/60 shadow-soft">
            <img src={aboutImage} alt="Premium barbershop styling" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section id="why" className="bg-[#0c1119] px-6 py-20 md:px-10">
        <SectionHeading eyebrow="Why Choose Us" title="Why locals trust The Hairitage" description="Premium service, approachable bookings, and a polished guest experience." />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map(reason => (
            <motion.div key={reason.title} variants={fadeInUp} whileHover={{ y: -8 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft transition duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/15 text-copper-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{reason.title}</h3>
              <p className="mt-3 text-slate-300 leading-7">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="reviews" className="bg-ink px-6 py-20 md:px-10">
        <SectionHeading eyebrow="Reviews" title="What our guests say" description="Clean styles, premium service, and trusted local reviews." />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid gap-6 md:grid-cols-3">
          {reviews.map(review => (
            <motion.div key={review.name} variants={fadeInUp} whileHover={{ y: -8 }}>
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="booking" className="relative overflow-hidden bg-gradient-to-b from-[#090b10] via-[#11151d] to-[#0b0f15] px-6 py-24 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,140,73,0.16),_transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
            <div className="space-y-6 text-slate-200">
              <p className="text-copper-300 uppercase tracking-[0.3em] text-sm font-semibold">Booking</p>
              <h2 className="text-4xl font-semibold text-white">Reserve your next premium haircut.</h2>
              <p className="max-w-xl leading-8">Submit a simple request and we’ll confirm your appointment quickly. Designed for modern clients who value quality and convenience.</p>
            </div>
            <form action="https://formspree.io/f/{your-form-id}" method="POST" onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-[#0f151f]/90 p-7 shadow-soft">
              <input type="hidden" name="_subject" value="Appointment request" />
              <div className="grid gap-5">
                <label className="space-y-2 text-sm text-slate-200">
                  <span>Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-copper/40 focus:bg-slate-900"
                    placeholder="Enter your name"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-200">
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-copper/40 focus:bg-slate-900"
                    placeholder="(860) 555-0124"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-200">
                  <span>Service Requested</span>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-copper/40 focus:bg-slate-900"
                  >
                    {formOptions.map(option => (
                      <option key={option} value={option} className="bg-[#0a0e14] text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-200">
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-copper/40 focus:bg-slate-900"
                    placeholder="Tell us about your desired style or preferred time"
                    required
                  />
                </label>
                {status === 'error' && <p className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{errorMessage}</p>}
                {status === 'success' && <p className="rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">Request ready to send. We’ll follow up soon.</p>}
                <button className="inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-[#a56a38]">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-charcoal/95 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-copper-300 uppercase tracking-[0.3em] text-sm font-semibold">Contact</p>
              <h2 className="text-4xl font-semibold text-white">Connect with Farmington’s next premium barbershop.</h2>
              <p className="max-w-xl text-slate-300 leading-8">Call, message, or stop by to reserve your next premium cut. The Hairitage is built for style, precision, and local trust.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#0b111a]/80 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-copper-300">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="mt-3 block text-2xl font-semibold text-white">{contactInfo.phone}</a>
                </div>
                <div className="rounded-3xl bg-[#0b111a]/80 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-copper-300">Location</p>
                  <p className="mt-3 text-slate-300">{contactInfo.address}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="rounded-[2rem] bg-[#0b111a]/90 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-copper-300">Business Hours</p>
                <div className="mt-5 space-y-3 text-slate-300">
                  {contactInfo.hours.map(hour => (
                    <p key={hour.label} className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm">
                      <span>{hour.label}</span>
                      <span>{hour.value}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b111a]/90">
                <img src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1200&q=80" alt="Map placeholder" className="h-64 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#080b11] px-6 py-10 text-slate-300 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">The Hairitage Barbershop</p>
            <p className="mt-3 max-w-sm leading-7">A premium Farmington barbershop delivering modern cuts, clean fades, and trusted local service.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Hairitage Barbershop. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {contactInfo.social.map(item => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
