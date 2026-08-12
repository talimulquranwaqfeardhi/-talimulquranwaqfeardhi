import { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/background-image.jpeg';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  ClipboardList,
  Briefcase,
  Users,
  ShieldCheck,
  Sparkles,
  Target,
  Loader2,
  HeartHandshake,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const WORKFLOW = [
  'Application Submission',
  'Review',
  'Recommendation',
  'Approval / Rejection',
  'Service Assignment',
  'Monitoring',
  'Completion / Renewal',
];

const SERVICE_INTERESTS = [
  'Teaching Support',
  'Classroom Coordination',
  'Online Engagement',
  'Community Outreach',
  'Administrative Support',
  'Event Assistance',
  'Curriculum Support',
  'Other',
];

const PREFERRED_DEPARTMENTS = [
  'Qur’an Study',
  'Tajweed & Recitation',
  'Memorization Support',
  'Tafsir Delivery',
  'Community Events',
  'Learning Centre Support',
  'Volunteer Coordination',
  'Other',
];

const DURATIONS = [
  '1 month',
  '2-3 months',
  '4-6 months',
  '7-12 months',
  'Flexible / open-ended',
];

const BACKEND_TABLE = import.meta.env.VITE_SUPABASE_WAQFE_ARDHI_TABLE || 'waqfe_ardhi_applications';
const hasBackend = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_WAQFE_ARDHI_TABLE
);

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

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
          className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

function SuccessPanel({ onReset, hasBackend }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-10 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-emerald-900">Application Submitted</h2>
      <p className="mt-3 text-sm leading-relaxed text-emerald-700">
        Your Waqfe Ardhi application has been received. Our team will review it and contact you with next steps.
      </p>
      {!hasBackend && (
        <p className="mt-3 text-sm text-gray-600">
          Note: backend persistence is not currently configured. This page demonstrates the full frontend workflow only.
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        Submit another application
      </button>
    </div>
  );
}

export default function WaqfPage() {
  const [form, setForm] = useState({
    full_name: '',
    jamaat: '',
    circuit: '',
    email: '',
    phone: '',
    education: '',
    profession: '',
    skills: '',
    experience: '',
    previous_service: '',
    service_interest: '',
    preferred_department: '',
    available_period: '',
    dedication_duration: '',
    dedication_reason: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validate(data) {
    const nextErrors = {};
    if (!data.full_name.trim()) nextErrors.full_name = 'Full name is required.';
    if (!data.jamaat.trim()) nextErrors.jamaat = "Jama'at is required.";
    if (!data.circuit.trim()) nextErrors.circuit = 'Circuit is required.';
    if (!data.email.trim() && !data.phone.trim()) nextErrors.contact = 'Please provide email or phone contact details.';
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (data.phone.trim() && data.phone.trim().length < 6) nextErrors.phone = 'Enter a valid phone number.';
    if (!data.education.trim()) nextErrors.education = 'Education is required.';
    if (!data.profession.trim()) nextErrors.profession = 'Profession is required.';
    if (!data.skills.trim()) nextErrors.skills = 'Please describe your skills.';
    if (!data.experience.trim()) nextErrors.experience = 'Please describe your experience.';
    if (!data.previous_service.trim()) nextErrors.previous_service = 'Please summarise your previous Jama\'at service experience.';
    if (!data.service_interest) nextErrors.service_interest = 'Select an area of service interest.';
    if (!data.preferred_department) nextErrors.preferred_department = 'Select a preferred department or service area.';
    if (!data.available_period.trim()) nextErrors.available_period = 'Please provide your available period.';
    if (!data.dedication_duration) nextErrors.dedication_duration = 'Select a dedication duration.';
    if (!data.dedication_reason.trim()) nextErrors.dedication_reason = 'Please share your reason for dedication.';
    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const payload = {
      full_name: form.full_name.trim(),
      jamaat: form.jamaat.trim(),
      circuit: form.circuit.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      education: form.education.trim(),
      profession: form.profession.trim(),
      skills: form.skills.trim(),
      experience: form.experience.trim(),
      previous_service: form.previous_service.trim(),
      service_interest: form.service_interest,
      preferred_department: form.preferred_department,
      available_period: form.available_period.trim(),
      dedication_duration: form.dedication_duration,
      dedication_reason: form.dedication_reason.trim(),
      created_at: new Date().toISOString(),
    };

    if (!hasBackend) {
      window.setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 600);
      return;
    }

    const { error } = await supabase.from(BACKEND_TABLE).insert([payload]);
    setSubmitting(false);
    if (error) {
      setSubmitError('Unable to submit at this time. Please try again later.');
      return;
    }
    setSubmitted(true);
  }

  function handleReset() {
    setForm({
      full_name: '',
      jamaat: '',
      circuit: '',
      email: '',
      phone: '',
      education: '',
      profession: '',
      skills: '',
      experience: '',
      previous_service: '',
      service_interest: '',
      preferred_department: '',
      available_period: '',
      dedication_duration: '',
      dedication_reason: '',
    });
    setErrors({});
    setSubmitError('');
    setSubmitted(false);
  }

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/70 to-amber-700/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200">
              Waqfe Ardhi
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Offer your time, skills and service to Jama'at work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
              Waqfe Ardhi is a temporary dedication programme for members and workers who wish to offer time, skills and service for a specified period. This page supports application submission and outlines the workflow from review to assignment.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#application"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20"
              >
                See Workflow
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <div>
                <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
                  About this programme
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  People-focused Jama'at service, not land dedication.
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Waqfe Ardhi is for members who want to offer their time, skills and service for a defined period. It does not involve land, property, agriculture or real estate.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    icon: Briefcase,
                    title: 'Skills-based placement',
                    desc: 'Your education, profession and talents are used to find the best service fit.',
                  },
                  {
                    icon: Users,
                    title: 'Team coordination',
                    desc: 'Service assignments are planned with clear guidance and support.',
                  },
                  {
                    icon: ClipboardList,
                    title: 'Structured workflow',
                    desc: 'Submission, review, recommendation and assignment are all clearly mapped.',
                  },
                  {
                    icon: Target,
                    title: 'Jama\'at service focus',
                    desc: 'Assignments are centred on meaningful volunteer work and Qur’anic learning support.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-3xl border border-gray-100 bg-emerald-50 p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm sm:p-10" id="workflow">
              <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Workflow</p>
                <h3 className="mt-3 text-2xl font-extrabold text-gray-900">Application workflow</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  This module outlines the end-to-end stages for Waqfe Ardhi applications. Approval and assignment decisions are made externally by the Jama'at coordinators.
                </p>
              </div>
              <div className="space-y-4">
                {WORKFLOW.map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-3xl border border-gray-100 bg-white p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{step}</p>
                      <p className="text-sm text-gray-500">
                        {step === 'Application Submission'
                          ? 'You complete this form and submit your details.'
                          : step === 'Review'
                          ? 'The team checks your background, skills and availability.'
                          : step === 'Recommendation'
                          ? 'A suitable service area is suggested based on your profile.'
                          : step === 'Approval / Rejection'
                          ? 'The department confirms whether the application is accepted.'
                          : step === 'Service Assignment'
                          ? 'Approved applicants are assigned to a Jama\'at service role.'
                          : step === 'Monitoring'
                          ? 'Progress is tracked during your dedication period.'
                          : 'Your service period ends or may be renewed if agreed.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="application" className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-start">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-8">
                <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
                  Application Form
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Apply to join Waqfe Ardhi
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Provide your personal information, background, and dedication preferences so the programme can evaluate your application.
                </p>
              </div>

              {submitted ? (
                <SuccessPanel onReset={handleReset} hasBackend={hasBackend} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="Full Name" required>
                      <input
                        id="full_name"
                        value={form.full_name}
                        onChange={update('full_name')}
                        className={inputClass}
                        aria-invalid={errors.full_name ? 'true' : 'false'}
                        aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                        placeholder="Your full name"
                      />
                      {errors.full_name && <p id="full_name-error" className="mt-2 text-sm text-rose-600">{errors.full_name}</p>}
                    </Field>
                    <Field label="Jama'at" required>
                      <input
                        id="jamaat"
                        value={form.jamaat}
                        onChange={update('jamaat')}
                        className={inputClass}
                        aria-invalid={errors.jamaat ? 'true' : 'false'}
                        aria-describedby={errors.jamaat ? 'jamaat-error' : undefined}
                        placeholder="Your Jama'at"
                      />
                      {errors.jamaat && <p id="jamaat-error" className="mt-2 text-sm text-rose-600">{errors.jamaat}</p>}
                    </Field>
                    <Field label="Circuit" required>
                      <input
                        id="circuit"
                        value={form.circuit}
                        onChange={update('circuit')}
                        className={inputClass}
                        aria-invalid={errors.circuit ? 'true' : 'false'}
                        aria-describedby={errors.circuit ? 'circuit-error' : undefined}
                        placeholder="Your circuit"
                      />
                      {errors.circuit && <p id="circuit-error" className="mt-2 text-sm text-rose-600">{errors.circuit}</p>}
                    </Field>
                    <Field label="Email Address">
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className={inputClass}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p id="email-error" className="mt-2 text-sm text-rose-600">{errors.email}</p>}
                    </Field>
                    <Field label="Phone Number">
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className={inputClass}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        placeholder="e.g. +234 801 234 5678"
                      />
                      {errors.phone && <p id="phone-error" className="mt-2 text-sm text-rose-600">{errors.phone}</p>}
                    </Field>
                  </div>

                  {errors.contact && <p className="text-sm text-rose-600">{errors.contact}</p>}

                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="Education" required>
                      <input
                        id="education"
                        value={form.education}
                        onChange={update('education')}
                        className={inputClass}
                        aria-invalid={errors.education ? 'true' : 'false'}
                        aria-describedby={errors.education ? 'education-error' : undefined}
                        placeholder="Your highest education or training"
                      />
                      {errors.education && <p id="education-error" className="mt-2 text-sm text-rose-600">{errors.education}</p>}
                    </Field>
                    <Field label="Profession" required>
                      <input
                        id="profession"
                        value={form.profession}
                        onChange={update('profession')}
                        className={inputClass}
                        aria-invalid={errors.profession ? 'true' : 'false'}
                        aria-describedby={errors.profession ? 'profession-error' : undefined}
                        placeholder="Your current profession"
                      />
                      {errors.profession && <p id="profession-error" className="mt-2 text-sm text-rose-600">{errors.profession}</p>}
                    </Field>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="Skills" required>
                      <textarea
                        id="skills"
                        value={form.skills}
                        onChange={update('skills')}
                        rows={4}
                        className={`${inputClass} min-h-[110px] resize-none`}
                        aria-invalid={errors.skills ? 'true' : 'false'}
                        aria-describedby={errors.skills ? 'skills-error' : undefined}
                        placeholder="List your skills and strengths"
                      />
                      {errors.skills && <p id="skills-error" className="mt-2 text-sm text-rose-600">{errors.skills}</p>}
                    </Field>
                    <Field label="Experience" required>
                      <textarea
                        id="experience"
                        value={form.experience}
                        onChange={update('experience')}
                        rows={4}
                        className={`${inputClass} min-h-[110px] resize-none`}
                        aria-invalid={errors.experience ? 'true' : 'false'}
                        aria-describedby={errors.experience ? 'experience-error' : undefined}
                        placeholder="Describe your relevant experience"
                      />
                      {errors.experience && <p id="experience-error" className="mt-2 text-sm text-rose-600">{errors.experience}</p>}
                    </Field>
                  </div>

                  <Field label="Previous Jama'at Service Experience" required>
                    <textarea
                      id="previous_service"
                      value={form.previous_service}
                      onChange={update('previous_service')}
                      rows={4}
                      className={`${inputClass} min-h-[110px] resize-none`}
                      aria-invalid={errors.previous_service ? 'true' : 'false'}
                      aria-describedby={errors.previous_service ? 'previous_service-error' : undefined}
                      placeholder="Summarise your previous Jama'at service roles"
                    />
                    {errors.previous_service && <p id="previous_service-error" className="mt-2 text-sm text-rose-600">{errors.previous_service}</p>}
                  </Field>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="Area of Service Interest" required>
                      <select
                        id="service_interest"
                        value={form.service_interest}
                        onChange={update('service_interest')}
                        className={inputClass}
                        aria-invalid={errors.service_interest ? 'true' : 'false'}
                        aria-describedby={errors.service_interest ? 'service_interest-error' : undefined}
                      >
                        <option value="">Select interest</option>
                        {SERVICE_INTERESTS.map((interest) => (
                          <option key={interest} value={interest}>{interest}</option>
                        ))}
                      </select>
                      {errors.service_interest && <p id="service_interest-error" className="mt-2 text-sm text-rose-600">{errors.service_interest}</p>}
                    </Field>
                    <Field label="Preferred Department / Service Area" required>
                      <select
                        id="preferred_department"
                        value={form.preferred_department}
                        onChange={update('preferred_department')}
                        className={inputClass}
                        aria-invalid={errors.preferred_department ? 'true' : 'false'}
                        aria-describedby={errors.preferred_department ? 'preferred_department-error' : undefined}
                      >
                        <option value="">Select department</option>
                        {PREFERRED_DEPARTMENTS.map((department) => (
                          <option key={department} value={department}>{department}</option>
                        ))}
                      </select>
                      {errors.preferred_department && <p id="preferred_department-error" className="mt-2 text-sm text-rose-600">{errors.preferred_department}</p>}
                    </Field>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="Available Period" required>
                      <input
                        id="available_period"
                        value={form.available_period}
                        onChange={update('available_period')}
                        className={inputClass}
                        aria-invalid={errors.available_period ? 'true' : 'false'}
                        aria-describedby={errors.available_period ? 'available_period-error' : undefined}
                        placeholder="e.g. July 2026 - September 2026"
                      />
                      {errors.available_period && <p id="available_period-error" className="mt-2 text-sm text-rose-600">{errors.available_period}</p>}
                    </Field>
                    <Field label="Duration of Dedication" required>
                      <select
                        id="dedication_duration"
                        value={form.dedication_duration}
                        onChange={update('dedication_duration')}
                        className={inputClass}
                        aria-invalid={errors.dedication_duration ? 'true' : 'false'}
                        aria-describedby={errors.dedication_duration ? 'dedication_duration-error' : undefined}
                      >
                        <option value="">Select duration</option>
                        {DURATIONS.map((duration) => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                      {errors.dedication_duration && <p id="dedication_duration-error" className="mt-2 text-sm text-rose-600">{errors.dedication_duration}</p>}
                    </Field>
                  </div>

                  <Field label="Reason for Dedication" required>
                    <textarea
                      id="dedication_reason"
                      value={form.dedication_reason}
                      onChange={update('dedication_reason')}
                      rows={4}
                      className={`${inputClass} min-h-[110px] resize-none`}
                      aria-invalid={errors.dedication_reason ? 'true' : 'false'}
                      aria-describedby={errors.dedication_reason ? 'dedication_reason-error' : undefined}
                      placeholder="Why do you want to dedicate your time and service?"
                    />
                    {errors.dedication_reason && <p id="dedication_reason-error" className="mt-2 text-sm text-rose-600">{errors.dedication_reason}</p>}
                  </Field>

                  {submitError && <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{submitError}</p>}

                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <p className="text-sm text-gray-500">
                      Required fields are marked with an asterisk. Provide at least one valid contact method.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="rounded-3xl bg-emerald-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Backend Integration</p>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  The Waqfe Ardhi application workflow is implemented front-end first. Enable Supabase persistence by setting <span className="font-semibold">VITE_SUPABASE_WAQFE_ARDHI_TABLE</span> alongside the existing Supabase env vars.
                </p>
                <p className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {hasBackend
                    ? 'Backend persistence is configured.'
                    : 'Backend persistence is not configured. The form works as frontend workflow only.'}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="text-base font-semibold text-gray-900">What happens next?</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li>1. We review your application details.</li>
                  <li>2. We recommend a suitable Jama'at service area.</li>
                  <li>3. Approval or rejection is confirmed externally.</li>
                  <li>4. Approved applicants receive a service assignment.</li>
                  <li>5. Progress is monitored through your dedication period.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Questions about Waqfe Ardhi
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'What does Waqfe Ardhi mean in this context?',
                a: 'It means a temporary dedication of time, skills and service for Jama\'at work. It does not refer to land, property, agriculture or real estate.',
              },
              {
                q: 'How long will my dedication last?',
                a: 'You choose the available period and duration in the application. Final assignment timing is confirmed after review.',
              },
              {
                q: 'Can I change my availability later?',
                a: 'Yes. Please notify the programme coordinator so your assignment and monitoring plan can be updated.',
              },
              {
                q: 'Is this a paid role?',
                a: 'Waqfe Ardhi is a service dedication programme. Any support or allowances are determined by the department and assignment terms.',
              },
            ].map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
