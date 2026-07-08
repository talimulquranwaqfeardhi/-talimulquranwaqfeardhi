import { supabase } from '@/lib/supabaseClient';

// ─── table names ──────────────────────────────────────────────────────────────
// All ITQA writes land in dedicated tables so the admin dashboard can query
// teachers and students separately without needing a `role` filter everywhere.
const TEACHER_TABLE = 'itqa_teacher_registrations';
const STUDENT_TABLE = 'itqa_student_registrations';
const CENTRES_TABLE = 'itqa_centres';

// ─── Teacher registration ─────────────────────────────────────────────────────
/**
 * Insert a new teacher registration row with status = 'pending'.
 *
 * Expected shape of `data`:
 *   full_name, email, phone, gender, state, lga,
 *   qualification, years_experience, preferred_centre?, notes?
 *
 * Returns the created row.
 */
export async function submitTeacherRegistration(formData) {
  const { data } = await supabase.auth.getUser();
console.log(data.user);
  const { data: row, error } = await supabase
    .from(TEACHER_TABLE)
    .insert([{ ...formData, status: 'pending' }])
    .select()
    .single();

  if (error) throw error;
  return row;
}

// ─── Student registration ─────────────────────────────────────────────────────
/**
 * Insert a new student registration row with status = 'pending'.
 *
 * Expected shape of `data`:
 *   full_name, email, phone?, gender, age, state, lga,
 *   current_level, guardian_name, guardian_phone,
 *   preferred_centre?, notes?
 *
 * Returns the created row.
 */
export async function submitStudentRegistration(data) {
  const { data: row, error } = await supabase
    .from(STUDENT_TABLE)
    .insert([{ ...data, status: 'pending' }])
    .select()
    .single();

  if (error) throw error;
  return row;
}

// ─── Centre locator ───────────────────────────────────────────────────────────
/**
 * Fetch all active ITQA centres, ordered by state then name.
 *
 * Each row is expected to have at minimum:
 *   id, name, state, lga, address, phone?, email?,
 *   capacity?, type, is_active
 *
 * Returns an array of centre objects.
 */
export async function getCentres({ state = null, lga = null } = {}) {
  let query = supabase
    .from(CENTRES_TABLE)
    .select('*')
    .eq('is_active', true)
    .order('state', { ascending: true })
    .order('name', { ascending: true });

  if (state) query = query.eq('state', state);
  if (lga) query = query.ilike('lga', `%${lga}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ─── Named default export (for pages that prefer a namespace import) ──────────
// Usage:  import itqaService from '@/services/itqaService'
//         itqaService.submitTeacherRegistration(...)
const itqaService = {
  submitTeacherRegistration,
  submitStudentRegistration,
  getCentres,
};

export default itqaService;
