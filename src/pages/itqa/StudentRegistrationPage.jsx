import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
//   ShieldCheck,
  Clock,
  ChevronDown,
  BookOpenText,
  Star,
  Users,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { submitStudentRegistration } from '../../services/itqaService';

/* ─── static data ─────────────────────────────────────────── */
const WHY_JOIN = [
  {
    icon: BookOpenText,
    title: 'Structured Learning Path',
    desc: 'Follow a clear progression from foundational Quranic reading through to advanced memorisation and understanding.',
  },
  {
    icon: Star,
    title: 'Qualified Instructors',
    desc: 'Learn from ITQA-certified teachers who are verified, trained, and committed to your growth.',
  },
  {
    icon: Users,
    title: 'Supportive Community',
    desc: 'Join a national network of students learning alongside you, with group classes and peer encouragement.',
  },
  {
    icon: TrendingUp,
    title: 'Recognised Progress',
    desc: 'Receive formal recognition of your level and progress, documented through the ITQA student record system.',
  },
];

const ELIGIBILITY = [
  'Open to all ages — from young children (with guardian consent) to adults.',
  'No prior Quranic knowledge required for beginner enrolment.',
  'Intermediate and advanced tracks require a brief placement assessment.',
  'A parent or guardian must register on behalf of students under 18.',
  'Students must commit to attending at least one session per week.',
];

const JOURNEY_STEPS = [
  {
    title: 'Register & Apply',
    desc: 'Submit the form below. A guardian must complete registration for students under 18.',
  },
  {
    title: 'Level Assessment',
    desc: 'New students are assessed to determine the right starting point — beginner, intermediate, or advanced.',
  },
  {
    title: 'Centre Placement',
    desc: 'You are matched with a nearby ITQA centre or assigned to an online class based on your location.',
  },
  {
    title: 'Begin Learning',
    desc: 'Start classes, track your progress, and work toward formal level completion with your instructor.',
  },
];

const FAQS = [
  {
    q: 'Is there an age limit for student registration?',
    a: 'No. The programme is open to all ages. Young children may register with a parent or guardian completing the form on their behalf.',
  },
  {
    q: 'My child has never read the Quran before. Can they still join?',
    a: 'Absolutely. The beginner track starts from the very foundations — Arabic letters, basic pronunciation, and simple recitation — with no prior knowledge assumed.',
  },
  {
    q: 'Can I join online classes instead of attending a physical centre?',
    a: 'Yes. Online placement is available for students in areas with no nearby registered centre, or for those who prefer to learn remotely via Zoom.',
  },
  {
    q: 'Is there a fee to register as a student?',
    a: 'Registration itself is completely free. Individual centres may charge modest fees for in-person tuition — this is communicated after placement, not at registration.',
  },
  {
    q: 'What happens after I submit the form?',
    a: 'Our team will review your application within 3–5 working days and contact you via email or phone to confirm your level placement and assigned centre or class.',
  },
];

const NIGERIAN_STATES = [
  'Abuja (FCT)', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

/* ─── shared field component ─────────────────────────────── */
function Field({ label, children, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="ml-0.5 text-amber-600">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

/* ─── FAQ accordion item ─────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 transition-all duration-300 hover:border-emerald-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-bold text-gray-900">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── success panel ──────────────────────────────────────── */
function SuccessPanel({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50 px-8 py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 shadow-md">
        <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900">Application Submitted</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
        Your student registration has been received. Our admin team will review the details and
        reach out within 3–5 working days via the email or phone provided.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-emerald-700 px-6 py-2.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
      >
        Submit Another Application
      </button>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function StudentRegistrationPage() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', gender: '', age: '',
    state: '', lga: '', current_level: '',
    guardian_name: '', guardian_phone: '',
    preferred_centre: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitStudentRegistration(form);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Could not submit your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setForm({
      full_name: '', email: '', phone: '', gender: '', age: '',
      state: '', lga: '', current_level: '',
      guardian_name: '', guardian_phone: '',
      preferred_centre: '', notes: '',
    });
  }

  const isMinor = parseInt(form.age, 10) < 18;

  return (
    <div className="bg-white">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 -translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 text-[18rem] font-black leading-none text-white/[0.025] select-none">
          ط
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          {/* breadcrumb */}
          {/* <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
            <span className="text-emerald-600">/</span>
            <span className="text-emerald-300">ITQA Registration</span>
            <span className="text-emerald-600">/</span>
            <span className="text-white">Student</span>
          </div> */}

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <UserCheck className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Student Enrolment
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Begin Your Qur'anic Learning Journey
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              Enrol as a registered ITQA student and get placed with a qualified instructor — at
              a centre near you or online. Free for all ages.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              
                href="#register"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              &gt;
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              
              <Link
                to="/ITQARegistration/centres"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Find a Centre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ INTRODUCTION ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <BookOpenText className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Introduction
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A Structured Path to Qur'anic Excellence
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-gray-500">
              The ITQA student programme connects learners of all ages and backgrounds with
              verified, qualified instructors across Nigeria. Whether you are starting from
              the very first Arabic letter or refining a lifetime of recitation, there is a
              track and a teacher for you. Registration is free, placement is local, and
              your progress is formally recorded throughout the journey.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY JOIN ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Why Enrol
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Join the ITQA Programme
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              More than just a class — a structured, supported, and nationally recognised
              journey through Qur'anic education.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_JOIN.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                </div>
                <h3 className="mb-1.5 text-sm font-extrabold text-gray-900">{title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ELIGIBILITY ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5">
                <ClipboardList className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
                  Eligibility
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Who Can Enrol
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-gray-500">
                The programme is open to everyone. There is no age limit, no minimum level of
                knowledge, and no fee to register. All that is required is a willingness to learn
                and a commitment to attend regularly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/ITQARegistration/teacher"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
                >
                  Are you a teacher?
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
              <ul className="space-y-4">
                {ELIGIBILITY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ REGISTRATION FORM ══════════════════ */}
      <section id="register" className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <ClipboardList className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Application Form
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Student Registration
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              All fields marked with <span className="font-semibold text-amber-600">*</span> are
              required. Parents must complete this form for students under 18.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
            <div className="p-7 sm:p-9">
              {submitted ? (
                <SuccessPanel onReset={handleReset} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* personal details */}
                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                      Personal Details
                    </p>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Student's Full Name" required>
                          <input required value={form.full_name} onChange={update('full_name')} className={inputClass} placeholder="e.g. Fatimah Usman" />
                        </Field>
                        <Field label="Age" required>
                          <input type="number" min="3" max="120" required value={form.age} onChange={update('age')} className={inputClass} placeholder="e.g. 12" />
                        </Field>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Gender" required>
                          <select required value={form.gender} onChange={update('gender')} className={inputClass}>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </Field>
                        <Field label="Current Qur'anic Level" required>
                          <select required value={form.current_level} onChange={update('current_level')} className={inputClass}>
                            <option value="">Select level</option>
                            <option value="beginner">Beginner — no prior knowledge</option>
                            <option value="intermediate">Intermediate — can read with some Tajweed</option>
                            <option value="advanced">Advanced — Hifz or near-complete</option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  </div>

                  {/* contact */}
                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                      Contact Information
                    </p>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Email Address" required>
                          <input type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
                        </Field>
                        <Field label="Phone Number">
                          <input type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+234 800 000 0000" />
                        </Field>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="State" required>
                          <select required value={form.state} onChange={update('state')} className={inputClass}>
                            <option value="">Select state</option>
                            {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </Field>
                        <Field label="Local Government Area" required>
                          <input required value={form.lga} onChange={update('lga')} className={inputClass} placeholder="e.g. Municipal Area Council" />
                        </Field>
                      </div>
                    </div>
                  </div>

                  {/* guardian — always visible but labelled as required only for minors */}
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                      Parent / Guardian Details
                    </p>
                    <p className="mb-4 text-xs text-gray-400">
                      {isMinor || !form.age
                        ? 'Required for students under 18.'
                        : 'Optional for adult students.'}
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Guardian Full Name" required={isMinor}>
                        <input
                          required={isMinor}
                          value={form.guardian_name}
                          onChange={update('guardian_name')}
                          className={inputClass}
                          placeholder="Parent or guardian name"
                        />
                      </Field>
                      <Field label="Guardian Phone" required={isMinor}>
                        <input
                          type="tel"
                          required={isMinor}
                          value={form.guardian_phone}
                          onChange={update('guardian_phone')}
                          className={inputClass}
                          placeholder="+234 800 000 0000"
                        />
                      </Field>
                    </div>
                  </div>

                  {/* preferences */}
                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                      Preferences
                    </p>
                    <div className="space-y-5">
                      <Field label="Preferred Centre or Class Type (optional)">
                        <select value={form.preferred_centre} onChange={update('preferred_centre')} className={inputClass}>
                          <option value="">No preference</option>
                          <option value="online">Online (Zoom)</option>
                          <option value="in-person">In-person centre near me</option>
                          <option value="either">Either is fine</option>
                        </select>
                      </Field>
                      <Field label="Additional Notes (optional)">
                        <textarea
                          rows={3}
                          value={form.notes}
                          onChange={update('notes')}
                          className={`${inputClass} resize-none`}
                          placeholder="Any additional information about the student, special needs, or scheduling preferences..."
                        />
                      </Field>
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="text-sm font-medium text-red-600">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md disabled:translate-y-0 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Student Application
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {!submitted && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Applications are typically reviewed within 3–5 working days.
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ LEARNING JOURNEY ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                What to Expect
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Learning Journey
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              From the moment you submit your application to your first class — here is what
              happens at each step.
            </p>
          </div>

          <div className="relative">
            {/* connecting line on desktop */}
            <div className="absolute top-9 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {JOURNEY_STEPS.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* step number */}
                  <div className="relative mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-emerald-700 text-xl font-black text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-emerald-900/20">
                    {i + 1}
                    {/* amber dot top-right */}
                    <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-amber-400" />
                  </div>
                  <h3 className="mb-2 text-[15px] font-extrabold text-gray-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Start Learning?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              Join thousands of students across Nigeria learning the Qur'an with qualified,
              accredited teachers. Registration takes less than five minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              
                href="#register"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              &gt;
                Register as a Student
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              
              <Link
                to="/ITQARegistration/centres"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Find a Centre Near You
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}