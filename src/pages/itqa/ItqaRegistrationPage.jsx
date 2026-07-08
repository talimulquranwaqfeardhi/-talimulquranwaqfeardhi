import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Clock,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { itqaService } from '../services/itqaService';

/* ─── static info ────────────────────────────────────────── */
const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Submit Application',
    desc: 'Fill out the relevant form below with your personal and educational details.',
  },
  {
    icon: ShieldCheck,
    title: 'Review & Verification',
    desc: 'Our admin team verifies your details, typically within 3–5 working days.',
  },
  {
    icon: CheckCircle2,
    title: 'Accreditation Issued',
    desc: 'Approved applicants receive their ITQA certificate and centre placement.',
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

/* ─── Teacher form ───────────────────────────────────────── */
function TeacherForm({ onSuccess }) {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', gender: '', state: '', lga: '',
    qualification: '', years_experience: '', preferred_centre: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await itqaService.submitRegistration({ role: 'teacher', ...form });
      onSuccess();
    } catch (err) {
      setError(err.message || 'Could not submit your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
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
  );
}

/* ─── Student form ───────────────────────────────────────── */
function StudentForm({ onSuccess }) {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', gender: '', age: '', state: '', lga: '',
    current_level: '', guardian_name: '', guardian_phone: '', preferred_centre: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await itqaService.submitRegistration({ role: 'student', ...form });
      onSuccess();
    } catch (err) {
      setError(err.message || 'Could not submit your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input required value={form.full_name} onChange={update('full_name')} className={inputClass} placeholder="Student's full name" />
        </Field>
        <Field label="Age" required>
          <input type="number" min="3" max="120" required value={form.age} onChange={update('age')} className={inputClass} placeholder="e.g. 14" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email Address" required>
          <input type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
        </Field>
        <Field label="Phone Number">
          <input type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+234 800 000 0000" />
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
        <Field label="Current Level" required>
          <select required value={form.current_level} onChange={update('current_level')} className={inputClass}>
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced / Hafiz in progress</option>
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
        <Field label="Parent / Guardian Name" required>
          <input required value={form.guardian_name} onChange={update('guardian_name')} className={inputClass} placeholder="Required for students under 18" />
        </Field>
        <Field label="Parent / Guardian Phone" required>
          <input type="tel" required value={form.guardian_phone} onChange={update('guardian_phone')} className={inputClass} placeholder="+234 800 000 0000" />
        </Field>
      </div>

      <Field label="Preferred Centre (optional)">
        <input value={form.preferred_centre} onChange={update('preferred_centre')} className={inputClass} placeholder="e.g. National Secretariat, Abuja" />
      </Field>

      <Field label="Additional Notes (optional)">
        <textarea rows={3} value={form.notes} onChange={update('notes')} className={`${inputClass} resize-none`} placeholder="Anything else we should know..." />
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
            Submit Student Application
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

/* ─── success state ──────────────────────────────────────── */
function SuccessPanel({ role, onReset }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50 px-8 py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 shadow-md">
        <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900">Application Submitted</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
        Your {role} registration has been received. Our admin team will review your details and
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
export default function ItqaRegistrationPage() {
  const [activeTab, setActiveTab] = useState('teacher'); // 'teacher' | 'student'
  const [submitted, setSubmitted] = useState(null); // null | 'teacher' | 'student'

  function handleSuccess(role) {
    setSubmitted(role);
  }

  function handleReset() {
    setSubmitted(null);
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
          إ
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
            <span className="text-emerald-600">/</span>
            <span className="text-white">ITQA Registration</span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Teacher &amp; Student Accreditation
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              ITQA Registration
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              Register as a certified teacher or student through our streamlined accreditation
              process — free, transparent, and open to all.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ PROCESS STEPS ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Accreditation Process
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-gray-100 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <span className="absolute -top-3 -left-1 text-5xl font-black text-emerald-100 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="relative text-base font-extrabold text-gray-900">{title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
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
              Register Now
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Select your registration type below. All fields marked with{' '}
              <span className="font-semibold text-amber-600">*</span> are required.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />

            {/* tabs */}
            {!submitted && (
              <div className="flex border-b border-gray-100 px-2 pt-2">
                <button
                  onClick={() => setActiveTab('teacher')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-t-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                    activeTab === 'teacher'
                      ? 'border-b-2 border-emerald-700 text-emerald-700'
                      : 'border-b-2 border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  Teacher Registration
                </button>
                <button
                  onClick={() => setActiveTab('student')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-t-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                    activeTab === 'student'
                      ? 'border-b-2 border-emerald-700 text-emerald-700'
                      : 'border-b-2 border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <UserCheck className="h-4 w-4" />
                  Student Registration
                </button>
              </div>
            )}

            <div className="p-7 sm:p-9">
              {submitted ? (
                <SuccessPanel role={submitted} onReset={handleReset} />
              ) : activeTab === 'teacher' ? (
                <TeacherForm onSuccess={() => handleSuccess('teacher')} />
              ) : (
                <StudentForm onSuccess={() => handleSuccess('student')} />
              )}
            </div>
          </div>

          {/* processing time note */}
          {!submitted && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Applications are typically reviewed within 3–5 working days.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}