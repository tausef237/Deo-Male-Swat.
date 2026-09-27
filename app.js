const { createClient } = supabase;

const client = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

document.addEventListener("DOMContentLoaded", function () {
  const studentSection = document.getElementById("students");
  if (!studentSection) return;

  const saveButton = studentSection.querySelector(".btn");
  if (!saveButton) return;

  saveButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const inputs = studentSection.querySelectorAll("input");
    const studentName = inputs[0]?.value?.trim();

    if (!studentName) {
      alert("براہ کرم Student Name لکھیں");
      return;
    }

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    const { error } = await client
      .from("students")
      .insert([
        {
          full_name: studentName
        }
      ]);

    saveButton.disabled = false;
    saveButton.textContent = "Save Record";

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Student record Supabase میں محفوظ ہو گیا۔");
  });
});
