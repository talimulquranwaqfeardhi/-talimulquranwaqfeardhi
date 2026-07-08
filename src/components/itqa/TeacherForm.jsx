// src/services/itqaService.js
import { supabase } from '@/lib/supabaseClient';

export async function createItqaRegistration(data) {
  const { data: registration, error } = await supabase
    .from('itqa_registrations')
    .insert([{
      registration_role: data.role, // 'teacher' or 'student'
      personal_info: data, // Store the entire form data as JSONB
      centre_id: data.centreId,
      status: 'pending',
    }])
    .select()
    .single();

  if (error) throw error;
  return registration;
}

export async function fetchCentres() {
  const { data, error } = await supabase.from('centres').select('*');
  if (error) throw error;
  return data;
}