import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const AGE_CATEGORIES = [
  'Child (12 and under)',
  'Youth (13-18)',
  'Young Adult (19-25)',
  'Adult (26-45)',
  'Senior (46+)'
];

const LEARNING_INTERESTS = [
  "Qur'an Reading",
  'Tajweed',
  "Tarjamtul Qur'an",
  'Tafsir',
  'Memorization (Hifz)',
  "Qur'anic Studies",
  'Recitation Improvement',
  'Other',
];

const initialFormState = {
  full_name: '',
  jamaat: '',
  circuit: '',
  country: '',
  email: '',
  phone: '',
  age_category: '',
  interests: [],
  other_interest: '',
};

const BACKEND_TABLE = import.meta.env.VITE_SUPABASE_LEARNING_REGISTRATIONS_TABLE || 'learning_registrations';
const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

function SuccessPanel({ onReset }) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
        ✓
      </div>
      <h2 className="mt-6 text-2xl font-extrabold text-emerald-900">Registration Submitted</h2>
      <p className="mt-3 text-sm leading-relaxed text-emerald-700">
        Thank you for joining the Qur'anic Learning Registration. We have received your details and will contact you soon.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        Submit another registration
      </button>
    </div>
  );
}

export default function LearningRegistrationPage() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function toggleInterest(value) {
    setForm((prev) => {
      const hasInterest = prev.interests.includes(value);
      const interests = hasInterest
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value];

      return {
        ...prev,
        interests,
        other_interest: value === 'Other' && !interests.includes('Other') ? prev.other_interest : prev.other_interest,
      };
    });
  }

  function validate(payload) {
    const nextErrors = {};

    if (!payload.full_name.trim()) {
      nextErrors.full_name = 'Full name is required.';
    }
    if (!payload.jamaat.trim()) {
      nextErrors.jamaat = "Jama'at is required.";
    }
    if (!payload.circuit.trim()) {
      nextErrors.circuit = 'Circuit is required.';
    }
    if (!payload.country.trim()) {
      nextErrors.country = 'Country is required.';
    }
    if (!payload.email.trim() && !payload.phone.trim()) {
      nextErrors.contact = 'Please provide an email address or phone number.';
    }
    if (payload.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (payload.phone.trim() && payload.phone.trim().length < 6) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!payload.age_category) {
      nextErrors.age_category = 'Please select your age category.';
    }
    if (payload.interests.length === 0) {
      nextErrors.interests = 'Please select at least one learning interest.';
    }
    if (payload.interests.includes('Other') && !payload.other_interest.trim()) {
      nextErrors.other_interest = 'Please describe your other area of interest.';
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError('');
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const payload = {
      full_name: form.full_name.trim(),
      jamaat: form.jamaat.trim(),
      circuit: form.circuit.trim(),
      country: form.country.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      age_category: form.age_category,
      interests: form.interests,
      other_interest: form.other_interest.trim(),
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
      setSubmitError('Unable to submit registration right now. Please try again later.');
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setForm(initialFormState);
    setErrors({});
    setSubmitError('');
    setSubmitted(false);
  }

  const inputClass =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200';

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-emerald-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/60 to-amber-700/15" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-amber-300/90">
              Qur'anic Learning Registration
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Register for Qur'anic Learning Opportunities
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
              Share your details and learning interests, and our team will connect you with the right Qur'an learning pathways.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:items-start">
            <div className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                  New System
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Why this registration exists</h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  This Qur'anic Learning Registration is built for the platform's own learning network — not ITQA registration. It collects only the details needed to match you with Qur'an classes, tajweed support, tafsir learning, memorization pathways, and study guidance.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-100 bg-emerald-50 p-5">
                  <p className="text-sm font-semibold text-emerald-900">Area of Interest</p>
                  <p className="mt-2 text-sm text-gray-600">Choose the Qur'anic learning topics you want to study.</p>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-amber-50 p-5">
                  <p className="text-sm font-semibold text-amber-900">Contact Support</p>
                  <p className="mt-2 text-sm text-gray-600">If backend is configured, your registration will be sent securely through our Supabase platform.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              {submitted ? (
                <SuccessPanel onReset={handleReset} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="full_name" className="mb-2 block text-sm font-semibold text-gray-900">
                      Full Name <span className="text-amber-600">*</span>
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={form.full_name}
                      onChange={updateField('full_name')}
                      className={inputClass}
                      aria-invalid={errors.full_name ? 'true' : 'false'}
                      aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                      placeholder="Enter your full name"
                    />
                    {errors.full_name && (
                      <p id="full_name-error" className="mt-2 text-sm text-rose-600">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="jamaat" className="mb-2 block text-sm font-semibold text-gray-900">
                        Jama'at <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="jamaat"
                        name="jamaat"
                        type="text"
                        value={form.jamaat}
                        onChange={updateField('jamaat')}
                        className={inputClass}
                        aria-invalid={errors.jamaat ? 'true' : 'false'}
                        aria-describedby={errors.jamaat ? 'jamaat-error' : undefined}
                        placeholder="Your Jama'at"
                      />
                      {errors.jamaat && (
                        <p id="jamaat-error" className="mt-2 text-sm text-rose-600">
                          {errors.jamaat}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="circuit" className="mb-2 block text-sm font-semibold text-gray-900">
                        Circuit <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="circuit"
                        name="circuit"
                        type="text"
                        value={form.circuit}
                        onChange={updateField('circuit')}
                        className={inputClass}
                        aria-invalid={errors.circuit ? 'true' : 'false'}
                        aria-describedby={errors.circuit ? 'circuit-error' : undefined}
                        placeholder="Your circuit"
                      />
                      {errors.circuit && (
                        <p id="circuit-error" className="mt-2 text-sm text-rose-600">
                          {errors.circuit}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="country" className="mb-2 block text-sm font-semibold text-gray-900">
                        Country <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={form.country}
                        onChange={updateField('country')}
                        className={inputClass}
                        aria-invalid={errors.country ? 'true' : 'false'}
                        aria-describedby={errors.country ? 'country-error' : undefined}
                        placeholder="Country of residence"
                      />
                      {errors.country && (
                        <p id="country-error" className="mt-2 text-sm text-rose-600">
                          {errors.country}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="age_category" className="mb-2 block text-sm font-semibold text-gray-900">
                        Age Category <span className="text-amber-600">*</span>
                      </label>
                      <select
                        id="age_category"
                        name="age_category"
                        value={form.age_category}
                        onChange={updateField('age_category')}
                        className={inputClass}
                        aria-invalid={errors.age_category ? 'true' : 'false'}
                        aria-describedby={errors.age_category ? 'age_category-error' : undefined}
                      >
                        <option value="">Select your age category</option>
                        {AGE_CATEGORIES.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.age_category && (
                        <p id="age_category-error" className="mt-2 text-sm text-rose-600">
                          {errors.age_category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateField('email')}
                        className={inputClass}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-rose-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-900">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={updateField('phone')}
                        className={inputClass}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        placeholder="e.g. +234 801 234 5678"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-2 text-sm text-rose-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {errors.contact && (
                    <p className="text-sm text-rose-600">{errors.contact}</p>
                  )}

                  <fieldset className="rounded-3xl border border-gray-200 p-5">
                    <legend className="mb-3 text-sm font-semibold text-gray-900">
                      Area of Qur'anic Learning Interest <span className="text-amber-600">*</span>
                    </legend>
                    <p className="text-sm text-gray-500">Select all interests that apply. We will use this to match you with the right Qur'an learning pathway.</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {LEARNING_INTERESTS.map((interest) => (
                        <label
                          key={interest}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition hover:border-emerald-300"
                        >
                          <input
                            type="checkbox"
                            value={interest}
                            checked={form.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="mt-3 text-sm text-rose-600">{errors.interests}</p>
                    )}
                  </fieldset>

                  {form.interests.includes('Other') && (
                    <div>
                      <label htmlFor="other_interest" className="mb-2 block text-sm font-semibold text-gray-900">
                        Other interest details <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="other_interest"
                        name="other_interest"
                        type="text"
                        value={form.other_interest}
                        onChange={updateField('other_interest')}
                        className={inputClass}
                        aria-invalid={errors.other_interest ? 'true' : 'false'}
                        aria-describedby={errors.other_interest ? 'other_interest-error' : undefined}
                        placeholder="Describe your learning interest"
                      />
                      {errors.other_interest && (
                        <p id="other_interest-error" className="mt-2 text-sm text-rose-600">
                          {errors.other_interest}
                        </p>
                      )}
                    </div>
                  )}

                  {submitError && (
                    <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {submitError}
                    </p>
                  )}

                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        All fields are required unless noted otherwise. You can provide either phone or email as your primary contact.
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    >
                      {submitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600 shadow-sm sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Need information first?</h3>
            <p className="leading-7">
              If you prefer, you may return to the Qur'anic Learning section to review our available classes and resources before registering. This form is for learners seeking the platform's own programme matching service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/talim/tafsir"
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-gray-300 hover:bg-gray-100"
              >
                Explore Tafsir
              </Link>
              <Link
                to="/talim/tajweed"
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-gray-300 hover:bg-gray-100"
              >
                Explore Tajweed
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
