import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulkkofclswqyidnzxvjg.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsa2tvZmNsc3dxeWlkbnp4dmpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUzOTczMywiZXhwIjoyMDg3MTE1NzMzfQ.LmC990XB4xVxoKqs8B5jQaNjKYSrguB80MswIsAYaFw';

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Test if we can query the database
const { data, error } = await supabase.from('project_media').select('*').limit(1);

if (error && error.code === '42P01') {
  console.log('Table does not exist. Need to create it via SQL.');
} else if (error) {
  console.log('Error:', error.message);
} else {
  console.log('Table already exists!');
}
