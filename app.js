
const { createClient } = supabase;

const client = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const studentSection = document.getElementById("students");

if (studentSection) {
  const saveButton = studentSection.querySelector(".btn");

  if (saveButton) {
    saveButton.onclick = async function () {
      const inputs = studentSection.querySelectorAll("input");
      const studentName = inputs[0]?.value?.trim();

      if (!studentName) {
        alert("براہ کرم Student Name لکھیں");
        return;
      }

      const { error } = await client
        .from("student")
        .insert([{ name: studentName }]);

      if (error) {
        alert("Error: " + error.message);
        return;
      }

      alert("Student record Supabase میں محفوظ ہو گیا۔");
    };
  }
}
