const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const authCard=document.getElementById('authCard'),dashboard=document.getElementById('dashboard'),email=document.getElementById('email'),password=document.getElementById('password'),message=document.getElementById('message'),userEmail=document.getElementById('userEmail');
function msg(t){message.textContent=t}
async function refresh(){const {data:{session}}=await client.auth.getSession();if(session){authCard.classList.add('hidden');dashboard.classList.remove('hidden');userEmail.textContent='Login: '+(session.user.email||'')}else{authCard.classList.remove('hidden');dashboard.classList.add('hidden')}}
document.getElementById('loginBtn').onclick=async()=>{const {error}=await client.auth.signInWithPassword({email:email.value.trim(),password:password.value});msg(error?error.message:'Login successful');await refresh()};
document.getElementById('signupBtn').onclick=async()=>{const {error}=await client.auth.signUp({email:email.value.trim(),password:password.value});msg(error?error.message:'Signup successful. Email confirmation may be required.')};
document.getElementById('logoutBtn').onclick=async()=>{await client.auth.signOut();await refresh()};
client.auth.onAuthStateChange(()=>refresh());refresh();
