import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Clock,
  ChevronDown,
  Award,
  Users,
  Wallet,
  BookOpenCheck,
  Loader2,
} from 'lucide-react';
import itqaService from '@/services/itqaService';

/* ─── static data ─────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: Award,
    title: 'Recognised Certification',
    desc: 'Receive an official ITQA accreditation recognised across affiliated Tahfiz schools nationwide.',
  },
  {
    icon: Users,
    title: 'Community Network',
    desc: 'Join a growing network of certified teachers collaborating on curriculum and best practice.',
  },
  {
    icon: Wallet,
    title: 'Placement Support',
    desc: 'Get matched with teaching centres seeking qualified instructors in your state.',
  },
  {
    icon: BookOpenCheck,
    title: 'Continuing Education',
    desc: 'Access ongoing workshops and refresher training to keep your teaching skills sharp.',
  },
];

const ELIGIBILITY = [
  'Minimum of Ijazah, Diploma, or equivalent Islamic studies qualification.',
  'At least one year of teaching or tutoring experience (formal or informal).',
  'Sound knowledge of Tajweed and correct Quranic recitation.',
  'Good moral standing within your community, verifiable by reference.',
  'Commitment to attend at least one orientation session before placement.',
];

const PROCESS_STEPS = [
  { title: 'Submit Application', desc: 'Complete the form below with your qualifications and experience.' },
  { title: 'Document Verification', desc: 'Our team verifies your credentials, typically within 3–5 working days.' },
  { title: 'Orientation Session', desc: 'Attend a short virtual orientation covering teaching standards and conduct.' },
  { title: 'Certification & Placement', desc: 'Receive your ITQA certificate and optional centre placement.' },
];

const FAQS = [
  {
    q: 'Is there a fee to apply for ITQA teacher accreditation?',
    a: 'No. The accreditation process is completely free as part of the departments mission to expand access to qualified Quranic education across Nigeria.',
  },
  {
    q: 'Can I apply if I currently teach independently, not at a registered Madrasa?',
    a: 'Yes. Independent and informal teaching experience is accepted, provided you can describe your experience accurately in the application.',
  },
  {
    q: 'How long does the review process take?',
    a: 'Most applications are reviewed within 3–5 working days. You will be contacted by email or phone with next steps.',
  },
  {
    q: 'Will I be placed at a teaching centre automatically?',
    a: 'Placement is optional and based on availability in your state. You may also use your certification independently without department placement.',
  },
];

const NIGERIAN_STATES = [
  'Abuja (FCT)', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

/* ─── shared field components ───────────────────────────── */
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
        Your teacher registration has been received. Our admin team will review your details and
        reach out within 3–5 working days via the email or phone you provided.
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
export default function TeacherRegistrationPage() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', gender: '', state: '', lga: '',
    qualification: '', years_experience: '', preferred_centre: '', notes: '',
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
      await itqaService.submitTeacherRegistration(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not submit your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setForm({
      full_name: '', email: '', phone: '', gender: '', state: '', lga: '',
      qualification: '', years_experience: '', preferred_centre: '', notes: '',
    });
  }


  

  return (
    <div className="bg-white">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 -translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 text-[18rem] font-black leading-none text-white/[0.025] select-none">
          م
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          {/* breadcrumb */}
          {/* <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
            <span className="text-emerald-600">/</span>
            <span className="text-emerald-300">ITQA Registration</span>
            <span className="text-emerald-600">/</span>
            <span className="text-white">Teacher</span>
          </div> */}

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Teacher Accreditation
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Become an ITQA Certified Teacher
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              Join a nationwide network of accredited Qur'anic instructors. Free certification,
              placement support, and ongoing professional development.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ INTRODUCTION ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Introduction
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Raising the Standard of Qur'anic Teaching
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-gray-500">
              ITQA (Islamic Teaching Qualification Accreditation) exists to verify, recognise, and
              support qualified Qur'anic instructors across Nigeria. Whether you teach at a
              registered Madrasa or independently, accreditation gives your students and their
              families confidence in the quality of instruction you provide — while connecting
              you to a wider community of educators.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ BENEFITS ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Why Get Certified
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Benefits of Becoming an ITQA Teacher
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
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
                Who Can Apply
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-gray-500">
                Accreditation is open to anyone meeting the minimum qualifications below —
                whether you teach at an established Madrasa or independently in your community.
              </p>
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
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <ClipboardList className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Application Form
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Teacher Registration
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              All fields marked with <span className="font-semibold text-amber-600">*</span> are
              required.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
            <div className="p-7 sm:p-9">
              {submitted ? (
                <SuccessPanel onReset={handleReset} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <input required value={form.full_name} onChange={update('full_name')} className={inputClass} placeholder="e.g. Abdullahi Sani" />
                    </Field>
                    <Field label="Email Address" required>
                      <input type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone Number" required>
                      <input type="tel" required value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+234 800 000 0000" />
                    </Field>
                    <Field label="Gender" required>
                      <select required value={form.gender} onChange={update('gender')} className={inputClass}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Highest Qualification" required>
                      <select required value={form.qualification} onChange={update('qualification')} className={inputClass}>
                        <option value="">Select qualification</option>
                        <option value="ijazah">Ijazah</option>
                        <option value="diploma">Diploma in Islamic Studies</option>
                        <option value="degree">Bachelor's Degree</option>
                        <option value="postgraduate">Postgraduate Degree</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                    <Field label="Years of Teaching Experience" required>
                      <input type="number" min="0" required value={form.years_experience} onChange={update('years_experience')} className={inputClass} placeholder="e.g. 5" />
                    </Field>
                  </div>

                  <Field label="Preferred Teaching Centre (optional)">
                    <input value={form.preferred_centre} onChange={update('preferred_centre')} className={inputClass} placeholder="e.g. National Secretariat, Abuja" />
                  </Field>

                  <Field label="Additional Notes (optional)">
                    <textarea rows={3} value={form.notes} onChange={update('notes')} className={`${inputClass} resize-none`} placeholder="Anything else we should know about your application..." />
                  </Field>

                  {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}

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
                        Submit Teacher Application
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

      {/* ══════════════════ REGISTRATION PROCESS ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                The Process
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              From Application to Certification
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map(({ title, desc }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-sm font-black text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {i + 1}
                </span>
                <h3 className="text-sm font-extrabold text-gray-900">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
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
              Ready to Teach With Recognition?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              Join hundreds of accredited teachers across Nigeria. Registration is free and takes
              less than ten minutes.
            </p>
            <a
              href="#top"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Start Your Application
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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